$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#test").text());
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
                            $("#test").text("single pokemon call failed with --" + status);
                        }
                    });
                }

                const generatedNameTags = pokemonImageList.map(pokemon => {
                    const name = pokemon.name;
                    return "<p>"+
                        "<button id='"+ name + "'>" + name + "</button>"+
                        "<img src='" + pokemon.imageUrl + "' alt='pokemon image' id='image-" + name + "' width='50' height='50' >"+
                        "</p>";
                })
                $("#test").html(generatedNameTags);
            } else {
                $("#test").text(status);
            }
        });
    });

});