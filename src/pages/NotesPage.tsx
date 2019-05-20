import React from 'react'
import Button from 'react-bootstrap/Button'
import { NotesList } from '../components'
import { NotesContext } from '../contexts'
import { Link } from 'react-router-dom'
import { NotesService } from '../services'
import { Trans } from 'react-i18next'
import styled from 'styled-components'

export class NotesPage extends React.Component {
  static contextType = NotesContext
  context!: React.ContextType<typeof NotesContext>

  componentDidMount() {
    NotesService.fetchNotes()
      .then(this.context.setNotes)
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <ButtonWrapper>
          <Link to="/notes/create">
            <Button variant="primary"><Trans i18nKey="create"/></Button>
          </Link>
        </ButtonWrapper>
        <NotesList notes={this.context.notes}/>
      </div>
    )
  }

}

const ButtonWrapper = styled.div`
  margin-bottom: 1em;
`