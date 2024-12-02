<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
	/** @use HasFactory<\Database\Factories\UserFactory> */
	use HasFactory, Notifiable;

	protected $wrap = false;


	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'student_uuid',
		'school_uuid',
		'gender',
		'student_name',
		'student_class',
		'nflat_category',
		'student_section',
		'date_of_birth',
		'parent_name',
		'parent_email_id',
		'parent_mobile_number',
		'password',
		'allowed_attempts',
		'last_login',
		'email_verified_at',
		'mobile_verified_at',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		// 'password'
	];

	/**
	 * Get the attributes that should be cast.
	 *
	 * @return array<string, string>
	 */
	protected function casts(): array
	{
		return [
			'email_verified_at' => 'datetime',
			'mobile_verified_at' => 'datetime',
			'password' => 'encrypted'
		];
	}

	public function school()
	{
		return $this->belongsTo(School::class, 'school_uuid', 'school_uuid');
	}

	// protected $primaryKey = 'student_uuid'; // If your primary key is custom

	// public function getAuthIdentifierName()
	// {
	// 	return 'student_uuid';
	// }

	// public function getAuthIdentifier()
	// {
	// 	return $this->student_uuid;
	// }
}
