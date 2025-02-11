<?php
use DI\Container;
use Config\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (Container $container) {
    $container->set('db', function () {
        return Database::getConnection();
    });

    $container->set('myService', function () {
        return new class {
            public function sayHello() {
                return "test";
            }
        };
    });
};
