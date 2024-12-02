<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SchoolRegistrationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $school_name;
    public $school_email;
    public $password;
    public $school_uuid;

    /**
     * Create a new message instance.
     */
    public function __construct($school_name, $school_email, $password, $school_uuid)
    {
        $this->school_name = $school_name;
        $this->school_email = $school_email;
        $this->password = $password;
        $this->school_uuid = $school_uuid;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'School Registration Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.school_registration', // Specify the email view
            with: [
                'school_name' => $this->school_name,
                'school_email' => $this->school_email,
                'password' => $this->password, // Pass all necessary data to the view
                'school_uuid' => $this->school_uuid, // Pass all necessary data to the view
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
