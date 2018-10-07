require("dotenv").config();
var moment = require("moment");
var request = require("request");
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var choice = process.argv[2]
var argv= process.argv

runIt()
function runIt() {
    //console.log (random)

    switch (choice) {
        case "spotify-this-song":
            music();
            break;
        case "movie-this":
            movie();
            break;
        case "concert-this":
            concert();
            break;
        case "do-what-it-says":
            readRandom()
            break;
    }
}
function music() {
        var song = process.argv[3];
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name)
            console.log("Preview link: " + data.tracks.items[0].preview_url)
            console.log("Album: " + data.tracks.items[0].album.name)
        })
};

function movie() {
        
        var movie = process.argv[3];
        
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=e0d503dc";

        console.log(queryUrl);
        request(queryUrl, function (err, response, body) {
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("Rated: " + body.Rated);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        })
}

function concert() {
        var band = ""
        for (var i = 3; i < argv.length; i++) {
            if (i > 3 && i < argv.length) {
                band = band + "+" + argv[i];
            } else {
                band = band + argv[i];
            }
        }
        console.log(band)
        var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
        console.log(queryUrl);

        request(queryUrl, function (error, response, body) {
            console.log("Upcoming events for " + band + ':');
            var body = JSON.parse(body);
            for (let i = 0; i < body.length; i++) {
                var date = moment(body.datetime).format("MM/DD/YYYY");
                
                console.log(body[i].venue.city + ", " + body[i].venue.region + " " + "at " + body[i].venue.name + "on " + date)
            }
        })
};

function readRandom() {
    var fs = require("fs")
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var holder = data.split(",");
        choice = holder[0]// This is what we are check with switch case
        random = holder[1]// this is what the user is typing in "I want it that away"
        check()
    })
}


 
