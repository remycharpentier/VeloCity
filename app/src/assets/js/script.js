$(document).ready(function(){
    $.ajax({
        type:"get",
        dataType: "JSON",
        url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c550df80380ca765b4ddde78c75d8c16fa8fc50d",
            success: function(data){
            // console.log(data); // data = infos de l'api jcdécaux
            data.forEach(function(marker){ // Boucle pour créer et positionner les marqueurs
                // Créer l'élement pour le marqueur         
                var el = document.createElement('div'); // Créer une nouvelle variable el dans une nouvelle div dans le HTML
                el.id = 'marker'; // Indique que la nouvelle variable s'apelle marker
                // console.log(marker); // Vérification dans la console qu'on récupère tout les ID

                // Ajouter les marqueurs pour chaque position à la Map
                new mapboxgl.Marker(marker) // Création de nouveaux marqueurs
                    .setLngLat(marker.position) // Va chercher la position Longitute et Latitude dans Marker
                    // Ajouter un Pop Up
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`
                    <h2>${marker.address}</h2>
                    <p>${marker.number}</p>
                    <strong>${marker.available_bike_stands}/${marker.bike_stands}</strong>
                    <p>${marker.status}</p>
                    <form onSubmit="formSubmitPopup(event)">
                        <input type="submit" value="RESERVER" id="submit">
                    </form>              
                `))
                    .addTo(map); // Ajoute les marqueurs sur la carte
            })
        },
        error: function(data){
            console.error(); // Affiche les erreurs
        }
    })
})

// Afficher Hello World du PHP dans la console avec AJAX

function formSubmitOnPopup(event){
    event.preventDefault();
    console.log("test");
}

// Requete AJAX interroge API sur le serveur

var urlAPI = "http://localhost/projects/remy/VeloCity/api";

$.ajax({
        type : "POST",
        url : `${urlAPI}/index.php`,
        data : "test",
        success: function(data){
            // console.log(data);
        }
    })