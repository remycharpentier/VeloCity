<?php

header('Access-Control-Allow-Origin: *');

// Se connecter à la base de donnée et try pour vérifier
try {
    $db = new PDO('mysql:host=localhost;dbname=velocity', 'root', '');
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}

?>