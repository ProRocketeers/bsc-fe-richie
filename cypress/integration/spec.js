/// <reference types="Cypress" />
/* eslint-disable no-undef */

describe('list', function () {
  beforeEach(() => {
    cy.visit('http://localhost:9000/notes')
  })
  it('should redirect to create page', function () {
    cy.get('#root')
      .find('.btn-primary')
      .click()
      .location('pathname')
      .should('eq', '/notes/create')
  })
  it('should render list of notes', function () {
    cy.get('#root')
      .find('.list-group .list-group-item')
      .should('have.length', 2)
  })
})

describe('detail', function () {
  beforeEach(() => {
    cy.visit('http://localhost:9000/notes/1')
  })

  it('should render render delete button', function () {
    cy.get('#root')
      .find('.list-group-item button')
      .should('have.length', 1)
  })
})

describe('create', function () {
  beforeEach(() => {
    cy.visit('http://localhost:9000/notes/create')
  })

  it('should render input and button', function () {
    cy.get('#root input').should('have.attr', 'type', 'text')
    cy.get('#root .btn-primary').should('be.enabled')
  })
})
