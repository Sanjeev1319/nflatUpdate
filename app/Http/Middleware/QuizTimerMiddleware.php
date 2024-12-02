<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class QuizTimerMiddleware
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next)
	{
		// Check if the quiz start time is stored in the session
		if (!Session::has('quiz_start_time')) {
			// If not, redirect back or show an error message
			return redirect()->route('student.instructions')->with('error', 'You must start the quiz to access this section.');
		}

		// Calculate the time elapsed
		$quizStartTime = Session::get('quiz_start_time');
		$currentTime = now();
		$elapsedTime = $currentTime->diffInMinutes($quizStartTime);

		// Check if the elapsed time exceeds 30 minutes
		if ($elapsedTime < -1) {
			// Clear the session and redirect the user
			Session::forget('quiz_start_time');
			return redirect()->route('student.instructions')->with('error', 'Your quiz session has expired.');
		}

		// Allow the request to proceed
		return $next($request);
	}
}
