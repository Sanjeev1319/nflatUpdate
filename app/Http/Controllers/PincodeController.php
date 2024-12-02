<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pincode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PincodeController extends Controller
{
	/**
	 * Fetch details based on the pincode.
	 *
	 * @param string $pincode
	 */
	public function getPincodeDetails(Request $request)
	{
		$request->validate(['pincode' => 'required|digits:6']);

		$pincodeDetails = Pincode::where('pincode', $request->pincode)->get();

		if ($pincodeDetails->isEmpty()) {
			return response()->json(['message' => 'Pincode not found'], 404);
		}

		$state = $pincodeDetails->first()->state;
		$district = $pincodeDetails->first()->district;
		$areas = $pincodeDetails->pluck('area')->unique();

		return response()->json([
			'state' => [$state],
			'district' => [$district],
			'areas' => $areas,
		]);
	}
}
