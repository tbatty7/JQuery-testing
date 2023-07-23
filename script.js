$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
        $.get("https://pokeapi.co/api/v2/pokemon", function(data, status){
            if (status === "success") {
                const pokemon = data.results;
                const generatedNameTags = pokemon.map(pokemon => {
                    const name = pokemon.name;
                    // $("#"+name).click(function(){
                    //     $.get("https://pokeapi.co/api/v2/pokemon/"+ name, function(data, status){
                    //         console.log('inner click called');
                    //         if (status === "success") {
                    //             alert(JSON.stringify(data));
                    //             const spriteUrl = data.sprites.front_default;
                    //             $("#image-"+name).attr("src", spriteUrl)
                    //         } else {
                    //             alert("Call failed with: " + status);
                    //         }
                    //     });
                    // });
                    return "<p>"+
                        "<button id='"+ name + "'>" + name + "</button>"+
                        "<img src='empty.png' alt='pokemon image' id='image-" + name + "' width='50' height='50' >"+
                        "</p>";
                })
                $("#test").html(generatedNameTags);
            } else {
                $("#test").text(status);
            }
        });
    });

});