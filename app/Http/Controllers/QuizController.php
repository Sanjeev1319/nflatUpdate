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

		$quiz_log_query = DB::table("quiz_logs")->where('student_uuid', $student_uuid)->first();

		if ($quiz_log_query->submit_type == $final_submit) {
			return redirect()->route("student.index");
		}

		DB::table("quiz_logs")
			->where("student_uuid", $student_uuid)
			->update([
				'answers' => $answers,
				'exam_end' => $exam_endtime,
				'submit_type' => $final_submit,
				'remaining_time' => null,
			]);

		Session::forget("exam_start_time");
		Session::forget("student_uuid");
		Session::forget("exam_time");
		Session::forget("quiz_start");

		return redirect()->route("student.index");
	}


	public function quizIntervalSubmit(Request $request)
	{
		$student_uuid = $request->student_uuid;
		$answers = json_encode($request->answers);
		$remaining_time = $request->remaining_time;
		$interal_submit = 1;

		DB::table("quiz_logs")
			->where("student_uuid", $student_uuid)
			->update([
				'answers' => $answers,
				'remaining_time' => $remaining_time,
				'submit_type' => $interal_submit
			]);
	}
}
