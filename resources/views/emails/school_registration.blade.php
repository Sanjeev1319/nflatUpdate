<!DOCTYPE html>
<html>
<head>
    <title>Successful School Registration</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>Dear {{ $school_name }},</p>
    <p>Your school has been registered successfully. Use the following credentials to log in:</p>
    <p><strong>Email:</strong> {{ $school_email }}</p>
    <p><strong>School User ID/Login ID:</strong> {{ $school_uuid }}</p>
    <p><strong>Password:</strong> {{ $password }}</p>
</body>
</html>
