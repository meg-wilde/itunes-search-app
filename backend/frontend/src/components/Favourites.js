import React from "react";

//component to show favourites to user taking in the favourites and the remove function
const Favourites = ({ favourites, removeFromFavourites }) => {
  return (
    <div>
      <h2>My Favourites</h2>
      {/* //create a container to display the results */}
      <div className="favourites-container">
        {/* map the favourites */}
        {favourites.map((favourite) => (
          // each result output
          <div key={favourite.trackId} className="favourite-item">
            {/* image */}
            <img
              src={favourite.artworkUrl100}
              alt={`${favourite.trackName} Album Cover`}
            />
            {/* artist name */}
            <p>{favourite.artistName}</p>
            {/* track name */}
            <p>{favourite.trackName}</p>
            {/* button to trigger the removeFromFavourites function */}
            <button
              className="remove-favourite"
              onClick={() => removeFromFavourites(favourite)}
            >
              Remove from favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
