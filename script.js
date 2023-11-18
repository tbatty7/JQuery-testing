$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#pokedex").text());
    });

    let pokedexUrl = "https://pokeapi.co/api/v2/pokemon";

    $("#btn2").click(function(){
        $.get(pokedexUrl, async function(data, status){
            if (status === "success") {
                const pokemonList = data.results;
                pokedexUrl = data.next;
                let pokemonImageList = [];
                for ( pokemon of pokemonList) {
                    const name = pokemon.name;
                    const pokemonReference = {name};
                    await $.get(pokemon.url, function (data, status) {
                        if (status === "success") {
                            const generation5Sprites = data.sprites.versions['generation-v']['black-white'];
                            pokemonReference.imageUrl = generation5Sprites.animated.front_default;
                            pokemonImageList.push(pokemonReference);
                        } else {
                            $("#pokedex").text("single pokemon call failed with --" + status);
                        }
                    });
                }

                const generatedNameTags = pokemonImageList.map(pokemon => {
                    const name = pokemon.name;
                    const pokemonContainer = document.createElement('div');
                    pokemonContainer.innerHTML = "<button style='font-size: xx-large' id='"+ name + "'>" + name + "</button>"+
                        "<img src='" + pokemon.imageUrl + "' alt='pokemon image' id='image-" + name + "' width='200' height='200' >";
                    pokemonContainer.setAttribute('style', 'width: 200px; display: inline-block; margin: 5px; background-color: cornflowerblue; border-radius: 30px;')
                    return pokemonContainer
                })
                $("#pokedex").html(generatedNameTags);
            } else {
                $("#pokedex").text(status);
            }
        });
    });

});