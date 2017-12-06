// startup variables

var giphyKey = "j6KOzFKoAK2TPWLS41yFQyfbevX6iUMW";
var movies = [
    "The Shining",
    "Star Wars",
    "Little Shop of Horrors",
    "Planet of the Apes",
    "Killer Klowns from Outer Space",
];
var movie = "";
var results = [];


// make those buttons!
function renderButtons() {
    $('#movie-buttons').empty();
    $.each(movies, function(index, value) {
        var a = $("<button>");
        a.addClass('btn btn-info movie-button');
        a.attr("data-movie", value);
        a.text(value);
        $('#movie-buttons').append(a);
    })
}
// do it at page load
renderButtons();

// get those pictures!
function displayGifs() {
    var movie = $(this).data("movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=" + movie + "&limit=10&offset=0&rating=R&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        $('.gallery-image').off('click');
        $('#gallery').empty();

        // display pictures loop
        $.each(results, function(index, value) {
            var movieImg = $('<img>');
            movieImg.attr({
                'data-still': results[index].images.fixed_height_still.url,
                'data-animate': results[index].images.fixed_height.url,
                'data-state': 'still',
                'alt': results[index].title,
                'id': index,
                'class': 'gallery-image',
                'src': results[index].images.fixed_height_still.url
            });
            $('#gallery').append(movieImg);
            var movieRating = $('<p>');
            movieRating.text('Rated ' + results[index].rating);
            $('#gallery').append(movieRating);
        })

        // animation time!
        $('.gallery-image').on('click', function() {
            var state = $(this).attr("data-state");
            if (state === 'still') {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    })

} // end movie button click listener


// click listener for adding movies
$('#add-movie').on('click', function(event) {
    console.log('new movie!')
    var newMovie = $('#new-movie').val().trim();
    movies.push(newMovie);
    renderButtons();
})

$(document).on('click', '.movie-button', displayGifs);
// https://api.giphy.com/v1/gifs/search?api_key=j6KOzFKoAK2TPWLS41yFQyfbevX6iUMW&q=Jack Torrence&limit=10&offset=0&rating=R&lang=en