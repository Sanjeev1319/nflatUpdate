<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolResource extends JsonResource
{
		public static $wraps = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
			return [
				"school_uuid"=> $this->school_uuid,
				"school_name"=> $this->school_name,
				"school_email"=> $this->school_email,
				"school_mobile"=> $this->school_mobile,
				"school_address_line_1"=> $this->school_address_line_1,
				"school_area"=> $this->school_area,
				"school_pincode"=> $this->school_pincode,
				"school_district"=> $this->school_district,
				"school_state"=> $this->school_state,
				"incharge_name"=> $this->incharge_name,
				"incharge_email"=> $this->incharge_email,
				"principal_name"=> $this->principal_name,
				"principal_email"=> $this->principal_email,
			];
    }
}
