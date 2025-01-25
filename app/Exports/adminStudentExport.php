<?php

namespace App\Exports;

use App\Models\QuizLog;
use App\Models\Student;
use Carbon\CarbonInterval;
use Illuminate\Support\Carbon;
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
		$students = Student::with('quizLog');

		if (!empty($this->filters)) {
			if (isset($this->filters['school'])) {
				$school_uuid = base64_decode($this->filters['school']);
				$students->where('school_uuid', $school_uuid);
			}
			if (isset($this->filters['category'])) {
				$students->where('nflat_category', $this->filters['category']);
			}
			if (isset($this->filters['class'])) {
				$students->where('student_class', $this->filters['class']);
			}
			if (isset($this->filters['name'])) {
				$students->where('student_name', 'like', '%' . $this->filters['name'] . '%');
			}
			if (isset($this->filters['attempt'])) {
				$students->where('exam_attempt', $this->filters['attempt']);
			}
		}

		$students = $students->get();

		return $students->map(function ($student) {
			// Calculate the total time spent from quiz logs
			$totalTimeSpent = 0;
			$examDate = null;

			foreach ($student->quizLog as $log) {
				if (isset($log->exam_time)) {
					$examTime = json_decode($log->exam_time, true);

					if ($examTime) {
						foreach ($examTime as $timestamps) {
							if (isset($timestamps['start_time'], $timestamps['exam_end'])) {
								$startTime = Carbon::parse($timestamps['start_time']);
								$examEnd = Carbon::parse($timestamps['exam_end']);
								$totalTimeSpent += $startTime->diffInSeconds($examEnd);
								// Set exam date if not already set
								if (!$examDate) {
									$examDate = $examEnd->toDateString();
								}
							}
						}
					}
				}
			}

			return [
				'student_uuid' => $student->student_uuid,
				'school_uuid' => $student->school_uuid,
				'student_name' => $student->student_name,
				'student_class' => $student->student_class,
				'student_section' => $student->student_section,
				'nflat_category' => $student->nflat_category,
				'date_of_birth' => $student->date_of_birth,
				'gender' => $student->gender,
				'parent_name' => $student->parent_name,
				'parent_email_id' => $student->parent_email_id,
				'parent_mobile_number' => $student->parent_mobile_number,
				'password' => $student->password,
				'final_score' => json_decode($student->score, true)['final_score'] ?? null,
				'status' => $student->exam_attempt == 1 ? 'Incomplete' : 'Complete',
				'time_spent' => CarbonInterval::seconds($totalTimeSpent)->cascade()->format('%H:%I:%S'), // Format as H:M:S
				'exam_date' => $examDate
			];
		});
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
			'Status',
			'Time Spent (H:M:S)',
			'Exam Date',
		];
	}
}
