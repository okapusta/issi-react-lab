import React from "react";

const MovieErrors = ({ errors }) => {
  const keys = Object.keys(errors);

  if (!keys.length) return null;

  return (
    <>
      <ul>
        {
          keys.map((key) => <li key={key}>{key} - {errors[key]}</li>)
        }
      </ul>
    </>
  )
}

export default MovieErrors;
