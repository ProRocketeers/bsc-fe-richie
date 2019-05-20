import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cs from './assets/cs_i18n'
import en from './assets/en_i18n'


import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      cs: {
        translation: cs,
      },
    },
    lng: 'en',
    fallbackLng: ['en', 'cs'],
  })

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
