<?php
// if first part raises exception write ""
$filter = $_GET["filter"] ?? "";

$db = new PDO("sqlite:imiona.db");
$sql = "SELECT pozycja, imie, plec
        FROM imiona 
        WHERE imie LIKE :wzor 
        ORDER BY pozycja";
$query = $db->prepare($sql);
$filter .= '%';
$query->bindValue(":wzor", $filter);
$query->execute();
$res = $query->fetchAll(PDO::FETCH_ASSOC);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
print(json_encode($res));