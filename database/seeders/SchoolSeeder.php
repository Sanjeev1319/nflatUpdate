<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      // Inserting data into the schools table
        DB::table('schools')->insert([
            'school_uuid' => 'DTAXX0GEZD',
            'school_name' => 'RIGEL RIVERS',
            'school_email' => 'xipov@mailinator.com',
            'school_email_otp' => '268982',
            'school_mobile' => '9594635009',
            'school_mobile_otp' => '756534',
            'school_address_line_1' => '183 East New Boulevard',
            'school_area' => 'xBlanditiis quo dolor',
            'school_pincode' => '404040',
            'school_district' => 'Tempore consequatur',
            'school_state' => 'Adipisci excepturi a',
            'incharge_name' => 'KYLIE MCKNIGHT',
            'incharge_email' => 'lytuluwWk@mailinator.com',
            'incharge_mobile' => '9594635509',
            'principal_name' => 'VIOLET AGUIRRE',
            'principal_email' => 'kitiqadn@mailinator.com',
            'principal_mobile' => '9594635049',
            'password' => bcrypt('5qPg0L94'), // Make sure to encrypt the password
        ]);
				DB::table('schools')->insert([
            'school_uuid' => 'DTAXX0GEZE',
            'school_name' => 'RIGEL RIVERS',
            'school_email' => 'xip@mailinator.com',
            'school_email_otp' => '268982',
            'school_mobile' => '9594635999',
            'school_mobile_otp' => '756534',
            'school_address_line_1' => '183 East New Boulevard',
            'school_area' => 'xBlanditiis quo dolor',
            'school_pincode' => '404040',
            'school_district' => 'Tempore consequatur',
            'school_state' => 'Adipisci excepturi a',
            'incharge_name' => 'KYLIE MCKNIGHT',
            'incharge_email' => 'lytuluwok@mailinator.com',
            'incharge_mobile' => '9594635009',
            'principal_name' => 'VIOLET AGUIRRE',
            'principal_email' => 'kitiqadon@mailinator.com',
            'principal_mobile' => '9594635009',
            'password' => bcrypt('5qPg0L94'), // Make sure to encrypt the password
        ]);
    }
}
