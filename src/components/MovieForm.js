import React, { useState, useEffect, act } from "react";
import MovieModel from "../models/MovieModel";
import ValidationErrors from "./ValidationErrors";
import Select from 'react-select'

import { toast } from 'react-toastify';

const MovieForm = ({ fetchMovies, onCancel, movie }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [actors, setActors] = useState([]);
  const [actorOptions, setActorOptions] = useState([]);
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

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

  const onChangeActors = (actors) => {
    setActors(actors);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const model = new MovieModel(
      title,
      year,
      actors,
      director,
      description,
    );

    if (model.validate()) {
      setTitle('')
      setYear('')
      setActors([])
      setDirector('')
      setDescription('')

      if (isUpdating) return onUpdateMovie(model)

      return onAddMovie(model);
    }

    setErrors(model.errors);
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
      const json = await response.json();
      actors.forEach((actor) => {
        assignActor(json.movie.id, actor.value);
      })
      fetchMovies();
      toast("Successfully added a new movie!");
    }
  }

  const onUpdateMovie = async (updating) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies/${movie.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: updating.title,
        year: updating.year,
        description: updating.description,
        director: updating.director,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (response.ok) {
      const json = await response.json();
      actors.forEach((actor) => {
        assignActor(json.movie.id, actor.value);
      })
      window.location.href = '/';
      toast("Successfully added a new movie!");
    }
  }

  // TODO: Accept multiple actor IDs
  const assignActor = async (movieId, actorId) => {
    const body = JSON.stringify({
      actor_id: actorId,
    })
    await fetch(`${process.env.REACT_APP_API_HOST}/movies/${movieId}/actors`, {
      method: "PUT",
      body,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const fetchActors = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/actors`);
    if (response.ok) {
      const json = await response.json();

      setActorOptions(json.actors.map(a => mapActors(a)));
    }
  }

  const mapActors = (a) => ({ label: `${a['name']} ${a['surname']}`, value: a['id'] });

  useEffect(() => {
    fetchActors();
    if (movie) {
      setIsUpdating(true);
      setTitle(movie.title);
      setDescription(movie.description);
      setDirector(movie.director);
      setYear(movie.year);
      setActors(movie.actors.map(a => mapActors(a)));
    }
  }, []);

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

          <Select
            closeMenuOnSelect={false}
            isMulti
            options={actorOptions}
            onChange={onChangeActors}
            value={actors}
          />
          <br />
          <button type="submit">
            <i className="fa-solid fa-file-circle-plus"></i>
            { isUpdating ? 'Update' : 'Add' }
          </button>
          <>
            &nbsp;
            <button onClick={onCancel}>
              Cancel
            </button>
          </>
        </form>
      </div>
    </div>
  )
}

export default MovieForm;
