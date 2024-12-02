<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Quizquestions extends Model
{

	/** @use HasFactory<\Database\Factories\UserFactory> */
	use HasFactory, Notifiable;

	public function quizbank()
	{
		return $this->belongsTo(Quizbank::class);
	}
}
