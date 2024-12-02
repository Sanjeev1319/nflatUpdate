<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class EnsureExamSessionActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
      $student_uuid = Auth::guard('student')->user()->student_uuid;
			$quiz_log = DB::table('quiz_logs')->where('student_uuid', $student_uuid)->first();

			if (!$quiz_log) {
				return redirect()->route('home')->with('error', 'Invalid session.');
			}

			$examStartTime = Carbon::parse($quiz_log->exam_start);
			$currentTime = Carbon::now();

			if ($currentTime->diffInMinutes($examStartTime) > 30) {
					return redirect()->route('home')->with('error', 'Session expired. Please restart the exam.');
			}

			return $next($request);
    }
}
