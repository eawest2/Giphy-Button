

//Variable Storage:

    //Array of all buttons on the page
    var buttonArray = ["elves","dwarves","orcs","hobbits","minotaur","drow","merfolk", "humans", "dragonborn", "tiefling"]

    //Empty variable for URL composition

    var searchTerm = 0;

    // Query URL composition
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+searchTerm;

    // Empty variable to store button clicks

    var buttonClick = 0;

//basic functions

    //write button from array to button-holder div
    function writeButtons(){
        $("#button-holder").text(" ")
        for (var i = 0; i < buttonArray.length; i++){
            var activeButton = buttonArray[i];
            var activeButtonClicker = "<button " + ' data-button="' + activeButton + '" class = "gif-button">' + activeButton + "</button> ";

        $("#button-holder").append(activeButtonClicker)

        
        }
    };

    //Append new search term to buttonArray
    function addButton () {
        var subject = $("#text-input").val().trim().toLowerCase();
        buttonArray.push(subject);
        writeButtons();
    };

//on click for giphButton class
$(document).on("click", ".gif-button", function() {
    //retrieve gifs and write to HTML
            // Grabbing and storing the data-button property value from the button
        var atribution = $(this).attr("data-button");
        
            // Constructing a queryURL using the button name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                atribution + "&api_key=dc6zaTOxFJmzC&limit=10";
        
            // Performing an AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After data comes back from the request
                .then(function(response) {

                // storing the data from the AJAX request in the results variable
                var results = response.data;
                $("#gif-display").text(" ");
        
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    var imgUrlStill = results[i].images.fixed_height_still.url;
                    var imgUrlMove = results[i].images.fixed_height.url;
                    var construct = '<p><img class ="click-gif" data-status= "still" data-still= "'+imgUrlStill + '" ' + 'data-move = "' + imgUrlMove + '" src= "'+ imgUrlStill + '" ></p>';
                    $("#gif-display").append(construct);
        
                    
                }
                });
    
});

// Pause and unpause gifs

$(document).on("click", ".click-gif", function() {
    //select element
    var state = $(this).attr("data-status");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-move"));
        $(this).attr("data-status", "move");
    } 
    // Else set src to data-still 
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-status", "still");
    }
    });




    //on click for seatch button

    $("#submit-button").on("click", function(){
        var subjectLine = $("#text-input").val().trim().toLowerCase();
        //check redundancy
        var checkRedundant = false;
            for (var i = 0; i < buttonArray.length; i++) {
                if (subjectLine == buttonArray[i]){
                    checkRedundant = true;
                };
            }
        //add non-redundant and non-empty buttons
        if (checkRedundant !== true && subjectLine !== ""){ 
        addButton()
        }
        else {
        alert("Try a different search")
        };
    }); 

//Initialize
writeButtons()