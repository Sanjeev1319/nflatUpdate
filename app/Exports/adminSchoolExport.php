<?php

namespace App\Exports;

use App\Models\School;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class adminSchoolExport implements FromCollection, WithHeadings
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
		$schoolQuery = School::query();

		if (empty($this->filters)) {
			return $schoolQuery->select(
				'school_uuid',
				'school_name',
				'school_email',
				'school_mobile',
				'school_address_line_1',
				'school_pincode',
				'school_area',
				'school_district',
				'school_state',
				'incharge_name',
				'incharge_email',
				'incharge_mobile',
				'principal_name',
				'principal_email',
				'principal_mobile',
				'school_board'
			)->get();
		} else {
			if (isset($this->filters["name"])) {
				$schoolQuery
					->where("school_name", "like", "%" . request("name") . "%");
			}
			if (isset($this->filters['uuid'])) {
				$schoolQuery
					->where("school_uuid", "like", "%" . request("uuid") . "%");
			}
			if (isset($this->filters['state'])) {
				$schoolQuery
					->where('school_state', request('state'));
			}
			if (isset($this->filters['contact'])) {
				$schoolQuery
					->where("school_mobile", "like", "%" . request("contact") . "%");
			}

			return $schoolQuery->select(
				'school_uuid',
				'school_name',
				'school_email',
				'school_mobile',
				'school_address_line_1',
				'school_pincode',
				'school_area',
				'school_district',
				'school_state',
				'incharge_name',
				'incharge_email',
				'incharge_mobile',
				'principal_name',
				'principal_email',
				'principal_mobile',
				'school_board'
			)->get();
		}
	}

	public function headings(): array
	{
		// Return the headings to be used as the first row in the Excel file
		return [
			'UUID',
			'Name',
			'Email',
			'Mobile',
			'Address',
			'Pincode',
			'Area',
			'District',
			'State',
			'Incharge Name',
			'Incharge Email',
			'Incharge Mobile',
			'Principal Name',
			'Principal Email',
			'Principal Mobile',
			'Board',
		];
	}
}
