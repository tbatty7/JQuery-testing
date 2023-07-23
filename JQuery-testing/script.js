$(document).ready(function(){
    $("#btn1").click(function(){
        alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
        $.get("https://pokeapi.co/api/v2/pokemon/magnemite", function(data, status){
            alert(status + " - " + JSON.stringify(data));
        });
    });
});