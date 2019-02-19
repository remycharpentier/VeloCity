$(document).ready(function(){
    $.ajax({
        type:"get",
        dataType: "JSON",
        url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c550df80380ca765b4ddde78c75d8c16fa8fc50d",
    //     success: function(data){
    //         console.log(data);
    //     },
    //     error: function(data){
    //         console.log("error");
    //     }
    // })
            success: function(data){
            console.log(data); // data = infos de l'api jcdécaux
            data.forEach(function(marker){ // Boucle pour créer et positionner les marqueurs
                // Créer l'élement pour le marqueur         
                var el = document.createElement('div'); // Créer une nouvelle variable el dans une nouvelle div dans le HTML
                el.id = 'marker'; // Indique que la nouvelle variable s'apelle marker
                console.log(marker); // Vérification dans la console qu'on récupère tout les ID

                // Ajouter les marqueurs pour chaque position à la Map
                new mapboxgl.Marker(marker) // Création de nouveaux marqueurs
                    .setLngLat(marker.position) // Va chercher la position Longitute et Latitude dans Marker
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // Ajouter les POP UP
                    .setHTML('<h3>' + marker.name + '</h3><p>' + marker.address + '</p>')) // Affiche le titre et la description dans le POP UP
                    .addTo(map); // Ajoute les marqueurs sur la carte

                // Ajouter un Pop Up

            })
        },
        error: function(data){
            console.error(); // Affiche les erreurs
        }
    })
})
