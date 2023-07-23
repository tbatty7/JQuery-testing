$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
        $.get("https://pokeapi.co/api/v2/pokemon", function(data, status){
            if (status === "success") {
                let names = data.results.map(pokemon => pokemon.name);
                $("#test").text(names.join(' - '));
            } else {
                $("#test").text(status);
            }

        });
    });
});