import './App.css';
import 'milligram'
import Header from './Header';
import Footer from './Footer';
import MovieList from './MovieList';
import MovieForm from './MovieForm';

import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const onAddMovie = (movie) => {
    setMovies([ ...movies, movie ]);
  }

  const onDeleteMovies = () => {
    const newMovies = movies.filter((m) => !m.markedForDeletion);

    setMovies(newMovies);
  }

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
    </div>
  );
}

export default App;
