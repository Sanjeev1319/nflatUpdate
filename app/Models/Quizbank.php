<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Quizbank extends Model
{

	/** @use HasFactory<\Database\Factories\UserFactory> */
	use HasFactory, Notifiable;

	public function quizQuestions()
	{
		return $this->hasMany(Quizquestions::class);
	}
}
