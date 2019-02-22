<?php
    $page = 'login';
    require('config.php');
    $message = '';
    $emailErr = "";
    $nameErr = "";
    $surnameErr = "";
    $usernameErr = "";
    if( isset($_POST['submit-signin'])){

        // Récup des valeurs des champs du formulaire

        $pseudo = $_POST['signin-pseudo'];
        $firstname = $_POST['signin-firstname'];
        $familyname = $_POST['signin-familyname'];
        $avatar = $_POST['signin-avatar'];
        $email = $_POST['signin-email'];
        $password = $_POST['signin-password'];
        $password2 = $_POST['signin-password2'];
        if (!preg_match("/^[a-zA-Z ]*$/",$pseudo)) {
            $pseudoErr = "Seulement les lettres et les espaces sont authorisés"; 
        }
        if (!preg_match("/^[a-zA-Z ]*$/",$firstname)) {
            $firstnameErr = "Seulement les lettres et les espaces sont authorisés"; 
        }
        if (!preg_match("/^[a-zA-Z ]*$/",$familyname)) {
            $familynameErr = "Seulement les lettres et les espaces sont authorisés"; 
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format"; 
        }

        if($pseudoErr == "" && $firstnameErr == "" && $familynameErr == "" && $emailErr == ""){
            $pseudo_verify_request = "SELECT * FROM users WHERE users_pseudo = '$pseudo' LIMIT 1";
            if( $resultat = $mysqli->query($pseudo_verify_request) ){
                $row_cnt = $resultat->num_rows;
                if($row_cnt !== 0){
                    $message = "Votre pseudo est déjà utilisé.";
                }else{
                    if( $password == $password2 ){
                        $password = password_hash($password, PASSWORD_DEFAULT);
                        $new_user_request = "INSERT INTO users (
                                users_pseudo,
                                users_firstname,
                                users_familyname,
                                users_avatar,
                                users_email,
                                users_password
                            ) VALUES (
                                '$pseudo',
                                '$firstname',
                                '$familyname',
                                '$avatar',
                                'users/upload/profile.jpg'
                                '$email',
                                '$password',
                            )";
                        if($mysqli->query($new_user_request) === TRUE ){ 
                           $message = 'Votre compte a bien été créer'; 
                        }else{
                            echo $mysqli->error;
                        }
                    }else{
                        $message = "Les mots de passe que vous avez entré ne sont pas identiques.";
                    }
                }
            }
       }

       // JE ME SUIS ARRETE ICI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // vérification username non attribué

         } else if( isset($_POST['submit-login']) ){

        // Récupérer les infos du formulaire dans des variables

        $email = $_POST['login-users_email'];
        $password = $_POST['login-users_password'];

        // Vérifier la concordance entre le formulaire et la BDD

        $login_request = "SELECT * FROM users WHERE users_email = '$email' LIMIT 1";

        // Vérification des résultats
        
        if( $resultat = $mysqli->query($login_request) ){       // Si il y a un username qui correspond entre le formulaire et la BDD
            while( $res = $resultat->fetch_object() ){
               $res_id = $res->id;
               $res_email = $res->users_email;
               $res_password = $res->users_password;  
               $res_email = $res->users_email;  
               $res_type = $res->users_type;  
               if( password_verify($password, $res_password) === TRUE ){
                    $_SESSION['activity']['id'] = $res_id; 
                    $_SESSION['activity']['username'] = $res_username;
                    $_SESSION['activity']['type'] = $res_type;
                    $_SESSION['activity']['email'] = $res_email;
                    header('Location: index.php');
                    die();
               }else{

                    $message = 'Erreur dans le mot de passe.';
               }
            }
        }
    }else{
        $message = "Bienvenue, merci de vous log.";
        if(isset($_GET['logout'])){
            $_SESSION['activity'] = Array();
            session_destroy();
            $message = "Vous avez bien été déconnecté.";
        }
    }
?>