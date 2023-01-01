<?php

session_start();

// connect to redis cache
$redis = new Redis();
$redis->connect('redis');

// create redis key in form: sessionid:key
$redis_key = session_id() . ':key';
// generate one_time key
$new_key = bin2hex(random_bytes(24));

// save key with expiration time of an hour
$redis->set($redis_key, $new_key, 3600);


// send key to requester
header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
print($new_key);