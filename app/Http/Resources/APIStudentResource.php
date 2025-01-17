<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class APIStudentResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		return [
			"id" => $this->id,
			"pincode" => $this->school->school_pincode,
			"category" => "NFLAT " . strtoupper($this->nflat_category),
			"standard" => $this->student_class,
			"gender" => substr($this->gender, 0, 1),
			"dob" => $this->date_of_birth,
			"board" => $this->school->school_board,
			"school_id" => $this->school_uuid,
			"student_id" => $this->student_uuid,
			"district" => $this->school->school_district,
			"region" => $this->region->region ?? 'no',
			"state" => strtoupper($this->school->school_state),
			"year" => "2024-2025",
		];
	}
}
