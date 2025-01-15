<?php

namespace App\Http\Controllers\Admin;

use App\Exports\adminSchoolExport;
use App\Exports\adminStudentExport;
use App\Exports\questionPaperExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\AdminSchoolResource;
use App\Http\Resources\AdminStudentResource;
use App\Http\Resources\AdminViewStudentResource;
use App\Http\Resources\quizLogResource;
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


		// Quiz attempt count
		$studentAttempted = $student->where('exam_attempt', 2)->count();

		// Jr, Mid, Sr Attempted Students
		$jrStudentAttempted = $student->where('nflat_category', 'Junior')
			->where('exam_attempt', 2)
			->count();

		$srStudentAttempted = $student->where('nflat_category', 'Senior')
			->where('exam_attempt', 2)
			->count();

		$midStudentAttempted = $student->where('nflat_category', 'Intermediate')
			->where('exam_attempt', 2)
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
			'studentAttempted' => $studentAttempted,
			'jrStudentAttempted' => $jrStudentAttempted,
			'srStudentAttempted' => $srStudentAttempted,
			'midStudentAttempted' => $midStudentAttempted,
		];

		return Inertia::render('Admin/Dashboard', [
			'success' => session('success'),
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
		if (request('attempt')) {
			$studentQuery
				->where('exam_attempt', request('attempt'));
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

		// Encrypt school_uuid for each school
		$students->getCollection()->transform(function ($student) {
			$student->encrypted_student_uuid = base64_encode($student->student_uuid);
			return $student;
		});

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
			->where('score', null)
			->pluck('student_uuid');

		if ($getNonScoreStudentsList !== null) {
			foreach ($getNonScoreStudentsList as $nonScoredStudent) {
				// Initialize an empty array to store the IDs

				// scoreData Array
				$scoreData = [];

				// get the answers from the quiz log
				$quiz_logs = DB::table('quiz_logs')->where('student_uuid', $nonScoredStudent)->firstOrFail();
				if (!$quiz_logs) {
					continue; // Skip if no quiz logs found
				}

				// Decode the `questions` and `answers` JSON
				$questionsData = json_decode($quiz_logs->questions, true);
				$answersData = json_decode($quiz_logs->answers, true);

				if (empty($questionsData) || empty($answersData)) {
					continue; // Skip if data is incomplete
				}

				// total number of questions attempted
				$totalAttempt = count($answersData);
				$notAttempted = 60 - $totalAttempt;

				// negative Marking
				$negativeMarking = 0.25;

				$scoreData['total_attempt'] = $totalAttempt;
				$scoreData['not_attempted'] = $notAttempted;

				// Initialize score
				$correctAnswers = 0;
				$incorrectAnswers = 0;
				$minScore = 0;
				$maxScore = 60;

				// Loop through categories and questions
				foreach ($questionsData['categories'] as $category) {
					foreach ($category['questions'] as $question) {
						$questionId = $question['id'];
						$correctAnswer = $question['correct_answer'] ?? null;

						// Check if the user provided an answer
						if (isset($answersData[$questionId])) {
							$userAnswer = $answersData[$questionId];

							// Increment score if the user's answer matches the correct answer
							if ($userAnswer === $correctAnswer) {
								$correctAnswers++;
							} else {
								$incorrectAnswers++;
							}
						}
					}
				}

				$scoreData['correct_answers'] = $correctAnswers;
				$scoreData['incorrect_answers'] = $incorrectAnswers;

				$totalNegativeMarks = $incorrectAnswers * $negativeMarking;

				// Calculate the raw score
				$rawScore = $correctAnswers - $totalNegativeMarks;

				// Ensure the score is within the range [minScore, maxScore]
				$score = max($minScore, min($rawScore, $maxScore));

				// Add the score to the $scoreData array
				$scoreData['final_score'] = $score;

				Student::where('student_uuid', $nonScoredStudent)
					->update(['score' => $scoreData]);
			}

			return to_route('cpanel.dashboard')->with('success', 'The score data is updated.');

		}

		return to_route('cpanel.dashboard')->with('success', 'No data to update the scores.');

	}


	/*
	 * download the student record
	 *
	 */
	public function studentExport(Request $request)
	{
		// Retrieve query parameters (e.g., date range or specific columns)
		$filters = $request->all();

		$fileName = base64_decode($request->get('school'));

		return Excel::download(new adminStudentExport($filters), $fileName . '.xlsx');
	}

	/**
	 *
	 * View the individual School and their statistics
	 *
	 */
	public function studentView($uuid)
	{
		// Decrypt the school UUID
		$decryptedUuid = base64_decode($uuid);

		// Paginate students associated with the school
		$student = Student::where('student_uuid', $decryptedUuid)->first();

		// Encrypt school_uuid
		$student->encrypted_uuid = base64_encode($student->student_uuid);

		$quiz_logs = DB::table('quiz_logs')
			->where('student_uuid', $decryptedUuid)->first();

		if (!is_null($quiz_logs->answers)) {
			$answers = json_decode($quiz_logs->answers, true);
			$questions = json_decode($quiz_logs->questions, true);

			foreach ($questions['categories'] as &$catValue) {
				foreach ($catValue['questions'] as &$quest) {
					$questionId = $quest['id'];
					$quest['user_answer'] = $answers[$questionId] ?? null;
				}
			}
			unset($catValue, $quest); // Unset references for safety
		}

		$questions['encrypted_uuid'] = $uuid;

		// dd([json_decode($quiz_logs->questions, true), json_decode($quiz_logs->answers, true)]);

		return Inertia::render('Admin/Student/View', [
			'student' => new AdminViewStudentResource($student),
			'quiz_logs' => new quizLogResource($quiz_logs),
			'questionAnswers' => $questions,
		]);
	}

	/*
	 * download the student question paper with answers record
	 *
	 */
	public function questionPaperExport(Request $request)
	{
		$student_uuid = base64_decode($request->encrypted_uuid);
		$categories = $request->categories;

		$exportData[] = [
			'Question ID',
			'Student UUID',
			'NFLAT Category',
			'Quiz Category',
			'Question',
			'A',
			'B',
			'C',
			'D',
			'Language',
			'Correct Answer',
			'Student Answer',
			'Mark',
		];
		foreach ($categories as $catKey => $catValue) {
			$ques = $catValue["questions"];
			// dd($ques[0]);
			foreach ($ques as $queValue) {
				$marks = 0;
				if (!isset($queValue["user_answer"])) {
					$marks = 0;
				} elseif (isset($queValue['user_answer']) && $queValue['user_answer'] === $queValue["correct_answer"]) {
					$marks = 1;
				} else
					(
						$marks = -0.25
					);

				// dd($queValue);
				$exportData[] = [
					"id" => $queValue["id"],
					"student_uuid" => $student_uuid,
					"quizbank_id" => $queValue["quizbank_id"],
					"category" => $queValue["category"],
					"question" => $queValue["question"],
					"A" => $queValue["A"],
					"B" => $queValue["B"],
					"C" => $queValue["C"],
					"D" => $queValue["D"],
					"language" => $queValue["language"],
					"correct_answer" => $queValue["correct_answer"],
					"user_answer" => $queValue['user_answer'] ?? null,
					"marks" => $marks
				];
			}
		}

		// Retrieve query parameters (e.g., date range or specific columns)
		$filters = $exportData;


		// dd(gettype($filters));

		$fileName = base64_decode($request->encrypted_uuid);

		return Excel::download(new questionPaperExport($filters), $fileName . '.xlsx');
	}
}
