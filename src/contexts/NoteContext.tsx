import React from 'react'

export interface Note {
  id: number
  title: string
}

export interface NotesContextValue {
  notes: Array<Note>
  setNotes(notes: Array<Note>): void
}

export const NotesContext = React.createContext<NotesContextValue>({
  notes: [],
  setNotes(notes: Array<Note>): void {}
});

export class NotesProvider extends React.Component {
  state = {
    notes: []
  }

  setNotes = (notes: Array<Note>) => {
    this.setState({notes})
  }

  render() {
    return <NotesContext.Provider value={{
      notes: this.state.notes,
      setNotes: this.setNotes,
    }}>
      {this.props.children}
    </NotesContext.Provider>
  }
}
