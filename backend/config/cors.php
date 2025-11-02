<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines which domains are allowed to access your
    | application's resources from a different domain that is not your own.
    |
    | See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*', 'X-Requested-With', 'Content-Type', 'X-CSRF-TOKEN', 'Authorization'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
