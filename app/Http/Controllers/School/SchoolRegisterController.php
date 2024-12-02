<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Mail\SchoolRegistrationMail;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class SchoolRegisterController extends Controller
{
	/**
	 * Display the registration view.
	 */
	public function create(): Response
	{
		return Inertia::render('Auth/SchoolRegister');
	}

	/**
	 * Handle an incoming registration request.
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function store(Request $request)
	{

		// dd($request->all());
		$request->validate([
			'school_name' => 'required|string|max:255',
			'school_email' => 'required|email|unique:schools,school_email|max:255',
			'school_email_otp' => 'required|string|size:6',
			'school_mobile' => 'required|string|digits:10|unique:schools,school_mobile', // 10 digit mobile number
			'school_mobile_otp' => 'required|string|size:6',
			'incharge_name' => 'required|string|max:255',
			'incharge_email' => 'nullable|email|max:255',
			'incharge_mobile' => 'nullable|string|digits:10', // 10 digit mobile number
			'principal_name' => 'required|string|max:255',
			'principal_email' => 'nullable|email|max:255',
			'principal_mobile' => 'nullable|string|digits:10', // 10 digit mobile number
			'school_address_line_1' => 'required|string|max:255',
			'school_area' => 'nullable|string|max:255',
			'school_pincode' => 'required|string|regex:/^\d{6}$/', // Assuming 6-digit pincode
			'school_district' => 'required|string|max:255',
			'school_state' => 'required|string|max:255',
		]);

		// Generate a random 8-character alphanumeric password
		$randomPassword = str::random(8);

		// generate a new uuid
		// Fetch the last student with UUID
		$lastStudent = School::latest('school_uuid')->first();
		$lastNumber = $lastStudent ? (int) substr($lastStudent->school_uuid, 8) : 1000;  // Default to 1000 if no student exists
		// Increment the number
		$newNumber = $lastNumber + 1;

		// dd($newNumber);

		$region = DB::table('pincodes')->where('state', $request->school_state)->first();
		$regionSubStr = strtoupper(substr($region->region, 0, 3));

		$school_uuid = strtoupper($regionSubStr . substr($request->school_state, 0, 2) . substr($request->school_district, 0, 3) . $newNumber);


		$school_name = $request->school_name;
		$school_email = $request->school_email;


		// Create a new user record in the database
		$school = School::create([
			'school_name' => $request->school_name,
			'school_email' => $request->school_email,
			'school_email_otp' => $request->school_email_otp,
			'school_mobile' => $request->school_mobile,
			'school_mobile_otp' => $request->school_mobile_otp,
			'incharge_name' => $request->incharge_name,
			'incharge_email' => $request->incharge_email,
			'incharge_mobile' => $request->incharge_mobile,
			'principal_name' => $request->principal_name,
			'principal_email' => $request->principal_email,
			'principal_mobile' => $request->principal_mobile,
			'school_address_line_1' => $request->school_address_line_1,
			'school_area' => $request->school_area,
			'school_pincode' => $request->school_pincode,
			'school_district' => $request->school_district,
			'school_state' => $request->school_state,
			'password' => Hash::make($randomPassword),  // Save the hashed password in the database
			'school_uuid' => $school_uuid,  // create a unique uuid
		]);

		// Send confirmation email to the school email
		Mail::to($school_email)->send(new SchoolRegistrationMail($school_name, $school_email, $randomPassword, $school_uuid));

		// return response()->json(['message' => 'School created successfully! A confirmation email has been sent.', 'data' => $school]);

		return redirect()->route('home')->with('success', $school_email);

		// event(new Registered($user));

		// Auth::login($user);

		// return redirect(route('dashboard', absolute: false));
	}
}
