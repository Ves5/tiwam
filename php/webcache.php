<?php

// https://catfact.ninja/fact

session_start();

// cacheng g 
$redis = new Redis();
$redis->connect('redis');

$key = 'catfact:key';
$from = 'cache';

$catfact = json_decode($redis->get($key));
$time = $redis->ttl($key);
if( !$catfact ){
    // cache expired
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, 'https://catfact.ninja/fact');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $catfact = curl_exec($curl);
    $catfact = json_decode($catfact);
    curl_close($curl);

    $redis->set($key, json_encode($catfact), 30);
    $time = $redis->ttl($key);
    $from = 'api';
}

$response = array('from' => $from, 'ttl' => $time, 'content' => $catfact);
$response = json_encode($response);

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
print($response);