import React from 'react'
import { Note } from '../../contexts'
import { ListGroup } from 'react-bootstrap'
import { NoteItem } from '../NoteItem/NoteItem'

interface Props {
  notes: Array<Note>
}

export function NotesList(props: Props) {
  return (
    <ListGroup>
      {props.notes.map(note => <NoteItem key={note.id} note={note}/>)}
    </ListGroup>
  )
}