<?php

declare(strict_types=1);

// This script must only run from the command line.
if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Access denied.');
}

$storageDirectory = __DIR__ . '/storage';

// Remove files that have not been modified for 24 hours.
$expirationSeconds = 86400;
$cutoffTime = time() - $expirationSeconds;

$files = glob($storageDirectory . '/*.json');

if ($files === false) {
    exit("Unable to scan rate-limit storage.\n");
}

$deletedCount = 0;

foreach ($files as $file) {
    $filename = basename($file);

    // Only process files with a SHA-256 hash filename.
    if (!preg_match('/^[a-f0-9]{64}\.json$/', $filename)) {
        continue;
    }

    $modifiedTime = filemtime($file);

    if ($modifiedTime !== false && $modifiedTime < $cutoffTime) {
        if (unlink($file)) {
            $deletedCount++;
        }
    }
}

echo "Rate-limit cleanup completed.\n";
echo "Deleted files: {$deletedCount}\n";
?>