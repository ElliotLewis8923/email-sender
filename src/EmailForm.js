import React, { Component } from 'react'
import axios from 'axios'

import Input from './Input'
import Tagger from './Tagger'

class EmailForm extends Component {
  constructor() {
    super()
    this.state = {
      values: {
        to: [],
        cc: [],
        bcc: [],
        from: '',
        subject: '',
        body: ''
      },
      validations: {}
    }

    this.updateValue = this.updateValue.bind(this)
    this.submit = this.submit.bind(this)

  }

  updateValue(value, field) {
    this.setState({ 
      values: {
        ...this.state.values,
        [field]: value
      },
      validations: {
        ...this.state.validations,
        [field]: false
      }
    })
  }

  async submit() {
    const { to, from, subject, body } = this.state.values
    const msgs = {}

    if(!to.length) msgs.to = 'The email must have at least one recipient'
    if(!from) msgs.from =  'The email must have a sender'
    if(!subject) msgs.subject = 'The email must have a subject'
    if(!body) msgs.body = 'The email must have a body'
    if(Object.keys(msgs).length > 0) return this.setState({ validations: msgs })
    const res = await axios.post('/api/send-email', this.state.values)
    
  }

  render() {
    const { values, validations } = this.state
    return (
      <form className="form-horizontal">
        <Tagger onChange={tags => this.updateValue(tags, 'to')} value={values.to} id="to" label="To" error={validations.to} />
        <Tagger onChange={tags => this.updateValue(tags, 'cc')} value={values.cc} id="cc" label="CC" error={validations.cc} />
        <Tagger onChange={tags => this.updateValue(tags, 'bcc')} value={values.bcc} id="bcc" label="BCC" error={validations.bcc} />
        <Input onChange={e => this.updateValue(e.target.value, 'from')} value={values.from} id="from" label="From" error={validations.from} />
        <Input onChange={e => this.updateValue(e.target.value, 'subject')} value={values.subject} id="subject" label="Subject" error={validations.subject} />
        <Input onChange={e => this.updateValue(e.target.value, 'body')} value={values.body} id="body" label="Body" error={validations.body} isTextArea />
          <button onClick={this.submit} type="button" className="btn btn-primary pull-right">Send</button>
      </form>
    )
  }
}

export default EmailForm
