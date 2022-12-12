<?php

session_start();

// connect to redis cache
$redis = new Redis();
$redis->connect('redis');

// create redis key in form: sessionid:key
$redis_key = session_id() . ':key';

$cached_key = $redis->get($redis_key);

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
print($cached_key);