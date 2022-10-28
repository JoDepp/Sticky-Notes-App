import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

/*this container manages all fo the stae for this app, delegating
rendering logic to presentational components*/
class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };
  //Adding a new Method
  addNote = () => {
    //created a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    //added the new note to existing notes array in State
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };
  //defined an event handler method that copies/maps over the array of notes in state except
  //for the one that has been changed

  onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    /* Toggle the doesMatchSearch boolean value of each sticky note
    when the user types in teh search field. Set the doesMatchSearch
    value to true for a sticky note if it's title or description matches the search string*/
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        /*If the search field is empty, we set the doesMatchSearch
        value for every note to true*/
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };
  //Delete functionality
  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  //Lifecycle functions save notes incase user exits or refreshes
  componentDidUpdate() {
    //will fire anytime our state changes.
    //stringify will turn our notes into a string b/c that's the only way to save to local storage
    const stringifiedNotes = JSON.stringify(this.state.notes);
    //Capture the state of our note and save to local storage
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  componentDidMount() {
    //now stringifiedNotes will be set to whatever is in local storage
    const stringifiedNotes = localStorage.getItem("savedNotes");
    //if there is something in strigifiedNotes than we want to parse that and give it to state
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }
  //passed the onType method over to Note.js by adding below
  render() {
    return (
      <div>
        {/*added onSearch to Header section so it links over to the Header.js*/}
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
