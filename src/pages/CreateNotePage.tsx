import React, { SyntheticEvent } from 'react'
import Button from 'react-bootstrap/Button'
import { NotesContext } from '../contexts'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { NotesService } from '../services'
import { Trans } from 'react-i18next'

export class CreateNotePage extends React.Component<any> {
  static contextType = NotesContext
  context!: React.ContextType<typeof NotesContext>

  state = {
    note: '',
  }

  render() {
    const {note} = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              value={note}
              onChange={this.handleNoteChange}
              required
            />
            <Button type="submit"><Trans i18nKey="add"/></Button>
          </InputGroup>
        </Form>
      </div>
    )
  }

  handleNoteChange = (e: any) => {
    this.setState({
      note: e.target.value,
    })
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    NotesService.createNote(this.state.note)
      .then((note) => this.props.history.push(`/notes/${note.id}`))
      .catch(console.error)
  }
}