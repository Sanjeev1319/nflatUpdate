<?php

namespace App\Http\Controllers\School;

use App\Exports\StudentsExport;
use App\Imports\StudentsImport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\StudentListResource;
use App\Http\Resources\StudentResource;
use App\Mail\SchoolUpdateMail;
use App\Models\School;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;  // Make sure you import the Excel facade correctly
use Illuminate\Support\Str;

class SchoolDashboardController extends Controller
{
	/**
	 * Display the login view.
	 */
	public function index()
	{
		$school_uuid = auth('school')->user()->school_uuid;
		$totalStudent = Student::where('school_uuid', $school_uuid)->count();
		$jrStudent = Student::where('school_uuid', $school_uuid)->where('nflat_category', 'Junior')->count();
		$midStudent = Student::where('school_uuid', $school_uuid)->where('nflat_category', 'Intermediate')->count();
		$srStudent = Student::where('school_uuid', $school_uuid)->where('nflat_category', 'Senior')->count();

		$studentCount = [
			'totalStudent' => $totalStudent,
			'jrStudent' => $jrStudent,
			'midStudent' => $midStudent,
			'srStudent' => $srStudent,
		];

		return Inertia::render('School/Dashboard', [
			'studentCount' => $studentCount,
			'success' => session('success'),
			'links' => session('route'),
		]);
	}


	/**
	 * Display the individual student registration form.
	 */
	public function studentRegister()
	{

		// Fetch data from the NFLATCategory table without a model
		$categories = DB::table('nflatcategories')->get(); // You can use ->get(), ->pluck(), etc., as per your needs

		return Inertia::render('School/StudentRegister', [
			'nflatCategories' => $categories,
			'success' => session('success'),
		]);
	}

	/**
	 * Display the submit the form.
	 */
	public function studentRegisterStore(Request $request)
	{
		$school_uuid = auth('school')->user()->school_uuid;
		$request->validate([
			'name' => 'required|string|max:255',
			'section' => 'required|string|max:10',
			'dob' => 'required|date|before:today',
			'gender' => ['required', Rule::in(['Male', 'Female', 'Other'])],
			'parent_name' => 'required|string|max:255',
			'parent_email' => 'nullable|email|max:255',
			'parent_mobile' => 'nullable|digits:10',
			'class' => 'required|integer',
		]);

		// Check for duplicates based on name, section, dob, gender, and parent_name
		$duplicate = Student::where('school_uuid', $school_uuid)
			->where('student_name', $request->name)
			->where('student_section', $request->section)
			->where('student_class', $request->class)
			->where('date_of_birth', $request->dob)
			->where('gender', $request->gender)
			->where('parent_name', $request->parent_name)
			->exists();  // Use exists() to check if any record matches the given criteria

		// If a duplicate is found, return an error
		if ($duplicate) {
			return back()->withInput()->withErrors([
				'name' => 'A student with the same details already exists.',
			]);
		}

		// Fetch the last student with UUID
		$lastStudent = Student::latest('student_uuid')->first();
		$lastNumber = $lastStudent ? (int) substr($lastStudent->student_uuid, 0) : 10000;  // Default to 10000 if no student exists
		// Increment the number
		$newNumber = $lastNumber + 1;
		$newUuid = $newNumber;

		// NFLAT category select
		$nflatCategory = DB::table('nflatcategories')->where('class', $request->class)->first();

		$password = strtoupper(Str::random(8));
		// dd($password);

		Student::create([
			'student_uuid' => $newUuid,
			'school_uuid' => $school_uuid,
			'student_name' => $request->name,
			'student_class' => $request->class,
			'student_section' => $request->section,
			'date_of_birth' => $request->dob,
			'gender' => $request->gender,
			'parent_name' => $request->parent_name,
			'parent_email_id' => $request->parent_email,
			'parent_mobile_number' => $request->parent_mobile,
			'password' => $password,
			'nflat_category' => $nflatCategory->category,
		]);

		return redirect()->route('school.dashboard')->with('success', 'Student registered successfully.');
	}


	/**
	 * Display the bulk student registration form.
	 */
	public function studentBulkRegister()
	{
		return Inertia::render('School/StudentBulkRegister', [
			'status' => session('status'),
			'import_errors' => session('import_errors', []), // Pass errors if available
			'success_message' => session('success_message'), // Pass success message if available
		]);
	}


	/*
	 * Import Method for excel bulk registration of students
	 */
	public function import(Request $request)
	{
		$request->validate([
			'file' => 'required|mimes:xlsx,csv|max:2048',
		]);

		// dd($request);
		// Ensure a file is uploaded
		$file = $request->file('file');
		if (!$file) {
			return back()->withErrors(['file' => 'No file uploaded']);
		}

		//dd(ini_get('upload_tmp_dir');

		$import = new StudentsImport();
		Excel::import($import, $request->file('file'));

		if (!empty($import->errors)) {
			// Return errors as a response to the frontend
			return back()->with([
				'import_errors' => $import->errors,
			]);
		}

		return redirect()->route('school.dashboard')->with([
			'success' => 'Students registered successfully!',
			'route' => route('school.studentList')
		]);
	}



	/**
	 * Display the student lists.
	 */
	public function studentList()
	{
		$school_uuid = auth('school')->user()->school_uuid;

		$students_query = Student::query();

		if (request("name")) {
			$students_query
				->where("student_name", "like", "%" . request("name") . "%");
		}
		if (request('class')) {
			$students_query
				->where('student_class', request('class'));
		}
		if (request('category')) {
			$students_query
				->where('nflat_category', request('category'));
		}

		$students = $students_query->where('school_uuid', $school_uuid)->paginate(20)->appends(request()->query());

		$studentCount = $students_query->where('school_uuid', $school_uuid)->count();

		// Store the previous URL in the session
		// session(['previousUrl' => url()->previous()]);

		return Inertia::render('School/StudentList', [
			'success' => session('success'),
			'students' => StudentListResource::collection($students),
			'studentCount' => $studentCount,
			'queryParams' => request()->query() ?: null,
		]);
	}


	/**
	 * Delete the student record.
	 *
	 */
	public function studentDestroy(Request $request)
	{
		// dd($request->student);
		Student::where('id', $request->student)->delete();

		return to_route('school.studentList')->with('success', 'Student record deleted.');
	}


	/*
	 * Edit the student record
	 *
	 */
	public function studentEdit(Request $request)
	{
		$student = Student::where('id', $request->edit)->get();
		// dd($student->all()[0]);
		// Fetch data from the NFLATCategory table without a model
		$categories = DB::table('nflatcategories')->get(); // can use ->get(), ->pluck(), etc., as per needs

		return Inertia::render('School/StudentEdit', [
			'student' => new StudentResource($student->all()[0]),
			'nflatCategories' => $categories,
		]);
	}

	/*
	 * Edit the student record
	 *
	 */
	public function studentEditStore(Request $request)
	{
		$school_uuid = auth('school')->user()->school_uuid;

		$request->validate([
			'name' => 'required|string|max:255',
			'section' => 'required|string|max:10',
			'dob' => 'required|date|before:today',
			'gender' => ['required', Rule::in(['Male', 'Female', 'Other'])],
			'parent_name' => 'required|string|max:255',
			'parent_email' => 'nullable|email|max:255',
			'parent_mobile' => 'nullable|digits:10',
			'class' => 'required|integer',
		]);

		// Check for duplicates based on name, section, dob, gender, and parent_name
		$duplicate = Student::where('school_uuid', $school_uuid)
			->where('student_name', $request->name)
			->where('student_section', $request->section)
			->where('student_class', $request->class)
			->where('date_of_birth', $request->dob)
			->where('gender', $request->gender)
			->where('parent_name', $request->parent_name)
			->where('parent_email_id', $request->parent_email)
			->where('parent_mobile_number', $request->parent_mobile)
			->exists();  // Use exists() to check if any record matches the given criteria

		// If a duplicate is found, return an error
		if ($duplicate) {
			return back()->withInput()->withErrors([
				'name' => 'A student with the same details already exists.',
			]);
		}

		// NFLAT category select
		$nflatCategory = DB::table('nflatcategories')->where('class', $request->class)->first();


		Student::where('id', $request->id)->update([
			'student_name' => $request->name,
			'student_class' => $request->class,
			'student_section' => $request->section,
			'date_of_birth' => $request->dob,
			'gender' => $request->gender,
			'parent_name' => $request->parent_name,
			'parent_email_id' => $request->parent_email,
			'parent_mobile_number' => $request->parent_mobile,
			'nflat_category' => $nflatCategory->category,
		]);

		return redirect()->route('school.dashboard')->with('success', 'Student details edited successfully.');
	}


	/*
	 *
	 * View School Profile
	 *
	 */
	public function profileView()
	{

		$school_uuid = auth::guard('school')->user()->school_uuid;

		$school_data = School::where('school_uuid', $school_uuid)->first();

		return Inertia::render('School/Profile', [
			'school' => $school_data,
		]);
	}

	/*
	 *
	 * View School Profile in edit mode
	 *
	 */
	public function profileEdit(Request $request)
	{

		$school_uuid = auth::guard('school')->user()->school_uuid;

		$school_data = School::where('school_uuid', $school_uuid)->first();

		return Inertia::render('School/Edit', [
			'school' => $school_data,
		]);
	}


	/*
	 *
	 * Edit School profile data
	 *
	 */

	public function profileEditStore(Request $request)
	{
		// dd($request->toArray());
		$school_uuid = $request->school_uuid;
		$school_name = $request->school_name;
		$school_email = $request->school_email;

		$email_array = [
			$request->incharge_email,
			$request->principal_email,
			$request->existing_principal_email,
			$request->existing_incharge_email
		];

		$unique_emails = array_unique($email_array);

		$request->validate([
			'incharge_name' => 'required|string|max:255',
			'incharge_email' => 'required|email|max:255',
			'incharge_mobile' => 'required|string|digits:10', // 10 digit mobile number
			'principal_name' => 'required|string|max:255',
			'principal_email' => 'required|email|max:255',
			'principal_mobile' => 'required|string|digits:10', // 10 digit mobile number
		]);

		School::where('school_uuid', $school_uuid)->update([
			'incharge_name' => $request->incharge_name,
			'incharge_email' => $request->incharge_email,
			'incharge_mobile' => $request->incharge_mobile,
			'principal_name' => $request->principal_name,
			'principal_email' => $request->principal_email,
			'principal_mobile' => $request->principal_mobile
		]);

		Mail::to($school_email)->cc($unique_emails)->send(new SchoolUpdateMail($school_name, $school_uuid));

		return redirect()->route('school.profileView')->with([
			'success' => 'School details successfully!',
		]);
	}


	/*
	 * download the student record
	 *
	 */
	public function studentExport(Request $request)
	{
		// Retrieve query parameters (e.g., date range or specific columns)
		$filters = $request->all();

		return Excel::download(new StudentsExport($filters), 'students.xlsx');

	}

}
