import React from 'react'
import { Note, NotesContext } from '../../contexts'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { NotesService } from '../../services'
import { Trans } from 'react-i18next'
import styled from 'styled-components'

interface Props {
  note: Note
}

interface State {
  isEditing: boolean
  note: string
}

export class NoteItem extends React.Component<Props, State> {
  static contextType = NotesContext
  context!: React.ContextType<typeof NotesContext>

  state = {
    isEditing: false,
    note: this.props.note.title,
  }

  render() {
    return (
      <ListGroup.Item>
        {this.state.isEditing ? this.renderWrite() : this.renderRead()}
      </ListGroup.Item>
    )
  }

  renderRead() {
    return (
      <Row>
        <StylesCol>
          <span onClick={this.startEditing}>{this.state.note}</span>
        </StylesCol>
        <ButtonWrapper>
          <Button
            onClick={this.handleDelete}
          ><Trans i18nKey='delete'/></Button>
        </ButtonWrapper>
      </Row>
    )
  }

  renderWrite() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            value={this.state.note}
            onChange={this.handleNoteChange}
            onBlur={this.stopEditing}
            required
          />
        </InputGroup>
      </Form>
    )
  }

  handleDelete = () => {
    NotesService
      .deleteNote(this.props.note.id)
      .then(() => {
        this.context.setNotes(
          this.context.notes.filter(it => this.props.note.id !== it.id)
        )
      })
      .catch(console.error)
  }

  startEditing = () => {
    this.setState({
      isEditing: true,
      note: this.props.note.title,
    })
  }

  stopEditing = () => {
    this.setState({
      isEditing: false,
    })
    const newNote = {
      ...this.props.note,
      title: this.state.note,
    }
    NotesService.updateNote(newNote)
      .then(() => {
        const index = this.context.notes.findIndex(it => this.props.note.id === it.id)
        const newNotes = [...this.context.notes]
        if(index === -1) {
          newNotes.push(newNote)
        }
        else {
          newNotes[index] = newNote
        }
        this.context.setNotes(newNotes)
      })
      .catch(console.error)
  }

  handleNoteChange = (e: any) => {
    this.setState({
      note: e.target.value,
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.stopEditing()
  }
}

const ButtonWrapper = styled.div`
  margin-right: 10px;
`

const StylesCol = styled(Col)`
  margin: auto auto auto 10px;
`