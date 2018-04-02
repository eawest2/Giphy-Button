

//Variable Storage:

    //Array of all buttons on the page
    var buttonArray = ["elves","dwarves","orcs","hobbits","minotaur","drow","mermaid", "humans", "dragonborn", "undead"]

    //Empty variable for URL composition
    var searchTerm = 0;

    // Empty variable to store button clicks
    var buttonClick = 0;

//basic functions

    //write button from array to button-holder div
    function writeButtons(){
        $("#button-holder").text(" ")
        for (var i = 0; i < buttonArray.length; i++){
            var activeButton = buttonArray[i];
            var activeButtonClicker = "<button " + ' data-button="' + activeButton + '" class = "gif-button btn btn-secondary m-1">' + activeButton + "</button> ";

        $("#button-holder").append(activeButtonClicker)

        
        }
    };

    //Append new search term to buttonArray
    function addButton() {
        var subject = $("#text-input").val().trim().toLowerCase();
        buttonArray.push(subject);
        writeButtons();
        clearText();
    };

    //clear out text from the new button search
    function clearText() {
        document.getElementById("text-input").value = "";
    };

    //on click listener for giphButton class
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
                //Actual process
                .then(function(response) {

                // storing the AJAX as a variable for less typing.
                var results = response.data;
        
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    var imgUrlStill = results[i].images.fixed_height_still.url;
                    var imgUrlMove = results[i].images.fixed_height.url;
                    var buildRating = results[i].rating;
                    var buildSource = results[i].source;
                    var rating = '<p class = "text-success"> Gif Rating: ' + buildRating + '</p>';
                    var construct = '<p><img class ="click-gif" data-status= "still" data-still= "'+imgUrlStill + '" ' + 'data-move = "' + imgUrlMove + '" src= "'+ imgUrlStill + '" ></p>';
                    var source = '<a href = "'+ buildSource + '" target = "_blank" class = "text-success">' +buildSource + "<hr>"
                    
                    $("#gif-display").append(construct);
                    $("#gif-display").append(rating);
                    $("#gif-display").append(source);
                    


        
                    
                }
                });
    
});

    //Pause and unpause images listener
    $(document).on("click", ".click-gif", function() {
        //select element and check status
        var state = $(this).attr("data-status");
        // if the status is still, switch it to move
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-move"));
            $(this).attr("data-status", "move");
        } 
        // if it's anything else, set the image to still.
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still");
        }
    });

    //on click listener for submit button

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