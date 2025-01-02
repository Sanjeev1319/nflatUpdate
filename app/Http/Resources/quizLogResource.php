<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class quizLogResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		// If the resource is empty, return an empty array
		if ($this->resource === null) {
				return [];
		}

		return [
			"id" => $this->whenNotNull($this->id),
			"student_uuid" => $this->student_uuid,
			"exam_time" => json_decode($this->exam_time, true),
			"attempt" => $this->attempt,
			"questions" => json_decode($this->questions, true),
			"answers" => json_decode($this->answers, true),
			"submit_type" => $this->submit_type,
		];
	}
}
