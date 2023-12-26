import React, { useState } from "react";

//component to search for the item
const Search = ({ onSearch }) => {
  const [term, setTerm] = useState(""); //set the term to blank
  const [mediaType, setMediaType] = useState(""); //set the media to blank

  //function to handle the search
  const handleSearch = () => {
    //take in the term and media type
    onSearch(term, mediaType);
  };

  return (
    <div id="search-boxes">
      {/* create a text input box to take the search term */}
      <input
        type="text"
        placeholder="Enter search term"
        value={term}
        onChange={(e) => setTerm(e.target.value)} //when its filled in set the term to the value
      />
      {/* create a select dropdown for the mediatype and set it to the value selected */}
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        {/* list of options for mediaType */}
        <option value="music">Music</option>
        <option value="movie">Movie</option>
        <option value="podcast">Podcast</option>
        <option value="ebook">Ebook</option>
        <option value="musicVideo">musicVideo</option>
        <option value="audiobook">Audio Book</option>
        <option value="shortFilm">Short Film</option>
        <option value="tvShow">TV Show</option>
        <option value="software">Software</option>
        <option value="all">all</option>
      </select>
      {/* when the search button is clicked trigger the handleSearch function */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
