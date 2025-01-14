<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;

class questionPaperExport implements FromArray
{
	protected $filters;

	public function __construct($filters)
	{
		$this->filters = $filters;
	}

	public function array()
	{
		return $this->filters;
	}
}
