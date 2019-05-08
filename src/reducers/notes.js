const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes.sort((a, b) => a.isComplete - b.isComplete);
    case 'ADD_NOTE':
      return [action.note, ...state];
    case 'REMOVE_NOTE':
      return state.filter(note => note.id !== action.id);
    case 'TOGGLE_COMPLETE':
      return state.map(note =>
        note.id === action.id
          ? { ...note, isComplete: !action.isComplete }
          : note
      );
    case 'MOVE_COMPLETED':
      // const completed = state.filter(note => note.isComplete);
      // const notCompleted = state.filter(note => !note.isComplete);
      // return [...notCompleted, ...completed];
      return state.sort((a, b) => a - b);
    case 'ADD_TEXT':
      return state.map(note =>
        note.id === action.id
          ? {
              ...note,
              text: action.text,
            }
          : note
      );
    case 'EDIT_NOTE':
      return state.map(note =>
        note.id === action.id ? { ...note, title: action.title } : note
      );

    case 'DELETE_ALL':
      state = [];
      return state;
    default:
      return state;
  }
};

export { notesReducer as default };
