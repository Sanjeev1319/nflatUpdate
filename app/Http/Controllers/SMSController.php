<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SMSController extends Controller
{
	public $otp;
	public $mobile;
	/**
	 * Create a new message instance.
	 */
	public function __construct($otp, $mobile)
	{
		$this->otp = $otp;
		$this->mobile = $mobile;
	}

	public function sendSMS()
	{
		// Account details
		$apiKey = urlencode('NTY1OTRiNzY0MzRmNTE3YTRlNzM2YzM1Njk1MDZkNjM=');

		// Message details
		// $numbers = array(918123456789, 918987654321);
		$sender = urlencode('NCFEWM');
		$message = rawurlencode('Your verification code is ' . $this->otp . ' Team NFLAT');

		// $numbers = implode(',', $numbers);
		$numbers = '91' . $this->mobile;

		// Prepare data for POST request
		$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);

		// Send the POST request with cURL
		$ch = curl_init('https://api.textlocal.in/send/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$response = curl_exec($ch);

if ($response === false) {
    $error = curl_error($ch);
    curl_close($ch);
    //dd('cURL Error: ' . $error);
}
curl_close($ch);
//dd($response);

	}
}
