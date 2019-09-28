require("dotenv").config();
const keys = require("./keys.js");
const inquirer = require("inquirer");
const axios = require("axios");
// const spotify = new Spotify(keys.spotify);

console.log("Welcome to LIRI!\n");

inquirer
  .prompt([
    {
      name: "command",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "concert-this",
        "spotify-this-song",
        "movie-this",
        "do-what-it-says"
      ]
    }
  ])
  .then(answers => {
    switch (answers.command) {
      case "concert-this":
        concertThis();
        break;

      case "View Low Inventory":
        break;

      case "Add to Inventory":
        break;

      case "Add New Product":
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
          throw err;
        });
    });
}
