import './App.css';
import 'milligram'
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import ActorForm from './components/ActorForm';
import { ToastContainer, toast } from 'react-toastify';

import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isAddingActor, setIsAddingActor] = useState(false);
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  const onDeleteMovies = () => {
    const result = window.confirm("Are you sure you want to delete selected movies?");

    if (!result) return;

    const promises = movies.filter((m) => m.markedForDeletion).map(m => {
      return fetch(`${process.env.REACT_APP_API_HOST}/movies/${m.id}`, {
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
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies`)
    if (response.ok) {
      const json = await response.json();

      setMovies(json.movies);
    }
  }

  const toggleAddActor = () => {
    setIsAddingActor(!isAddingActor);
    setIsAddingMovie(isAddingActor);
  }
  const toggleAddMovie = () => {
    setIsAddingMovie(!isAddingMovie);
    setIsAddingActor(isAddingMovie);
  }

  const hideForms = () => {
    setIsAddingActor(false);
    setIsAddingMovie(false);
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
            <div className='column'>
              <MovieList movies={movies}
                onDeleteMovies={onDeleteMovies}
              />
            </div>
            <div className='column float-right'>
              { !isAddingMovie && <>
                  <button type="submit" onClick={() => toggleAddMovie() }>
                    <i className="fa-solid fa-file-circle-plus"></i>
                    Add Movie
                  </button>
                </>
              }
              &nbsp;
              { !isAddingActor && <>
                  <button type="submit" onClick={() => toggleAddActor() }>
                    <i className="fa-solid fa-file-circle-plus"></i>
                    Add Actor
                  </button>
                </>
              }
              { isAddingMovie && <MovieForm fetchMovies={fetchMovies} hideForms={hideForms} /> }
              { isAddingActor && <ActorForm hideForms={hideForms} /> }
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
