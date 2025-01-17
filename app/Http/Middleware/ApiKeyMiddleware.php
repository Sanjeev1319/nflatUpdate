<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next)
	{
		// The key you expect in the header
		$expectedKey = 'sanjeev13191001';

		// Check if the 'key_auth' header is present and matches the expected key
		if ($request->header('key_auth') !== $expectedKey) {
			return response()->json(['message' => 'Unauthorized'], 401);
		}

		return $next($request);
	}
}

