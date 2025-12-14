import React from "react";

import Movie from "./Movie";

const MovieList = ({ movies, onDeleteMovies }) => {
  return (
    <div className="row">
      <div className="container movie-list-container">
        <ul id="movie-list">
          {
            movies.map((movie, i) => <Movie movie={movie} key={`movie-${i}`}/>)
          }
        </ul>
        {
          movies.length > 0 && (
            <button onClick={onDeleteMovies}>
              <i className="fa-solid fa-trash"></i>
              Delete selected movies
            </button>
          )
        }
      </div>
    </div>
  )
}

export default MovieList;
