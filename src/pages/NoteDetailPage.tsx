import React from 'react'
import { Note } from '../contexts'
import { NotesService } from '../services'
import { NoteItem } from '../components/NoteItem/NoteItem'

interface State {
  note?: Note
}

export class NoteDetailPage extends React.Component<any, State> {
  state = {
    note: undefined,
  }

  componentDidMount() {
    NotesService.fetchNote(this.props.match.params.id)
      .then((note) => this.setState({note}))
      .catch(console.error)
  }

  render() {
    const {note} = this.state
    return (
      <div>
        {note && <NoteItem note={note}/>}
      </div>
    )
  }
}