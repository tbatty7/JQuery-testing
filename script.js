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
                    const pokemonImage = createPokemonImage(pokemon);
                    const pokemonButton = createPokemonButton(name, pokemonImage);
                    pokemonContainer.appendChild(pokemonButton);
                    pokemonContainer.appendChild(pokemonImage);
                    pokemonContainer.setAttribute('style', 'width: 200px; display: inline-block; '+
                        'margin: 5px; background-color: cornflowerblue; border-radius: 30px;');
                    return pokemonContainer
                });
                $("#pokedex").html(generatedNameTags);
            } else {
                $("#pokedex").text(status);
            }
        });
    });

});

function createPokemonButton(name, pokemonImage) {
    const pokemonButton = document.createElement("button");
    pokemonButton.setAttribute('style', 'font-size: xx-large');
    pokemonButton.setAttribute('alt', name);
    pokemonButton.innerHTML = name;
    pokemonButton.onclick = () => {
        let pokemonOne = document.getElementById('pokemonOne');
        pokemonOne.appendChild(pokemonImage)
    };
    return pokemonButton;
}

function createPokemonImage(pokemon) {
    const pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', pokemon.imageUrl);
    pokemonImage.setAttribute('alt', 'pokemon image');
    pokemonImage.setAttribute('width', '200');
    pokemonImage.setAttribute('height', '200');
    return pokemonImage;
}