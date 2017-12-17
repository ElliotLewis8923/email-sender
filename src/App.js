import React, { Component } from 'react'

import EmailForm from './EmailForm'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="form">
        <div className="page-header">
          <h1>Email Sender</h1>
        </div>
        <EmailForm />
      </div>
    )
  }
}

export default App
