<?php

namespace App\Http\Controllers\Student;

use App\Http\Resources\StudentResource;
use App\Models\Quizquestions;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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

		if (Session::has('quiz_start')) {
			return redirect()->route('student.startExam');
		};

		$allowAttempt = true;

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
		}


		if ($quiz_logs->exam_end != null) {
			$exam_complete = 'yes';
		}

		// dd($students);
		return Inertia::render('Student/Index', [
			'error' => session('error'),
			'studentData' => new StudentResource($student_details),
			'route' => session('route'),
			'allowAttempt' => $allowAttempt,
			'examComplete' => $exam_complete
		]);
	}


	/**
	 * prepare for the test make necessary arrangements.
	 */
	public function startExamStore(Request $request, Student $student)
	{

		$validate = $request->validate([
			'terms' => 'accepted',
		], [
			'terms.accepted' => 'You must accept the terms and conditions before starting the exam.',
		]);

		// get the general settings
		$general_settings = DB::table('general_settings')->get();

		// set the basic details
		$student_uuid = Auth::guard('student')->user()->student_uuid;
		$examStartTime = Carbon::now();

		// quiz logs
		$quiz_log = DB::table('quiz_logs')->where('student_uuid', $student_uuid)->first();


		if ($quiz_log->questions == null) {
			// Select 10 random questions from each category
			$categories = ['Banking', 'Insurance', 'Investment', 'Pension'];
			$questions = [
				'categories' => []
			];

			foreach ($categories as $category) {
				$questions['categories'][] = [
					'category_name' => $category,
					'questions' => Quizquestions::where('category', $category)
						->inRandomOrder()
						->limit(10)
						->get()
						->toArray()
				];
			}

			// Save questions in JSON format
			$jsonFile = "quiz_sessions/{$student_uuid}_questions.json";
			Storage::put($jsonFile, json_encode($questions));

			// If question does not exists, increment the attempt value and add a question
			DB::table('quiz_logs')
				->where('student_uuid', $student_uuid)
				->update([
					'attempt' => $quiz_log->attempt + 1,
					'exam_start' => $examStartTime, // Optional: Update exam start time
					'questions' => json_encode($questions),
				]);
		} else {
			// If question exists, increment the attempt value
			DB::table('quiz_logs')
				->where('student_uuid', $student_uuid)
				->update([
					'attempt' => $quiz_log->attempt + 1,
					'exam_start' => $examStartTime, // Optional: Update exam start time
				]);
		}

		$exam_time = $general_settings->where('setting', 'exam_time')->first();

		Session::put('exam_start_time', now());
		Session::put('student_uuid', $student_uuid);
		Session::put('exam_time', $exam_time->value);
		Session::put('quiz_start', true);
		// Session::forget('quiz_start_time');

		return redirect()->intended(route('student.startExam', absolute: false));
	}


	/**
	 * Start the exam.
	 */
	public function startExam()
	{

		$retryTime = null;
		$retryAnswers = null;

		$exam_session = Session::get('exam_start_time');
		// $exam_time = Session::get('exam_time');
		$student_uuid = Auth::guard('student')->user()->student_uuid;
		$session_student_uuid = Session::get('student_uuid');

		$exam_time = Session::get('exam_time');
		$quizStartTime = Carbon::parse(Session::get('exam_start_time'));

		$timeElapsed = now()->diffInMinutes($quizStartTime);
		$timeLeft = max($exam_time - $timeElapsed, 0);

		$minutes = $timeLeft % 60;

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
			'questions' => json_decode($questions),
			'timeLeft' => $minutes,
			'student_uuid' => $student_uuid,
			'retryTime' => $retryTime,
			'retryAnswers' => $retryAnswers,
		]);
	}
}
