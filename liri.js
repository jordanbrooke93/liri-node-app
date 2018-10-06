require("dotenv").config();
var moment = require("moment");
var request = require("request");
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// function spotify() {
//         var song = process.argv[3];

//         spotify.search({ type: 'track', query: song }, function (err, data) {
//             if (err) {
//                 return console.log('Error occurred: ' + err);
//             }

//             console.log("Artist: " + data.tracks.items[0].artists[0].name);
//             console.log("Song name: " + data.tracks.items[0].name)
//             console.log("Preview link: " + data.tracks.items[0].preview_url)
//             console.log("Album: " + data.tracks.items[0].album.name)
//         })
// };

// function movie() {
//         // var argv = process.argv[3];
//         var movie = process.argv[3];
//         // *****************************************
//         // for (var i = 2; i < argv.length; i++) {
//         //     if (i > 2 && i < argv.length) {
//         //         movie = movie + "+" + argv[i]
//         //     } else {
//         //         movie = movie + argv[i]
//         //     }
//         // }
//         // *****************************************
//         var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=e0d503dc";

//         console.log(queryUrl);
//         request(queryUrl, function (err, response, body) {
//             var body = JSON.parse(body);
//             console.log("Title: " + body.Title);
//             console.log("Year: " + body.Year);
//             console.log("Rated: " + body.Rated);
//             console.log("IMDB Rating: " + body.imdbRating);
//             console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
//             console.log("Country: " + body.Country);
//             console.log("Language: " + body.Language);
//             console.log("Plot: " + body.Plot);
//             console.log("Actors: " + body.Actors);
//         })
// }

// function concert() {
        // var argv = process.argv[2];
        var band = process.argv[2];
        // for (var i = 2; i < argv.length; i++) {
        //     if (i > 2 && i < argv.length) {
        //         band = band + "+" + argv[i];
        //     } else {
        //         band = band + argv[i];
        //     }
        // }
        var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
        console.log(queryUrl);

        request(queryUrl, function (error, response, body) {
            console.log("Upcoming events for " + band + ':');
            var body = JSON.parse(body);
            // for (var set in body) {
                var date = moment(body.datetime).format("MM/DD/YYYY");
                console.log(body.venue.city)
                // console.log(body.venue.city + ", " + body.venue.region + " " + "at " + body.venue.name + "on " + date)
            // }
        })
// };



function whatItSays() {
    var fs = require("fs")
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
    })
    if (process.argv[2] === "spotify-this-song") {
        spotify()
    } else if (process.argv[2] === "movie-this") {
        movie()
    } else if (process.argv[2] === "concert-this") {
        concert()
    }
  }