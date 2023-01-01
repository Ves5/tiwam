<?php

session_start();

$login = $_POST["login"] ?? "";
$pwhash = $_POST["pwhash"] ?? "";
if ($login != "" && $pwhash != "") {

    $db = new PDO("sqlite:accounts.db");
    $template = "INSERT INTO account (login, pwhash, type)
             VALUES (:login, :pwhash, 0)";
    $query = $db->prepare($template);
    $query->bindValue(":login", $login);
    $query->bindValue(":pwhash", $pwhash);
    $query->execute();

    header("Content-Type: text/plain");
    header("Access-Control-Allow-Origin: *");
    print("Success");
} else {
    header("Content-Type: text/plain");
    header("Access-Control-Allow-Origin: *");
    print("Error");
}