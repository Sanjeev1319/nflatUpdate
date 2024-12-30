<?php

namespace App\Exports;

use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class adminStudentExport implements FromCollection, WithHeadings
{

	protected $filters;

	public function __construct(array $filters)
	{
		$this->filters = $filters;
	}

	/**
	 * @return \Illuminate\Support\Collection
	 */
	public function collection()
	{
		$students = Student::query();

		if (empty($this->filters)) {
			return $students->select(
				'student_uuid',
				'school_uuid',
				'student_name',
				'student_class',
				'student_section',
				'nflat_category',
				'date_of_birth',
				'gender',
				'parent_name',
				'parent_email_id',
				'parent_mobile_number',
				'password',
				DB::raw('JSON_UNQUOTE(JSON_EXTRACT(score, "$.final_score")) as final_score'),
				DB::raw('CASE
                        WHEN exam_attempt = 1 THEN "Incomplete"
                        WHEN exam_attempt = 2 THEN "Complete"
                     END as status')
			)->get();
		} else {
			if (isset($this->filters["school"])) {
				$school_uuid = base64_decode(request("school"));
				$students
					->where("school_uuid", $school_uuid);
			}
			if (isset($this->filters['category'])) {
				$students->where('nflat_category', $this->filters['category']);
			}
			if (isset($this->filters['class'])) {
				$students->where('student_class', $this->filters['class']);
			}
			if (isset($this->filters['name'])) {
				$students->where("student_name", "like", "%" . $this->filters["student_name"] . "%");
			}

			return $students->select(
				'student_uuid',
				'school_uuid',
				'student_name',
				'student_class',
				'student_section',
				'nflat_category',
				'date_of_birth',
				'gender',
				'parent_name',
				'parent_email_id',
				'parent_mobile_number',
				'password',
				DB::raw('JSON_UNQUOTE(JSON_EXTRACT(score, "$.final_score")) as final_score'),
				DB::raw('CASE
                        WHEN exam_attempt = 1 THEN "Incomplete"
                        WHEN exam_attempt = 2 THEN "Complete"
                     END as status')
			)->get();
		}
	}


	public function headings(): array
	{
		// Return the headings to be used as the first row in the Excel file
		return [
			'Student ID',
			'School ID',
			'Student Name',
			'Class',
			'Section',
			'NFLAT Category',
			'Date of Birth',
			'Gender',
			'Parent Name',
			'Parent Email',
			'Parent Mobile',
			'Password',
			'Score',
			'Status'
		];
	}
}
