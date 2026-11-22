<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, [
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
}

// Rate limiting: maximum 5 POST requests per IP in 15 minutes.
$maxRequests = 5;
$windowSeconds = 900;

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ipHash = hash('sha256', $clientIp);

$storageDirectory = dirname(__DIR__, 2) . '/storage';
$rateLimitFile = $storageDirectory . '/' . $ipHash . '.json';

$now = time();

$rateLimitHandle = fopen($rateLimitFile, 'c+');

if ($rateLimitHandle === false) {
    respond(503, [
        'success' => false,
        'message' => 'Service temporarily unavailable. Please try again later.',
    ]);
}

if (!flock($rateLimitHandle, LOCK_EX)) {
    fclose($rateLimitHandle);

    respond(503, [
        'success' => false,
        'message' => 'Service temporarily unavailable. Please try again later.',
    ]);
}

$storedData = stream_get_contents($rateLimitHandle);
$timestamps = json_decode($storedData ?: '[]', true);

if (!is_array($timestamps)) {
    $timestamps = [];
}

// Remove timestamps older than 15 minutes.
$timestamps = array_values(array_filter(
    $timestamps,
    static fn ($timestamp): bool =>
        is_int($timestamp) && $timestamp > $now - $windowSeconds
));

if (count($timestamps) >= $maxRequests) {
    $retryAfter = max(
        1,
        ($timestamps[0] + $windowSeconds) - $now
    );

    header('Retry-After: ' . $retryAfter);

    respond(429, [
        'success' => false,
        'message' => 'Too many requests. Please try again later.',
    ]);
}

// Record this request.
$timestamps[] = $now;

rewind($rateLimitHandle);
ftruncate($rateLimitHandle, 0);

$written = fwrite(
    $rateLimitHandle,
    json_encode($timestamps)
);

if ($written === false || !fflush($rateLimitHandle)) {
    fclose($rateLimitHandle);

    respond(503, [
        'success' => false,
        'message' => 'Service temporarily unavailable. Please try again later.',
    ]);
}

chmod($rateLimitFile, 0600);

flock($rateLimitHandle, LOCK_UN);
fclose($rateLimitHandle);


$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== 0) {
    respond(415, [
        'success' => false,
        'message' => 'Content-Type must be application/json.',
    ]);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    respond(400, [
        'success' => false,
        'message' => 'Invalid JSON request.',
    ]);
}
// Honeypot spam protection
$website = $data['website'] ?? '';

if (!is_string($website) || trim($website) !== '') {
    // Return a generic success response without saving the message.
    respond(200, [
        'success' => true,
        'message' => 'Your message has been sent successfully.',
    ]);
}
$fields = ['name', 'email', 'subject', 'message'];

foreach ($fields as $field) {
    if (!isset($data[$field]) || !is_string($data[$field])) {
        respond(422, [
            'success' => false,
            'message' => 'All fields must contain valid text.',
        ]);
    }
}

$name = trim($data['name']);
$email = trim($data['email']);
$subject = trim($data['subject']);
$message = trim($data['message']);
if (
    $name === '' ||
    $email === '' ||
    $subject === '' ||
    $message === ''
) {
    respond(422, [
        'success' => false,
        'message' => 'All fields are required.',
    ]);
}

if (
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($subject) > 150 ||
    strlen($message) > 5000
) {
    respond(422, [
        'success' => false,
        'message' => 'One or more fields exceed the allowed length.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, [
        'success' => false,
        'message' => 'Please provide a valid email address.',
    ]);
}

try {
    $pdo = require dirname(__DIR__, 2) . '/config/database.php';

    $stmt = $pdo->prepare(
        'INSERT INTO contact_messages
        (name, email, subject, message)
        VALUES
        (:name, :email, :subject, :message)'
    );

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject,
        ':message' => $message,
    ]);

    respond(201, [
        'success' => true,
        'message' => 'Your message has been sent successfully.',
    ]);
} catch (Throwable $exception) {
    error_log('Contact API error: ' . $exception->getMessage());

    respond(500, [
        'success' => false,
        'message' => 'Unable to process your message right now. Please try again later.',
    ]);
}
