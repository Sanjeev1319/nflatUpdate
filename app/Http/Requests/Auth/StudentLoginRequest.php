<?php

namespace App\Http\Requests\Auth;

use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class StudentLoginRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'student_uuid' => ['required', 'string', 'max:10'],
			'password' => ['required', 'string'],
		];
	}

	/**
	 * Attempt to authenticate the request's credentials.
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function authenticate(): void
	{

		// $this->ensureIsNotRateLimited();

		// if (!Auth::guard('student')->attempt($this->only('student_uuid', 'password'))) {
		// 	RateLimiter::hit($this->throttleKey());

		// 	throw ValidationException::withMessages([
		// 		'student_uuid' => trans('auth.failed'),
		// 	]);
		// }

		// $student = Student::where('student_uuid', $this->input('student_uuid'))->first();

		// $student->update([
		// 	'last_login' => Carbon::now()
		// ]);

		// $exists = DB::table('quiz_logs')->where('student_uuid', $this->input('student_uuid'))->exists();

		// if (!$exists) {
		// 	DB::table('quiz_logs')->insert([
		// 		'student_uuid' => $this->input('student_uuid'),
		// 	]);
		// }

		// session(['user_id' => $student->student_uuid]);
		// // Log the student in
		// Auth::guard('student')->login($student);
		// // Manually store the student_uuid as user_id in the session table
		// session(['user_id' => $student->student_uuid]);


		// RateLimiter::clear($this->throttleKey());

		// dd($this->input());
		$this->ensureIsNotRateLimited();
		$student = Student::where('student_uuid', $this->input('student_uuid'))->first();
		if (!$student || $this->input('password') !== $student->password) {
			RateLimiter::hit($this->throttleKey());
			throw ValidationException::withMessages([
				'student_uuid' => trans('auth.failed'),
			]);
		}
		$student->update([
			'last_login' => Carbon::now()
		]);
		// Log the student in
		Auth::guard('student')->login($student);
		RateLimiter::clear($this->throttleKey());
	}

	/**
	 * Ensure the login request is not rate limited.
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function ensureIsNotRateLimited(): void
	{
		if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
			return;
		}

		event(new Lockout($this));

		$seconds = RateLimiter::availableIn($this->throttleKey());

		throw ValidationException::withMessages([
			'student_uuid' => trans('auth.throttle', [
				'seconds' => $seconds,
				'minutes' => ceil($seconds / 60),
			]),
		]);
	}

	/**
	 * Get the rate limiting throttle key for the request.
	 */
	public function throttleKey(): string
	{
		return Str::transliterate(Str::upper($this->string('student_uuid')) . '|' . $this->ip());
	}
}
