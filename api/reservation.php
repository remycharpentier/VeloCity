<?php

require "database-connect.php";

// echo $reservations

// Ajouter la station et les vélos utilisables dans la db

$q = $db->prepare("INSERT INTO bikes (id_stations, bikes_available) VALUES :id_stations, :bikes_available");

$q->execute();

$data = $q->fetch(PDO::FETCH_ASSOC);



// Décrémenter un vélo
$q = $db->prepare("UPDATE bikes SET bike_available=bike_available-1");

$q->execute();

$data = $q->fetch(PDO::FETCH_ASSOC);

?>