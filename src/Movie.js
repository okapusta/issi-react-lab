import React from "react";

const Movie = ({ movie }) => {
  const onChange = (event) => {
    movie.markedForDeletion = event.target.checked;
  }

  return (
    <>
      <li key={movie.title}>
        <input type='checkbox' onChange={onChange}></input>
        { movie.title }, { movie.year }, { movie.actors }
      </li>
    </>
  )
}

export default Movie;
