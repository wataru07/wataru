<?php
use Ratchet\Server\IoServer;
use MyApp\Chat;

    require dirname(__DIR__) . '/src/vendor/autoload.php';

    $server = IoServer::factory(
        new Chat(),
        8080
    );

    $server->run();