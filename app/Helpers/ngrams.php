<?php

if (!function_exists('getSlug')) {
    function getSlug(string $str): string
    {
        $str = mb_strtolower($str);

        return strtr($str, config('ngrams'));
    }
}
