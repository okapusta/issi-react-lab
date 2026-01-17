import React, { useEffect, useState } from 'react'

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { ToastContainer } from 'react-toastify';
import { useParams } from "react-router";

const Movie = ({ id }) => {
  const params = useParams();

  const [movie, setMovie] = useState();

  const fetchMovie = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies/${params.id}`)
    if (response.ok) {
      const json = await response.json();

      setMovie(json.movie);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  if (!movie) return (
    <>
      Loading...
    </>
  )

  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <h2>{movie.title}</h2>
          <div className="row">
            Hello world
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Movie;
