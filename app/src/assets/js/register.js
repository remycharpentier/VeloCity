$("#formRegister").on("submit", function(event){

    event.preventDefault();// event permet de ne pas rechercher la page

    // Récupérer pseudo du formulaire
    username = $("input[name=username]").val();
    
    // Récupérer password du formulaire
    password = $("input[name=password]").val();
 
    serializeFormRegister = $(this).serialize(); 

    console.log(serializeFormRegister);

    var urlAPI = "http://localhost/projects/remy/VeloCity/api";

    $.ajax({
        type : "POST",
        url : `${urlAPI}/register.php`,
        data : serializeFormRegister,
        success: function(data){
            console.log(data);
        }
    })
})
    


 
  
