<?php

require "database-connect.php";

$q = $db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
$q->bindParam(":username", $_POST["username"]);
$q->bindParam(":password", $_POST["password"]);
$q->execute();

$data = $q->fetch(PDO::FETCH_ASSOC);

?>