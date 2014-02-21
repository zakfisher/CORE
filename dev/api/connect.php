<?php

// Production
if (ENV == 'production')
{
    $host    = '';
    $db_name = '';
    $u       = '';
    $p       = '';
}

// Development
else
{
    $host    = '';
    $db_name = '';
    $u       = '';
    $p       = '';
}

EpiDatabase::employ('mysql', $db_name, $host, $u, $p);