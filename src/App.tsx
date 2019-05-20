import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import i18n from 'i18next'
import Container from 'react-bootstrap/Container'

import { NotesProvider } from './contexts'
import { CreateNotePage, HomePage, NotesPage } from './pages'
import { Header } from './components'
import { NoteDetailPage } from './pages/NoteDetailPage'


const AppMain = styled.main`
  margin-top: 2em;
`

const App: React.FC = () => {
  const [lang, setLang] = useState('en')

  return (
    <NotesProvider>
      <BrowserRouter>
        <Header
          setLanguage={(lang: string) => i18n.changeLanguage(lang, () => setLang(lang))}
        />
        <AppMain>
          <Container>
            <Route path="/" component={HomePage} exact/>
            <Route path="/notes" component={NotesPage} exact/>
            <Switch>
              <Route path="/notes/create" component={CreateNotePage} exact/>
              <Route path="/notes/:id" component={NoteDetailPage}/>
            </Switch>
          </Container>
        </AppMain>
      </BrowserRouter>
    </NotesProvider>
  )
}

export default App
