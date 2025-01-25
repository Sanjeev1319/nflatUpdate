<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizLog extends Model
{
	use HasFactory;

	// Define the table name if it's not 'quiz_logs'
	protected $table = 'quiz_logs';

	/**
	 * Get the students that owns the QuizLog
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function students()
	{
		return $this->belongsTo(Student::class, 'student_uuid', 'student_uuid');
	}
}
