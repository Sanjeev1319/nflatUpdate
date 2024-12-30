<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminViewStudentResource extends JsonResource
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
			"student_uuid" => $this->student_uuid,
			"school_uuid" => $this->school,
			"student_name" => $this->student_name,
			"student_class" => $this->student_class,
			"student_section" => $this->student_section,
			"nflat_category" => $this->nflat_category,
			"date_of_birth" => $this->date_of_birth,
			"gender" => $this->gender,
			"parent_name" => $this->parent_name,
			"parent_email_id" => $this->parent_email_id,
			"parent_mobile_number" => $this->parent_mobile_number,
			"password" => $this->password,
			"exam_attempt" => $this->exam_attempt,
			"score" => json_decode($this->score, true)
		];
	}
}
