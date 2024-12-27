<?php

namespace App\Helpers;

class PasswordHelper
{
	/**
	 * Encrypt the given value using the custom key.
	 *
	 * @param string $value
	 * @return string
	 */
	public static function encrypt(string $value): string
	{
		$key = env('STUDENT_PASSWORD_KEY');
		return openssl_encrypt($value, 'AES-256-CBC', $key, 0, substr($key, 0, 16));
	}

	/**
	 * Decrypt the given value using the custom key.
	 *
	 * @param string $encryptedValue
	 * @return string|null
	 */
	public static function decrypt(string $encryptedValue): ?string
	{
		$key = env('STUDENT_PASSWORD_KEY');
		return openssl_decrypt($encryptedValue, 'AES-256-CBC', $key, 0, substr($key, 0, 16));
	}
}


