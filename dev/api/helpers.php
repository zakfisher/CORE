<?php
class Status {
    const OK           = 200;
    const Unauthorized = 401;
    const Error        = 500;
}

function respond($data) {
    header("Content-Type: application/json");
    print json_encode($data);
    exit;
}

function getParams() {
    return json_decode(file_get_contents('php://input'));
}

function loginCheck() {
    if (!getSession()->get('user')) {
        http_response_code(Status::Unauthorized);
        respond('You do not have permission to access this data.');
    }
}

function error($msg) {
    http_response_code(Status::Error);
    respond($msg);
}