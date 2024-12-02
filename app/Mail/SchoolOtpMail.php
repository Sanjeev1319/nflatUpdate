<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SchoolOtpMail extends Mailable
{
	use Queueable, SerializesModels;

	public $otp;
	public $school_email;
	/**
	 * Create a new message instance.
	 */
	public function __construct($otp, $school_email)
	{
		$this->otp = $otp;
		$this->school_email = $school_email;
	}

	/**
	 * Get the message envelope.
	 */
	public function envelope(): Envelope
	{
		return new Envelope(
			subject: 'Verify your Email ID to register your school for NFLAT.',
		);
	}

	/**
	 * Get the message content definition.
	 */
	public function content(): Content
	{
		return new Content(
			view: 'emails.school_email_verification', // Specify the email view
			with: [
				'school_email' => $this->school_email,
				'otp' => $this->otp, // Pass all necessary data to the view
			]
		);
	}

	/**
	 * Get the attachments for the message.
	 *
	 * @return array<int, \Illuminate\Mail\Mailables\Attachment>
	 */
	public function attachments(): array
	{
		return [];
	}
}
