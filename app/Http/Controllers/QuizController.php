<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class QuizController extends Controller
{
	public function quizSubmit(Request $request)
	{

		$student_uuid = $request->student_uuid;
		$answers = json_encode($request->answers);
		$exam_endtime = Carbon::now();
		$final_submit = 2;


		$quiz_log_query = DB::table("quiz_logs")
			->where('student_uuid', $student_uuid)
			->first();
		$getAttempt = $quiz_log_query->attempt;
		$getExamJson = json_decode($quiz_log_query->exam_time, true);

		$getExamJson[$getAttempt]['exam_end'] = $exam_endtime;

		$addExamEndTime = json_encode($getExamJson);


		DB::table("quiz_logs")
			->where("student_uuid", $student_uuid)
			->update([
				'answers' => $answers,
				'exam_time' => $addExamEndTime,
				'submit_type' => $final_submit,
				'remaining_time' => null,
			]);

		DB::table('students')
			->where("student_uuid", $student_uuid)
			->update([
				'exam_attempt' => $final_submit,
			]);

		Session::forget("exam_start_time");
		Session::forget("student_uuid");
		Session::forget("exam_time");
		Session::forget("quiz_start");
		Session::forget("exam_in_progress");

		return redirect()->route("student.index");
	}


	public function quizIntervalSubmit(Request $request)
	{
		$student_uuid = $request->student_uuid;
		$answers = json_encode($request->input("answers"));
		$remaining_time = $request->remaining_time;
		$interal_submit = 1;
		$exam_endtime = Carbon::now();

		// dd($request->input("answers"));

		$quiz_log_query = DB::table("quiz_logs")->where('student_uuid', $student_uuid)->first();
		$getAttempt = $quiz_log_query->attempt;
		$getExamJson = json_decode($quiz_log_query->exam_time, true);

		$getExamJson[$getAttempt]['exam_end'] = $exam_endtime;

		$addExamEndTime = json_encode($getExamJson);

		DB::table("quiz_logs")
			->where("student_uuid", $student_uuid)
			->update([
				'answers' => $answers,
				'exam_time' => $addExamEndTime,
				'submit_type' => $interal_submit
			]);

		DB::table('students')
			->where("student_uuid", $student_uuid)
			->update([
				'exam_attempt' => $interal_submit,
			]);
	}
}
