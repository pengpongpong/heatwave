<?php

namespace App\Helpers;

class Helper
{
    public static function awsPath($path = null)
    {
        $aws_path = 'https://' . config('app.aws_bucket') . '.s3.' . config('app.aws_region') . '.amazonaws.com/' . $path;
        return $aws_path;
    }
}
