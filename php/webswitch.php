<?php

session_start();

$sites = ['https://www.gdansk.pl/', 'https://www.sopot.pl/', 'https://www.gdynia.pl/'];
$redis = new Redis();
$redis->connect('redis');

$key = "webswitchodds:key";

$odds = $redis->get($key);
if ($odds != false) {
    // key found
    $odds = json_decode($odds);
} else {
    // odds not yet in redis
    $odds = [100, 100, 100]; // hardcoded 3 odds due to hardcoded 3 sites
}

$total = array_sum($odds);
$rand = random_int(0, $total);
$choice = 0;

// distinguish site by odds
for ($i = 0, $j = $odds[$i]; $i < count($odds); $i++, $j += $odds[$i]){
    if ($rand <= $j){
        $choice = $i;
        break;
    }
}

// form response
$response = json_encode(array('site' => $sites[$choice], 'odds' => $odds[$choice] * 100.0 / $total ));

// adjust odds
for ($i = 0; $i < count($odds); $i++){
    if ($i == $choice){
        $odds[$i] -= count($odds) - 1;
    } else {
        $odds[$i] += 1;
    }
}

// save new odds
$redis->set($key, json_encode($odds));

// respond
header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
print($response);