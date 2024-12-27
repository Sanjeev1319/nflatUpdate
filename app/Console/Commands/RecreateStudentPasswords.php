<?php

namespace App\Console\Commands;

use App\Helpers\PasswordHelper;
use App\Models\Student;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class RecreateStudentPasswords extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'student:recreate-passwords';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Recreate and re-encrypt student passwords with the new encryption key';

	/**
	 * Execute the console command.
	 */
	public function handle()
	{
		// Confirm action
		if ($this->confirm('Do you wish to recreate and re-encrypt all student passwords?')) {
			$students = Student::all();

			$bar = $this->output->createProgressBar(count($students));

			foreach ($students as $student) {
				$password = strtoupper(Str::random(8));
				// Encrypt it with the new key
				$newEncryptedPassword = PasswordHelper::encrypt($password);
				// Update the student record
				$student->password = $newEncryptedPassword;
				$student->save();

				// Advance the progress bar
				$bar->advance();
			}

			// Finish the progress bar
			$bar->finish();
			$this->info("\nPasswords have been successfully re-encrypted with the new key.");
		} else {
			$this->info('Operation cancelled.');
		}
	}
}
