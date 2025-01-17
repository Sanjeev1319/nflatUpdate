<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class APISchoolResource extends JsonResource
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
			"pincode" => $this->school_pincode,
			"board" => $this->school_board === "State Board" ? 'STATE' : strtoupper($this->school_board),
			"school_id" => $this->school_uuid,
			"district" => $this->school_district,
			"region" => $this->region->region ?? 'no',
			"state" => strtoupper($this->school_state),
			"year" => '2024-2025'
		];
	}
}
