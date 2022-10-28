import React from "react";

//change to explicit return b/c we need to return more than one block
/* This presentational component renders a single
list item element with two text input fields,
one for the note's title and one for the note's
description. When the user types in these fields,
functions that are passed to this component
as props are used to update the state of the
corresponding note object in the state of the
App component  */
const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
  };
  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };
  //call removeNote and pass it to the note id from the note object
  const clickDelete = () => {
    props.removeNote(props.note.id);
  };
  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={clickDelete}>
        X
      </span>
    </li>
  );
};

export default Note;
