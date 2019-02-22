<?php

require "database-connect.php";

// Aller chercher l'utilisateur
// fetch user in database with SQL request
$q = $db->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
$q->bindParam(":username", $_POST["username"]);
$q->bindParam(":password", $_POST["password"]);
$q->execute();

$data = $q->fetch(PDO::FETCH_ASSOC);

if( $data ){
    echo json_encode($data);
}else{
    echo json_encode( [] );
}

?>