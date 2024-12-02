<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class School extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_uuid',
        'school_name',
        'school_email',
        'school_email_otp',
        'school_mobile',
        'school_mobile_otp',
        'incharge_name',
        'incharge_email',
        'incharge_mobile',
        'principal_name',
        'principal_email',
        'principal_mobile',
        'school_address_line_1',
        'school_area',
        'school_pincode',
        'school_district',
        'school_state',
        'password',
        'email_verified_at',
        'mobile_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
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
            'password' => 'hashed',
        ];
    }

	public function student()
	{
			return $this->hasMany(Student::class, 'school_uuid', 'school_uuid');
	}
}
