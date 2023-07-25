$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#pokedex").text());
    });
    $("#btn2").click(function(){
        $.get("https://pokeapi.co/api/v2/pokemon", async function(data, status){
            if (status === "success") {
                const pokemonList = data.results;
                let pokemonImageList = [];
                for ( pokemon of pokemonList) {
                    const name = pokemon.name;
                    const pokemonReference = {name};
                    await $.get(`https://pokeapi.co/api/v2/pokemon/${name}`, function (data, status) {
                        if (status === "success") {
                            const imageUrl = data.sprites.front_default;
                            console.log(imageUrl);
                            pokemonReference.imageUrl = imageUrl;
                            pokemonImageList.push(pokemonReference);
                        } else {
                            $("#pokedex").text("single pokemon call failed with --" + status);
                        }
                    });
                }

                const generatedNameTags = pokemonImageList.map(pokemon => {
                    const name = pokemon.name;
                    return "<div style='width: 300px; display: inline-block;'>"+
                        "<button style='font-size: xx-large' id='"+ name + "'>" + name + "</button>"+
                        "<img src='" + pokemon.imageUrl + "' alt='pokemon image' id='image-" + name + "' width='200' height='200' >"+
                        "</div>";
                })
                $("#pokedex").html(generatedNameTags);
            } else {
                $("#pokedex").text(status);
            }
        });
    });

});