import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import { Form, FormControlProps, Nav, Navbar } from 'react-bootstrap'

interface Props {
  setLanguage(lang?: string): void
}

export function Header(props: Props) {
  const {t} = useTranslation()
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/"><Navbar.Brand>{t('appTitle')}</Navbar.Brand></LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/notes"><Nav.Link>{t('notes')}</Nav.Link></LinkContainer>
        </Nav>
        <div>
          <Form.Control
            as="select"
            onChange={(e: React.FormEvent<FormControlProps>): void => {
              props.setLanguage(e.currentTarget.value)
            }}
          >
            {i18n.languages.map((lang: string) => (
              <option key={lang} value={lang}>{i18n.getFixedT(lang)('language')}</option>
            ))}
          </Form.Control>
        </div>
      </Navbar>
    </header>
  )
}