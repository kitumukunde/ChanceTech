<?php

declare(strict_types=1);

// Load local .env configuration when available.
$envFile = dirname(__DIR__) . '/.env';
$config = [];

if (is_file($envFile)) {
    $parsedConfig = parse_ini_file($envFile, false, INI_SCANNER_RAW);

    if ($parsedConfig === false) {
        throw new RuntimeException('Unable to read database configuration.');
    }

    $config = $parsedConfig;
}

// Prefer hosting provider environment variables.
// Fall back to the local .env file.
$required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];

foreach ($required as $key) {
    $value = getenv($key);

    if ($value === false || $value === '') {
        $value = $config[$key] ?? null;
    }

    if (!is_string($value) || $value === '') {
        throw new RuntimeException("Missing database configuration: {$key}");
    }

    $config[$key] = $value;
}

$dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=utf8mb4',
    $config['DB_HOST'],
    $config['DB_NAME']
);

$pdo = new PDO(
    $dsn,
    $config['DB_USER'],
    $config['DB_PASSWORD'],
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
);

return $pdo;
