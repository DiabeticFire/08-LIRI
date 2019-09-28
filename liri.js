require("dotenv").config();
const keys = require("./keys.js");
const inquirer = require("inquirer");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

console.log("\nWelcome to LIRI!\n");

inquirer
  .prompt([
    {
      name: "command",
      type: "list",
      message: "What would you like to do today?",
      choices: ["Search a band / artist", "Search a song", "Search a movie"]
    }
  ])
  .then(answers => {
    switch (answers.command) {
      case "Search a band / artist":
        concertThis();
        break;

      case "Search a song":
        spotifyThis();
        break;

      case "Search a movie":
        movieThis();
        break;

      default:
        throw "error";
    }
  });

function concertThis() {
  inquirer
    .prompt([
      {
        name: "band",
        message: "What is the name of the band or artist?",
        type: "input"
      }
    ])
    .then(answers => {
      let queryURL =
        "https://rest.bandsintown.com/artists/" +
        answers.band +
        "/events?app_id=" +
        keys.bands.id;
      axios
        .get(queryURL)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log("===== ERROR ========================================");
          throw err;
        });
    });
}

function spotifyThis() {
  inquirer
    .prompt([
      {
        name: "song",
        message: "What is the name of the song?",
        type: "input"
      }
    ])
    .then(answers => {
      spotify
        .search({
          type: "track",
          query: answers.song,
          limit: 10
        })
        .then(data => {
          let song = data.tracks.items[0];
          console.log("Artist:       " + song.artists[0].name);
          console.log("Song:         " + song.name);
          console.log("Preview Link: " + song.preview_url);
          console.log("Album:        " + song.album.name);
        })
        .catch(err => {
          throw err;
        });
    });
}

function movieThis() {
  inquirer
    .prompt([
      {
        name: "movie",
        message: "What is the name of the movie?",
        type: "input"
      }
    ])
    .then(answers => {
      let queryURL =
        "http://www.omdbapi.com/?apikey=" +
        keys.omdb.id +
        "&type=movie&t=" +
        answers.movie;
      axios
        .get(queryURL)
        .then(data => {
          console.log("Title:           " + data.data.Title);
          console.log("Release Year:    " + data.data.Year);
          console.log("IMDB Rating:     " + data.data.imdbRating);
          console.log("Rotten Tomatoes: " + data.data.Ratings[1].Value);
          console.log("Country:         " + data.data.Country);
          console.log("Language:        " + data.data.Language);
          console.log("Plot:            " + data.data.Plot);
          console.log("Actors:          " + data.data.Actors);
        })
        .catch(err => {
          console.log("===== ERROR ========================================");
          throw err;
        });
    });
}
