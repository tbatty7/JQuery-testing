$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#pokedex").text());
    });
});

let pokedexUrl = "https://pokeapi.co/api/v2/pokemon";

function getPokemon() {
    $.get(pokedexUrl, async function (data, status) {
        if (status === "success") {
            pokedexUrl = getUrlForNextTwentyPokemon(data);
            await displayPokemonList(data);
        } else {
            $("#pokedex").text(status);
        }
    });
}

function getUrlForNextTwentyPokemon(data) {
    return data.next;
}

function extractImageUrl(data) {
    const generation5Sprites = data.sprites.versions['generation-v']['black-white'];
    return generation5Sprites.animated.front_default;
}

async function retrievePokemonImages(pokemonList) {
    let pokemonImageList = [];
    for (pokemon of pokemonList) {
        const pokemonReference = {name: pokemon.name};
        await $.get(pokemon.url, function (data, status) {
            if (status === "success") {
                pokemonReference.imageUrl = extractImageUrl(data);
                pokemonImageList.push(pokemonReference);
            } else {
                $("#pokedex").text("single pokemon call failed with --" + status);
            }
        });
    }
    return pokemonImageList;
}

function buildHtmlForPokemonFrom(pokemonImageList) {
    return pokemonImageList.map(pokemon => {
        const name = pokemon.name;
        const pokemonContainer = document.createElement('div');
        const pokemonImage = createPokemonImage(pokemon);
        const pokemonButton = createPokemonButton(name, pokemonImage);
        pokemonContainer.appendChild(pokemonButton);
        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.setAttribute('style', 'width: 200px; display: inline-block; ' +
            'margin: 5px; background-color: cornflowerblue; border-radius: 30px;');
        return pokemonContainer
    });
}

async function displayPokemonList(data) {
    const pokemonImageList = await retrievePokemonImages(data.results);
    const generatedNameTags = buildHtmlForPokemonFrom(pokemonImageList);
    $("#pokedex").html(generatedNameTags);
}
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