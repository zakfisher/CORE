<?php
require_once('config.php');

// User Actions
getRoute()->post('/login',            array('User',    'login'),      EpiApi::internal);
getRoute()->get('/logout',            array('User',    'logout'),     EpiApi::internal);
getRoute()->get('/user',              array('User',    'getCurrent'), EpiApi::internal);

// Users
getRoute()->get('/users',             array('User',    'getAll'),     EpiApi::internal);
getRoute()->get('/users/(\d+)',       array('User',    'getById'),    EpiApi::internal);
getRoute()->post('/users',            array('User',    'add'),        EpiApi::internal);
getRoute()->put('/users/(\d+)',       array('User',    'update'),     EpiApi::internal);
getRoute()->delete('/users/(\d+)',    array('User',    'delete'),     EpiApi::internal);

// Init
getRoute()->run();