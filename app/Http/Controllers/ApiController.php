<?php

namespace App\Http\Controllers;

use App\Http\Resources\APISchoolResource;
use App\Http\Resources\APIStudentResource;
use App\Models\Pincode;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
	public function nflat_school()
	{
		$schools = School::all();

		// Extract unique pincodes from schools
		$pincodes = $schools->pluck('school_pincode')->unique();

		// Query for regions matching any of these pincodes
		$regions = Pincode::whereIn('pincode', $pincodes)->get();

		// Append region data to each school
		$schools->map(function ($school) use ($regions) {
			$school->region = $regions->firstWhere('pincode', $school->school_pincode);
			return $school;
		});

		// return response()->json($schools, 419);
		return response()->json(APISchoolResource::collection($schools), 419);
	}


	public function nflat_student()
	{
		$students = Student::with("school")->get();

		// Extract unique pincodes from schools
		$pincodes = $students->pluck('school.school_pincode')->unique();

		// Query for regions matching any of these pincodes
		$regions = Pincode::whereIn('pincode', $pincodes)->get();

		// Append region data to each school
		$students->map(function ($student) use ($regions) {
			$student->region = $regions->firstWhere('pincode', $student->school->school_pincode);
			return $student;
		});

		return response()->json(APIStudentResource::collection($students), 419);
	}
}
