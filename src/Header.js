import React from "react";
//make Header an explicit return
const Header = (props) => {
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };
  return (
    <header className="app-header">
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        {/* add onClick to button so you can click and add a new note*/}
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

//then export//
export default Header;
