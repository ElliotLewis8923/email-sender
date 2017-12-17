import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import AppCSS from './App.css'
import App from './App'

ReactDOM.render((<App />), document.querySelector('.container'))
