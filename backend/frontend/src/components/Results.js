import React from "react";

//component to show the search results taking into account the current results, the addtofavourites function and the current favourites
const Results = ({ results, addToFavourites, favourites }) => {
  //function to check if the result is already in favourites (to decide what button to show)
  const isFavourite = (result) => {
    return (
      favourites &&
      favourites.some(
        (favourite) =>
          favourite.trackId === result.trackId &&
          favourite.trackName === result.trackName &&
          favourite.artistName === result.artistName &&
          favourite.artworkUrl100 === result.artworkUrl100
      )
    );
  };

  return (
    <div>
      <h2>Search Results</h2>
      {/* create a container to show the results */}
      <div className="results-container">
        {/* map the results */}
        {results.map((result) => (
          // each result card
          <div key={result.trackId} className="result-item">
            {/* image */}
            <img
              src={result.artworkUrl100}
              alt={`${result.trackName} Album Cover`}
            />
            {/* artist name */}
            <p>{result.artistName}</p>
            {/* track name */}
            <p>{result.trackName}</p>
            {/* button to add the item to favourites if the item is not a favourite already */}
            <button
              className="favourite"
              onClick={() => addToFavourites(result)}
              disabled={isFavourite(result)}
              key={result.trackId}
            >
              {/* if the item is a favourite, disable the button and show already in favourites */}
              {isFavourite(result)
                ? "Already in Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
