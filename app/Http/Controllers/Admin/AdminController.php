<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
	public function dashboard(Student $student, School $school)
	{
		// total counts
		$schoolCount = $school->count();
		$studentCount = $student->count();

		// Junior Students and School count
		$jrStudentCount = $student->where('nflat_category', 'Junior')->count();
		$jrSchoolCount = $student->where('nflat_category', 'Junior')
			->distinct('school_uuid')
			->count();

		// Junior Students and School count
		$midStudentCount = $student->where('nflat_category', 'Intermediate')->count();
		$midSchoolCount = $student->where('nflat_category', 'Intermediate')
			->distinct('school_uuid')
			->count();

		// Junior Students and School count
		$srStudentCount = $student->where('nflat_category', 'Senior')->count();
		$srSchoolCount = $student->where('nflat_category', 'Senior')
			->distinct('school_uuid')
			->count();


		// Json Encode Data
		$data = [
			'schoolCount' => $schoolCount,
			'studentCount' => $studentCount,
			'jrStudentCount' => $jrStudentCount,
			'jrSchoolCount' => $jrSchoolCount,
			'midStudentCount' => $midStudentCount,
			'midSchoolCount' => $midSchoolCount,
			'srStudentCount' => $srStudentCount,
			'srSchoolCount' => $srSchoolCount,
		];

		return Inertia::render('Admin/Dashboard', [
			'data' => $data,
		]);
	}
}
