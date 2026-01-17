import './App.css';
import 'milligram'
import Header from './Header';
import Footer from './Footer';
import MovieList from './MovieList';
import MovieForm from './MovieForm';
import { ToastContainer, toast } from 'react-toastify';

import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  // TBD handle actors
  // { "title": "Tester dupa 123", "year": 1999, "actors": "Testing Actor", "description": "Testing 123", "director": "Tester" }
  const onAddMovie = async (movie) => {
    const response = await fetch('http://localhost:8888/movies', {
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

  const onDeleteMovies = () => {
    const promises = movies.filter((m) => m.markedForDeletion).map(m => {
      return fetch(`http://localhost:8888/movies/${m.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )});
    Promise.all(promises).then(() => {
      fetchMovies();
      toast("Successfully removed movies!");
    })
  }

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8888/movies')
    if (response.ok) {
      const json = await response.json();

      setMovies(json.movies);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <h2>Titles</h2>
          <div className="row">
            <MovieList movies={movies}
              onDeleteMovies={onDeleteMovies}
            />
            <MovieForm onAddMovie={onAddMovie} />
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
