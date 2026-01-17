import React from 'react'

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router";

const Movie = ({ id }) => {
  const params = useParams();
  console.log("Movie", params.id);
  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <h2>Titles</h2>
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
