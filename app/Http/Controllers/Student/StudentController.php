<?php

namespace App\Http\Controllers\Student;

use App\Http\Resources\StudentResource;
use App\Models\Quizquestions;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Quizbank;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
	/**
	 * Display the login view.
	 */
	public function studentInstruction(Student $student)
	{

		$exam_complete = null;

		if (session('exam_in_progress')) {
			return redirect()->route('student.startExam');
		}
		;

		$allowAttempt = true;
		$retryAttempt = false;

		$student_details = $student::where("student_uuid", Auth::guard('student')->user()->student_uuid)->first();

		// general Settings
		$general_settings = DB::table('general_settings')->get();
		$maxAttempts = $general_settings->where('setting', 'max_attmpts')->pluck('value')->first();

		// quiz logs
		$quiz_logs = DB::table('quiz_logs')->where('student_uuid', Auth::guard('student')->user()->student_uuid)->first();

		if ($student_details->allowed_attempts !== null) {
			$maxAttempts = $student_details->allowed_attempts;
		}

		if ($quiz_logs !== null) {
			if ($quiz_logs->attempt >= $maxAttempts) {
				$allowAttempt = false;
			}
			;
		}
		;

		if ($quiz_logs->submit_type == 2) {
			$exam_complete = 'yes';
		}

		if ($quiz_logs->submit_type == 1) {
			$retryAttempt = true;
		}

		// dd($students);
		return Inertia::render('Student/Index', [
			'error' => session('error'),
			'studentData' => new StudentResource($student_details),
			'route' => session('route'),
			'allowAttempt' => $allowAttempt,
			'examComplete' => $exam_complete,
			'retryAttempt' => $retryAttempt
		]);
	}


	/**
	 * Handles the initialization of the student's exam process.
	 *
	 * Validates student agreement to terms, retrieves settings, checks for existing quiz logs,
	 * generates questions if necessary, and updates the student's exam log and session data.
	 *
	 * @param Request $request
	 * @param Student $student
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function startExamStore(Request $request, Student $student)
	{
		// Validate that the student has accepted the terms and conditions
		$request->validate([
			'terms' => 'accepted',
		], [
			'terms.accepted' => 'You must accept the terms and conditions before starting the exam.',
		]);

		$retryAttempt = false;

		// Retrieve general settings
		$generalSettings = DB::table('general_settings')->get();
		$examTimeSetting = $generalSettings->where('setting', 'exam_time')->first();

		// Get the authenticated student's UUID and category
		$studentUuid = Auth::guard('student')->user()->student_uuid;
		$examStartTime = now();
		$nflatCategory = Quizbank::where('quiz_name', Auth::guard('student')->user()->nflat_category)->value('id');

		// Check if a quiz log exists for the student
		$quizLog = DB::table('quiz_logs')->where('student_uuid', $studentUuid)->first();

		// Create a JSON object for tracking exam attempts with start time
		$attemptKey = $quizLog->attempt + 1;

		// Decode existing exam_time if it exists, otherwise start with an empty array
		$existingExamTime = $quizLog->exam_time ? json_decode($quizLog->exam_time, true) : [];

		if ($quizLog->submit_type == 1) {

			// Convert to Carbon instances
			$examJsonEndTime = Carbon::parse($existingExamTime[$quizLog->attempt]['exam_end']);
			$examJsonStartTime = Carbon::parse($existingExamTime[$quizLog->attempt]['start_time']);

			$attemptTime = round($examJsonEndTime->floatDiffInSeconds($examJsonStartTime));
			$finalExamTime = $examTimeSetting->value + $attemptTime;

			$retryAnswers = json_decode(json_encode($quizLog->answers), true);

		} else {
			$finalExamTime = $examTimeSetting->value;
		}


		// Add the new attempt's start time to the array
		$existingExamTime[$attemptKey] = ['start_time' => $examStartTime];

		// Encode the updated array back to JSON
		$examTimeArray = json_encode($existingExamTime);
		// dd($examTimeArray . $retryAnswers);
		if (is_null($quizLog->questions)) {
			// Define categories and prepare questions for the quiz
			$categories = ['General', 'Banking', 'Insurance', 'Investment', 'Pension'];
			$questions = ['categories' => []];

			// Fetch 12 random questions for each category
			foreach ($categories as $category) {
				$questions['categories'][] = [
					'category_name' => $category,
					'questions' => Quizquestions::where('quizbank_id', $nflatCategory)
						->where('category', $category)
						->inRandomOrder()
						->limit(12)
						->get()
						->toArray(),
				];
			}

			// Save questions to a JSON file for the student
			$jsonFile = "quiz_sessions/{$studentUuid}_questions.json";
			Storage::put($jsonFile, json_encode($questions));

			// Update the quiz log with new questions and increment the attempt count
			DB::table('quiz_logs')->where('student_uuid', $studentUuid)->update([
				'attempt' => $attemptKey,
				'exam_time' => $examTimeArray,
				'questions' => json_encode($questions),
			]);
		} else {
			// If questions already exist, only update the attempt count and exam time
			DB::table('quiz_logs')->where('student_uuid', $studentUuid)->update([
				'attempt' => $attemptKey,
				'exam_time' => $examTimeArray,
			]);
		}


		// Store necessary exam data in the session
		Session::put([
			'exam_start_time' => $examStartTime,
			'student_uuid' => $studentUuid,
			'exam_time' => $finalExamTime,
			'quiz_start' => true,
			'answers' => $retryAnswers ?? null,
		]);

		// Ensure if the user closes the tab, they are redirected to the home page
		session(['exam_in_progress' => true]);

		// Redirect the student to the exam page
		return redirect()->route('student.startExam');
	}


	/**
	 * Start the exam.
	 */
	public function startExam()
	{
		if (!session('exam_in_progress')) {
			return redirect()->route('student.index');
		}

		$student_details = Student::where("student_uuid", Auth::guard('student')->user()->student_uuid)
			->first();

		// dd($student_details);
		$retryTime = null;
		$retryAnswers = null;
		if (Session::has('answers')) {
			$retryAnswers = Session::get('answers');
		}

		// dd($retryAnswers);

		$exam_session = Session::get('exam_start_time');
		// $exam_time = Session::get('exam_time');
		$student_uuid = Auth::guard('student')->user()->student_uuid;
		$session_student_uuid = Session::get('student_uuid');


		$exam_time = Session::get('exam_time');
		$quizStartTime = Carbon::parse(Session::get('exam_start_time'));

		// queries
		$setting_query = DB::table('general_settings')->get();
		$quiz_log_query = DB::table('quiz_logs')->where('student_uuid', $student_uuid)->first();

		if ($quiz_log_query->submit_type == '1') {
			$timeLeft = $quiz_log_query->submit_type;
			$minutes = $timeLeft % 60;
		}

		// check if the exam session is null then redirect
		if ($session_student_uuid == null || $exam_session == null) {
			return redirect()->route('student.index');
		}

		//check if the auth student id and session student id match.
		if ($student_uuid !== $session_student_uuid) {
			return redirect()->route('student.index');
		}

		// get questions from the database and the path of the questions json
		$questions = $quiz_log_query->questions;

		return Inertia::render('Student/Exam', [
			'studentData' => new StudentResource($student_details),
			'questions' => json_decode($questions),
			'examTime' => $exam_time,
			'student_uuid' => $student_uuid,
			'retryAnswers' => $retryAnswers,
		]);
	}
}
