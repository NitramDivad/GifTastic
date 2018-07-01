var StarTrek = {
    arrGifTopics: [],

    BuildTheButtons: function() {

        $(".gifButtons").empty();

        this.arrGifTopics.forEach(function(item) {
            var button = $("<button>");
            button.addClass("btn btn-primary btn-topic");
            button.attr("data-name",item);
            button.text(item);
            $(".gifButtons").append(button);
        });
    },

    AddAButton: function(newTopic) {

        this.arrGifTopics.push(newTopic);
        $("#input_StarTrek").val("");

        this.BuildTheButtons();
    },

    CallAJAX: function(topic) {
        var apiURL = "https://api.giphy.com/v1/gifs/search?q=",
            apiKey = "&api_key=d03x0UXViZqHxHo74p52vH3b2iTSF52G&limit=10",
            queryURL = apiURL + topic + apiKey

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                StarTrek.ProcessAJAX(response.data)
            });
    },

    ProcessAJAX: function(topicGifs) {
        var gifDiv,
            gifURL,
            stillURL,
            gifImage,
            gifRating,
            rating;

        topicGifs.forEach(function(item) {

            gifURL = item.images.fixed_height.url;
            stillURL = item.images.fixed_height_still.url;
            gifRating = (item.rating).toUpperCase();

            gifDiv = $("<div>");
            gifDiv.addClass("st_gifDiv");
            gifImage = $("<img class='gifImage'>" + "<br>");
            gifImage.attr("src", stillURL);
            gifImage.attr("alt", item.images.title);
            gifImage.attr("data-still", stillURL);
            gifImage.attr("data-animate", gifURL);
            gifImage.attr("data-state", "still");

            rating = $('<p class="gifRating">').text(gifRating + " Rating");

            gifDiv.prepend(gifImage);
            gifDiv.append(rating);
            $(".gifsGrouping").append(gifDiv);
        });
    },

    PlayGif: function(whichOne) {

        $(whichOne).attr("src", $(whichOne).attr("data-still"));
        $(whichOne).attr("data-state", "still");
    },

    PauseGif: function(whichOne) {

        $(whichOne).attr("src", $(whichOne).attr("data-animate"));
        $(whichOne).attr("data-state", "animate");
    }
};


//***************************************************************/
$(document).ready(function() {
//***************************************************************/

    StarTrek.arrGifTopics = ["Captain Kirk","Captain Picard",
                             "Klingon","Romulan",
                             "Ferengi","Wrath of Khan",
                             "Tribbles","Sulu",
                             "Spock","Uhura"
                            ];
    
    StarTrek.BuildTheButtons();
});


//***************************************************************/
$("#add-topic").bind("click", function(event) {
//***************************************************************/

    event.preventDefault(); 

    strInput = $("#input_StarTrek").val().trim();
    if (strInput != '') 
        StarTrek.AddAButton(strInput);
});

//***************************************************************/
$('#input_StarTrek').keypress(function(event) {
//***************************************************************/   

    if (event.keyCode == '13') {
        event.preventDefault();
    }
 });


// main function for ajax gif grabbing and html placement
//***************************************************************/
$(document).on("click", ".btn-topic", function() {
//***************************************************************/

    console.log("clicked")
    var whichTopic= $(this).attr("data-name");

    $(".gifsGrouping").empty();
    StarTrek.CallAJAX(whichTopic);
});


//***************************************************************/
$(document).on("click" , ".gifImage" , function() {
//***************************************************************/

    var state = $(this).attr("data-state");
    
    if (state === "still")
        StarTrek.PauseGif(this);
    else
        StarTrek.PlayGif(this);
});