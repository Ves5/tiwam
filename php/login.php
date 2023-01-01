<?php

session_start();

$login = $_POST['login'] ?? "";
$hash = $_POST['hash'] ?? "";
if ($login != "" && $hash != ""){

    // fetch hashed password from DB
    $db = new PDO("sqlite:accounts.db");
    $template = "SELECT pwhash FROM account
             WHERE login = :login";
    $query = $db->prepare($template);
    $query->bindValue(":login", $login);
    $query->execute();
    $stored_hash = $query->fetch(PDO::FETCH_ASSOC);

    // successful fetch
    if($stored_hash){
        // connect to redis cache
        $redis = new Redis();
        $redis->connect('redis');

        // create redis key in form: sessionid:key
        $redis_key = session_id() . ':key';

        $cached_key = $redis->get($redis_key);

        $keyhashed = hash('sha3-256', $cached_key . $stored_hash['pwhash']);

        // successful login
        if ($hash == $keyhashed){
            header("Content-Type: text/plain");
            header("Access-Control-Allow-Origin: *");
            print("Success");
        }
        // wrong password
        else {
            header("Content-Type: text/plain");
            header("Access-Control-Allow-Origin: *");
            print("Wrong Credentials");
        }
    }
    // unsuccessful fetch
    else {
        header("Content-Type: text/plain");
        header("Access-Control-Allow-Origin: *");
        print("Failed Fetch");
    }

} 
// login or pw were not passed
else {
    header("Content-Type: text/plain");
    header("Access-Control-Allow-Origin: *");
    print("Failed request");
}