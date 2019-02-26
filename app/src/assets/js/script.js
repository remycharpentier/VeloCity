mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzMzMiLCJhIjoiY2pzYWFpcXNwMDAxbzN5cGZneGxia3U3ZCJ9.sigYT2nlLnC1siycJ3im-Q';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
    center: [4.835659, 45.764043],
    zoom:10,
});

var urlAPI = "http://localhost/projects/remy/VeloCity/api";

var user;

    $.ajax({
        type:"GET",
        dataType: "JSON",
        url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c550df80380ca765b4ddde78c75d8c16fa8fc50d",
            success: function(data){
            console.log(data); // data = infos de l'api jcdécaux

            data.forEach(function(marker){ // Boucle pour créer et positionner les marqueurs
                // Créer l'élement pour le marqueur         
                var el = document.createElement('div'); // Créer une nouvelle variable el dans une nouvelle div dans le HTML
                el.id = 'marker'; // Indique que la nouvelle variable s'apelle marker

                // A FAIRE

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
                    <form onSubmit="formSubmitPopup(event, ${marker.number}, ${marker.available_bike_stands})">
                        <input type="submit" value="RESERVER" id="formReserver">
                    </form>              
                `))
                    .addTo(map); // Ajoute les marqueurs sur la carte
            });
        }
    })

function formSubmitPopup(event, id_station, bikes_available){
    event.preventDefault();
    console.log(id_station);
    console.log(bikes_available);
    console.log(user.id);

    var reservations = {
        id_station:  id_station,
        bikes_available: bikes_available,
        user_id: user.id
    };

    console.log(reservations);

    $.ajax({
        type : "POST",
        url : `${urlAPI}/index.php`,
        data : "test",
        success: function(data){
            console.log(data);
        },
    })
}