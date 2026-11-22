<?php

declare(strict_types=1);

$envFile = dirname(__DIR__) . '/.env';

if (!is_file($envFile)) {
    throw new RuntimeException('Database configuration file not found.');
}

$config = parse_ini_file($envFile, false, INI_SCANNER_RAW);

if ($config === false) {
    throw new RuntimeException('Unable to read database configuration.');
}

$required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];

foreach ($required as $key) {
    if (!isset($config[$key]) || $config[$key] === '') {
        throw new RuntimeException("Missing database configuration: {$key}");
    }
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
