<?php

namespace App\Http\Controllers;

use App\Mail\SchoolOtpMail;
use Illuminate\Http\Request;
use App\Models\School;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;



class OTPController extends Controller
{
	public function sendEmailOtp(Request $request)
	{
		// dd($request->email);

		// Validate the email input
		$request->validate([
			'email' => 'required|email|unique:schools,school_email|max:255',
		]);

		$otp = rand(100000, 999999);
		$request->session()->put('email_otp', $otp);
		$request->session()->put('email', $request->email);

		// Send OTP via email
		// Mail::raw("Your OTP is: $otp", function ($message) use ($request) {
		// 	$message->to($request->email)
		// 		->subject('Email OTP Verification');
		// });

		Log::info('Email OTP', [$otp]);

		// Send confirmation email to the school email
		// Mail::to($request->email)->send(new SchoolOtpMail($otp, $request->email));


		// Redirect back with a success message (you can use session to flash the success message)
		return redirect()->back()->with('success', 'OTP sent to your email successfully.');
	}

	public function verifyEmailOtp(Request $request)
	{
		$request->validate(['otp' => 'required|digits:6']);

		$sessionOtp = $request->session()->get('email_otp');
		$sessionEmail = $request->session()->get('email');

		if ($request->otp == $sessionOtp) {
			$request->session()->forget('email_otp');
			return redirect()->back()->with(['success' => 'Email verified successfully.']);
		}

		// Redirect back with a success message (you can use session to flash the success message)
		return redirect()->back()->withErrors(['otp' => 'Invalid OTP.'])->withInput();
	}

	public function sendMobileOtp(Request $request)
	{

		$request->validate(['mobile' => 'required|digits:10|unique:schools,school_mobile']);

		$otp = rand(100000, 999999);
		$request->session()->put('mobile_otp', $otp);
		$request->session()->put('mobile', $request->mobile);
		Log::info('Mobile OTP for ' . $request->mobile . ': ' . $otp);

		// Send the SMS using the SMSController
		// $smsController = new SMSController($otp, $request->mobile);
		// $smsController->sendSMS();

		// Redirect back with a success message (you can use session to flash the success message)
		return redirect()->back()->with('success', 'OTP sent to your mobile successfully.');
	}

	public function verifyMobileOtp(Request $request)
	{
		$request->validate(['otp' => 'required|digits:6']);

		$sessionOtp = $request->session()->get('mobile_otp');

		if ($request->otp == $sessionOtp) {
			$request->session()->forget('mobile_otp');
			return redirect()->back()->with(['success' => 'Mobile number verified successfully.']);
		}

		// Redirect back with a success message (you can use session to flash the success message)
		return redirect()->back()->withErrors(['otp' => 'Invalid OTP.'])->withInput();
	}
}
