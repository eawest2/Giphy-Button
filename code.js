

//Variable Storage:

    //Array of all buttons on the page
    var buttonArray = ["elves","dwarves","orcs","hobbits","minotaur","drow","merfolk", "humans", "dragonborn", "tieflings"]

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
            var activeButtonClicker = '<button id ="' + activeButton + '" data-button="' + activeButton + '" class = "gif-button">' + activeButton + "</button>";

        $("#button-holder").append(activeButtonClicker)

        
        }
    };

    //Append new search term to buttonArray
    function addButton () {
        var subject = $("#text-input").val().trim().toLowerCase();
        buttonArray.push(subject);
        writeButtons();
    };

    //retrieve gifs and write to HTML
    function setGifs () {
        searchTerm = attribution
        console.log(searchTerm)
        $.ajax({
            url: queryURL,
            method: "GET"
            })
            // After the data comes back from the API
            .then(function(response) {
                // Storing an array of results in the results variable
                var results = response.data;
    
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
    
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");
    
                    // Storing the result item's rating
                    var rating = results[i].rating;
    
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
    
                    // Creating an image tag
                    var personImage = $("<img>");
    
                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr("src", results[i].images.fixed_height.url);
    
                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(personImage);
    
                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gif-display").prepend(gifDiv)}}
                
                
                });

    };

    //on click for giphButton class

    $(".gif-button").on("click", function(){
        var attribution = $(this).attr("data-button")
        setGifs(attribution);
        console.log(attribution)
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