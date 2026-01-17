import React, { useState } from "react";
import MovieModel from "../models/MovieModel";
import ValidationErrors from "./ValidationErrors";

import { toast } from 'react-toastify';

const MovieForm = ({ fetchMovies, hideForms }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [actors, setActors] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const onChange = (field, value) => {
    switch(field) {
      case 'title':
        return setTitle(value);
      case 'year':
        return setYear(value);
      case 'actors':
        return setActors(value);
      case 'director':
        return setDirector(value);
      case 'description':
        return setDescription(value);
      default:
        console.error("Invalid operation")
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const movie = new MovieModel(
      title,
      year,
      actors,
      director,
      description,
    );

    if (movie.validate()) {
      setTitle('')
      setYear('')
      // setActors('')
      setDirector('')
      setDescription('')

      return onAddMovie(movie);
    }

    setErrors(movie.errors);
  }

    const onAddMovie = async (movie) => {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies`, {
        method: "POST",
        body: JSON.stringify({
          title: movie.title,
          year: movie.year,
          description: movie.description,
          director: movie.director,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.ok) {
        fetchMovies();
        toast("Successfully added a new movie!");
      }
    }

  return (
    <div className="row">
      <div className="container add-movie">
        <ValidationErrors errors={errors} />
        <form id="add-movie-form" name="add-movie-form" onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={(e) => onChange('title', e.target.value) } value={title} />

          <label htmlFor="year">Year</label>
          <input type="text" name="year"  onChange={(e) => onChange('year', e.target.value) } value={year} />

          <label htmlFor="director">Director</label>
          <input type="text" name="director" onChange={(e) => onChange('director', e.target.value) } value={director} />

          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={(e) => onChange('description', e.target.value) } value={description} />

          <button type="submit">
            <i className="fa-solid fa-file-circle-plus"></i>
            Add
          </button>
          &nbsp;
          <button onClick={hideForms}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default MovieForm;
