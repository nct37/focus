import React, { useContext } from "react";

import NotesContext from "../context/notes-context";

const FilterButtons = () => {
  const { dispatch, focus, toggleFocus } = useContext(NotesContext);

  const deleteAll = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all your notes?"
    );
    if (confirm) {
      dispatch({ type: "DELETE_ALL" });
    }
  };

  const focusMode = () => {
    toggleFocus();
    return !focus
      ? (document.body.style.background = "#1a283f")
      : (document.body.style.background = "lightblue");
  };

  return (
    <div className="filter-container">
      <button
        className="button move"
        onClick={() => focusMode()}
        title="Enter focus mode"
      >
        {focus ? "Normal" : "Focus"}
      </button>
      <button
        className="button remove-all"
        onClick={() => deleteAll()}
        style={{ display: focus ? "none" : "" }}
      >
        Delete All
      </button>
    </div>
  );
};

export { FilterButtons as default };
