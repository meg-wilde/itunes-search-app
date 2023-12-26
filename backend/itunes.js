const express = require("express");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3001; //define the port as 3001

app.use(express.static(path.join(__dirname, "frontend/build"))); // Serve static files from 'frontend/build'
app.use(express.json()); //JSON parsing for incoming requests
app.use(helmet()); // Enhance security by adding HTTP headers

//async function to search itunes taking the term and media inputs
async function searchiTunes(req, res) {
  //term and media from the query
  const { term, media } = req.query;
  //API url with inputs for term and media
  const url = `https://itunes.apple.com/search?term=${term}&media=${media}`;

  //try requesting from the API
  try {
    const response = await fetch(url); //wait for the response
    const data = await response.json(); //save the response json to data
    res.json(data);
  } catch (error) {
    console.error(error); //if there is an error output to the console
    res.status(500).json({ error: "Internal Server Error" }); //send a 500 error
  }
}
//GET request to /search starts searchItunes function
app.get("/search", searchiTunes);

//GET requests to '/favourites' serves the the 'index.html' file
app.get("/favourites", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// Handle all other routes by serving the 'index.html' file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//export the app to use for tests
module.exports = app;
