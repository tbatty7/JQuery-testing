$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
        $.get("https://pokeapi.co/api/v2/pokemon", function(data, status){
            if (status === "success") {
                let pokemon = data.results;
                const generatedNameTags = pokemon.map(pokemon => {
                    return "<p>"+
                        "<button onclick='showImage(pokemon.name)'>" + pokemon.name + "</button>"+
                        "<img src='empty.js' alt='pokemon image' id='" + pokemon.name + "' width='500' height='600' ></p>";
                })
                $("#test").html(generatedNameTags);
            } else {
                $("#test").text(status);
            }
        });
    });
});

function showImage(name) {
    $.get("https://pokeapi.co/api/v2/pokemon/" + name, function (data, status) {
        if (status === "success") {
            alert(JSON.stringify(data));
            const spriteUrl = data.sprites.front_default;
            $("#"+name).attr("src", spriteUrl)
        } else {
            alert("Call failed with: " + status);
        }

    })
}