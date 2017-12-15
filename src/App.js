import React, { Component } from 'react'

import EmailForm from './EmailForm'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="form">
        <EmailForm />
      </div>
    )
  }
}

export default App
