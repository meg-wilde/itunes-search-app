import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Nav from "./components/Nav";
import Favourites from "./components/Favourites";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]); //create a blank array as the initial state for the search results
  const [favourites, setFavourites] = useState([]); //create a blank array to start for storing favourites

  const handleSearch = async (term, mediaType) => {
    // Make the API request using the url set above
    //take the search term and the media type and pass them into the search
    const url = `/search?term=${term}&media=${mediaType}`;
    const response = await fetch(url); //wait for the response
    const data = await response.json(); //save the response json as data
    setSearchResults(data.results || []); //add the data results into the array for search results
  };

  //function to add a result to favourites
  const addToFavourites = (result) => {
    const { trackId, trackName, artistName, artworkUrl100 } = result; //add the Id, name, artist and image to the result

    let myFavourites = JSON.parse(localStorage.getItem("myFavourites")) || []; //save the favourites to local storage

    // Check if the item has already been saved by checking if the id, name artist and image all match
    const isAlreadySaved = myFavourites.some(
      (item) =>
        item.trackId === trackId &&
        item.trackName === trackName &&
        item.artistName === artistName &&
        item.artworkUrl100 === artworkUrl100
    );

    if (!isAlreadySaved) {
      // If the item has not already been saved
      const newFavourite = { trackId, trackName, artistName, artworkUrl100 }; //create a new item
      //add the newFavourite to myFavourites
      myFavourites = [...myFavourites, newFavourite];
      localStorage.setItem("myFavourites", JSON.stringify(myFavourites));
      setFavourites(myFavourites); // Update state to trigger re-render
    } else {
      // If the item has already been saved, do nothing
    }
  };

  //function to remove item from favourites
  const removeFromFavourites = (result) => {
    const { trackId, trackName, artistName, artworkUrl100 } = result;
    // Update state to filter out and remove the item from the displayed favourites
    setFavourites((prevFavourites) =>
      prevFavourites.filter(
        (favourite) =>
          !(
            favourite.trackId === trackId &&
            favourite.trackName === trackName &&
            favourite.artistName === artistName &&
            favourite.artworkUrl100 === artworkUrl100
          )
      )
    );

    // Update localStorage after removal
    const updatedFavourites =
      JSON.parse(localStorage.getItem("myFavourites")) || [];
    // Filter out the removed item from the stored favourites
    const newFavourites = updatedFavourites.filter(
      (favourite) =>
        !(
          favourite.trackId === trackId &&
          favourite.trackName === trackName &&
          favourite.artistName === artistName &&
          favourite.artworkUrl100 === artworkUrl100
        )
    );
    // Save the updated favourites back to localStorage
    localStorage.setItem("myFavourites", JSON.stringify(newFavourites));
  };

  useEffect(() => {
    // Define a function to fetch favourites from local
    const fetchFavourites = () => {
      // Retrieve the stored favourites from local
      const storedFavourites = JSON.parse(localStorage.getItem("myFavourites"));
      // Set the favourites state to the retrieved favourites or an empty array if none exists
      setFavourites(storedFavourites || []);
    };
    // Call the fetchFavourites function when the component mounts
    fetchFavourites();
  }, []);

  //page layout
  return (
    <div>
      {/* always show the H1 and the nav */}
      <h1>iTunes Search API</h1>
      <Nav />
      {window.location.pathname === "/" ? (
        <div>
          {/* if the url path is "/" then show the search and results components */}
          <Search onSearch={handleSearch} />
          <Results
            results={searchResults}
            addToFavourites={addToFavourites}
            favourites={favourites}
          />
        </div>
      ) : window.location.pathname === "/favourites" ? (
        <div>
          {/* if the url is /favourites when how the favourites component */}
          <Favourites
            favourites={favourites}
            removeFromFavourites={removeFromFavourites}
          />
        </div>
      ) : (
        // if another path then show page not found
        <p>Page not found</p>
      )}
    </div>
  );
}

export default App;
