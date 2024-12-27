<?php

namespace App\Http\Controllers\Admin;

use App\Exports\adminSchoolExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\AdminSchoolResource;
use App\Http\Resources\AdminStudentResource;
use App\Http\Resources\SchoolResource;
use App\Http\Resources\StudentListResource;
use App\Models\Pincode;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;  // Make sure you import the Excel facade correctly

class AdminController extends Controller
{
	public function dashboard(Student $student, School $school)
	{
		// total counts
		$schoolCount = $school->count();
		$studentCount = $student->count();

		// Junior Students and School count
		$jrStudentCount = $student->where('nflat_category', 'Junior')->count();
		$jrSchoolCount = $student->where('nflat_category', 'Junior')
			->distinct('school_uuid')
			->count();

		// Junior Students and School count
		$midStudentCount = $student->where('nflat_category', 'Intermediate')->count();
		$midSchoolCount = $student->where('nflat_category', 'Intermediate')
			->distinct('school_uuid')
			->count();

		// Junior Students and School count
		$srStudentCount = $student->where('nflat_category', 'Senior')->count();
		$srSchoolCount = $student->where('nflat_category', 'Senior')
			->distinct('school_uuid')
			->count();


		// Json Encode Data
		$data = [
			'schoolCount' => $schoolCount,
			'studentCount' => $studentCount,
			'jrStudentCount' => $jrStudentCount,
			'jrSchoolCount' => $jrSchoolCount,
			'midStudentCount' => $midStudentCount,
			'midSchoolCount' => $midSchoolCount,
			'srStudentCount' => $srStudentCount,
			'srSchoolCount' => $srSchoolCount,
		];

		return Inertia::render('Admin/Dashboard', [
			'data' => $data,
		]);
	}


	/**
	 *
	 * School details route
	 *
	 */
	public function school()
	{
		$schoolQuery = School::query();


		if (request("name")) {
			$schoolQuery
				->where("school_name", "like", "%" . request("name") . "%");
		}
		if (request('uuid')) {
			$schoolQuery
				->where("school_uuid", "like", "%" . request("uuid") . "%");
		}
		if (request('state')) {
			$schoolQuery
				->where('school_state', request('state'));
		}
		if (request('contact')) {
			$schoolQuery
				->where("school_mobile", "like", "%" . request("contact") . "%");
		}

		$schoolList = $schoolQuery->paginate(20)->appends(request()->query());

		// Encrypt school_uuid for each school
		$schoolList->getCollection()->transform(function ($school) {
			$school->encrypted_uuid = base64_encode($school->school_uuid);
			return $school;
		});


		$statesList = Pincode::select('state')->distinct()->orderBy('state')->pluck('state');

		$schoolDataJson = [
			'schoolList' => $schoolList,
		];

		return Inertia::render('Admin/School/Index', [
			'school' => $schoolDataJson,
			'statesList' => $statesList,
			'queryParams' => request()->query() ?: null,
		]);
	}

	/**
	 *
	 * download the student record
	 *
	 */
	public function schoolExport(Request $request)
	{
		// Retrieve query parameters (e.g., date range or specific columns)
		$filters = $request->all();

		return Excel::download(new adminSchoolExport($filters), 'schools.xlsx');
	}

	/**
	 *
	 * View the individual School and their statistics
	 *
	 */
	public function schoolView($uuid)
	{

		// Decrypt the school UUID
		$decryptedUuid = base64_decode($uuid);

		// Fetch the school details using the decrypted UUID
		$school = School::with('student')
			->where('school_uuid', $decryptedUuid)
			->firstOrFail();

		$studentQuery = Student::query();
		if (request("name")) {
			$studentQuery
				->where("student_name", "like", "%" . request("name") . "%");
		}
		if (request('class')) {
			$studentQuery
				->where('student_class', request('class'));
		}
		if (request('category')) {
			$studentQuery
				->where('nflat_category', request('category'));
		}
		// Paginate students associated with the school
		$students = $studentQuery->where('school_uuid', $decryptedUuid)->paginate(20)
			->appends(request()->query());


		// get the counts of students on various parameters for stats
		// Aggregate the counts in a single query
		$stats = Student::where('school_uuid', $decryptedUuid)
			->selectRaw("
				COUNT(*) as registeredStudents,
				SUM(CASE WHEN nflat_category = 'Junior' THEN 1 ELSE 0 END) as jrRegisteredStudents,
				SUM(CASE WHEN nflat_category = 'Intermediate' THEN 1 ELSE 0 END) as midRegisteredStudents,
				SUM(CASE WHEN nflat_category = 'Senior' THEN 1 ELSE 0 END) as srRegisteredStudents,
				SUM(CASE WHEN exam_attempt = '2' THEN 1 ELSE 0 END) as attemptedStudents,
				SUM(CASE WHEN nflat_category = 'Junior' AND exam_attempt = '2' THEN 1 ELSE 0 END) as jrAttemptedStudents,
				SUM(CASE WHEN nflat_category = 'Intermediate' AND exam_attempt = '2' THEN 1 ELSE 0 END) as midAttemptedStudents,
				SUM(CASE WHEN nflat_category = 'Senior' AND exam_attempt = '2' THEN 1 ELSE 0 END) as srAttemptedStudents")
			->first()->toArray();


		// Use array_map to replace null values with 0
		$stats = array_map(function ($value) {
			return $value === null ? (int) 0 : $value;
		}, $stats);

		// Encrypt school_uuid
		$school->encrypted_uuid = base64_encode($school->school_uuid);

		return Inertia::render('Admin/School/View', [
			'school' => new AdminSchoolResource($school),
			'students' => AdminStudentResource::collection($students),
			'stats' => $stats,
			'queryParams' => request()->query() ?: null,
		]);
	}





	/**
	 *
	 * Generate a Score
	 *
	 */
	public function renderScore()
	{
		$getNonScoreStudentsList = Student::where('exam_attempt', 2)
			->where('score', '')
			->pluck('student_uuid');

		foreach ($getNonScoreStudentsList as $nonScoredStudent) {
			// Initialize an empty array to store the IDs
			$questionAnswers = [];
			$flattenedArray = [];

			// get the answers from the quiz log
			$quiz_logs = DB::table('quiz_logs')->where('student_uuid', $nonScoredStudent)->firstOrFail();
			$questions = json_decode($quiz_logs->questions, true);

			foreach ($questions as $question) {
				foreach ($question as $que) {
					foreach ($que as $flatArray) {
						dd($flatArray);
						$flattenedArray[] = $flatArray;
					}
				}
			}
			// // Loop through each category (if categories are present) and extract the id and correct_answer
			// foreach ($questions as $category) {
			// 	foreach ($category as $que) {
			// 		// Check if 'questions' exist within the que
			// 		if (isset($que['questions']) && is_array($que['questions'])) {
			// 			// Loop through each question in the que
			// 			foreach ($que['questions'] as $question) {
			// 				// Add the id and correct_answer as key-value pair in the result array
			// 				$questionAnswers[$question['id']] = $question['correct_answer'];
			// 			}
			// 		}
			// 	}
			// }
		}
		dd($flattenedArray);
	}
}
