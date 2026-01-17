import React from "react";

const ValidationErrors = ({ errors }) => {
  const keys = Object.keys(errors);

  if (!keys.length) return null;

  return (
    <>
      <ul className="error">
        {
          keys.map((key) => <li key={key}>{key} - {errors[key]}</li>)
        }
      </ul>
    </>
  )
}

export default ValidationErrors;
