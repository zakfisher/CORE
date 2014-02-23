<?php
session_start();

/** Set Environment */
$uri = explode(".", $_SERVER['HTTP_HOST']);
define(ENV, ($uri[0] == 'dev' || $uri[0] == 'build') ? 'development' : 'production');

require_once('epiphany/src/Epi.php');
Epi::setSetting('exceptions', true);
Epi::init('database');
Epi::init('route');
Epi::init('api');
Epi::init('session');
EpiSession::employ(EpiSession::PHP);

/** Connect to Database */
require_once('connect.php');
require_once('helpers.php');

/** Controller **/
require_once('controller/User.php');
