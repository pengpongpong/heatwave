<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class Helper
{
    public static function awsPath(string $path = null)
    {
        $aws_path = 'https://' . config('app.aws_bucket') . '.s3.' . config('app.aws_region') . '.amazonaws.com/' . $path;
        return $aws_path;
    }

    public static function updateStorage(array &$validated, string $key, string $oldUrl, string $storagePath)
    {
        if (isset($validated[$key])) {
            Storage::delete($oldUrl);

            $path = Storage::put($storagePath, $validated[$key]);
            $validated[$key] = $path;
        } else {
            $validated[$key] = $oldUrl;
        }
    }
}
