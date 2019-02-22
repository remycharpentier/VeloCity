// On submit form Login

$("#formLogin").on("submit", function(event){ // event permet de ne pas rechercher la page

    event.preventDefault(); // event permet de ne pas rechercher la page
    

    // Afficher données : username et password (serialize)


    serializeFormLogin = $(this).serialize();    
    
    // console.log(serializeFormLogin);

    var urlAPI = "http://localhost/projects/remy/VeloCity/api";

    $.ajax({
        type : "POST",
        url : `${urlAPI}/checkUser.php`,
        data : serializeFormLogin,
        success: function(data){
            console.log(data);
            data = JSON.parse(data);
            console.log(data); // Transformé en JSON

            if (data.username){
                $("#formLogin").hide(); // Cache la map tant qu'on est pas log
                $("#map").show(); // Montre la map une fois log
                $("#burger").show(); // Montre le burger une fois log


                var mapDiv = $("#map"); // Resize la map après la connexion
                var canvasMap = $(".mapboxgl-canvas");

                mapDiv.css("width", "100%");
                canvasMap.css("width", "100%");
                map.resize();
            }
        }
    })

})

// Ajax request qui renvoie vers (checkuser.php) faire echo hello world

