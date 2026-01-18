import React, { useState } from "react";
import ValidationErrors from "./ValidationErrors";
import { toast } from 'react-toastify';

const ActorForm = ({ hideForms }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [errors, setErrors] = useState({});

  const onChange = (field, value) => {
    switch(field) {
      case 'name':
        return setName(value);
      case 'surname':
        return setSurname(value);
      default:
        console.error("Invalid operation")
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_HOST}/actors`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          surname: surname,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.ok) {
        hideForms();
        toast("Successfully added a new actor!");
      }
  }


  return (
    <div className="row">
      <div className="container add-actor">
        <ValidationErrors errors={errors} />
        <form id="add-actor-form" name="add-actor-form" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={(e) => onChange('name', e.target.value) } value={name} />

          <label htmlFor="surname">Surname</label>
          <input type="text" name="surname"  onChange={(e) => onChange('surname', e.target.value) } value={surname} />

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

export default ActorForm;
