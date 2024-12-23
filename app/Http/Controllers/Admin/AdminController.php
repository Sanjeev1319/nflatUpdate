<?php

namespace App\Http\Controllers\Admin;

use App\Exports\adminSchoolExport;
use App\Http\Controllers\Controller;
use App\Models\Pincode;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;  // Make sure you import the Excel facade correctly

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


	/**
	 *
	 * School details route
	 *
	 */
	public function school()
	{
		$schoolQuery = School::query();


		if (request("name")) {
			$schoolQuery
				->where("school_name", "like", "%" . request("name") . "%");
		}
		if (request('uuid')) {
			$schoolQuery
				->where("school_uuid", "like", "%" . request("uuid") . "%");
		}
		if (request('state')) {
			$schoolQuery
				->where('school_state', request('state'));
		}
		if (request('contact')) {
			$schoolQuery
				->where("school_mobile", "like", "%" . request("contact") . "%");
		}

		$schoolList = $schoolQuery->paginate(20)->appends(request()->query());


		$statesList = Pincode::select('state')->distinct()->orderBy('state')->pluck('state');

		$schoolDataJson = [
			'schoolList' => $schoolList,
		];

		return Inertia::render('Admin/School', [
			'school' => $schoolDataJson,
			'statesList' => $statesList,
			'queryParams' => request()->query() ?: null,
		]);
	}

	/**
	 *
	 * download the student record
	 *
	 */
	public function schoolExport(Request $request)
	{
		// Retrieve query parameters (e.g., date range or specific columns)
		$filters = $request->all();

		return Excel::download(new adminSchoolExport($filters), 'schools.xlsx');
	}
}
