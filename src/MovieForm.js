import React, { useState } from "react";
import MovieModel from "./models/MovieModel";
import MovieErrors from "./MovieErrors";

const MovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [actors, setActors] = useState('');
  const [errors, setErrors] = useState({});

  const onChange = (field, value) => {
    switch(field) {
      case 'title':
        return setTitle(value);
      case 'year':
        return setYear(value);
      case 'actors':
        return setActors(value)
      default:
        console.error("Invalid operation")
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const movie = new MovieModel(
      title,
      year,
      actors,
    );

    if (movie.validate()) {
      setTitle('')
      setYear('')
      setActors('')

      return onAddMovie(movie);
    }

    setErrors(movie.errors);
  }

  return (
    <div className="row">
      <div className="container add-movie">
        <MovieErrors errors={errors} />
        <form id="add-movie-form" name="add-movie-form" onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={(e) => onChange('title', e.target.value) } value={title} />

          <label htmlFor="year">Year</label>
          <input type="text" name="year"  onChange={(e) => onChange('year', e.target.value) } value={year} />

          <label htmlFor="actors">Actors</label>
          <input type="text" name="actors" onChange={(e) => onChange('actors', e.target.value) } value={actors} />

          <button type="submit">
            <i className="fa-solid fa-file-circle-plus"></i>
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default MovieForm;
