<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class questionPaperExport implements FromArray
{
	protected $filters;

	public function __construct(array $filters)
	{
		$this->filters = $filters;
	}


	/**
	 * Returns the array representation of the data to export.
	 *
	 * @return array
	 */
	public function array(): array
	{
		return [
			"array" => $this->filters,
		];
	}
}
