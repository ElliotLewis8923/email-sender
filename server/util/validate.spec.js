const assert = require('assert')
const sinon = require('sinon')
const querystring = require('querystring')
const validate = require('./validate')

describe('validate', () => {

  it('checks all email formats', () => {
    const correctData = { 
      to: ['abc@xyz.com'], 
      body: 'some content', 
      bcc: ['foo@bar.com'], 
      cc: ['one@two.com'],
      subject: 'a subject',
      body: 'a body',
      from: 'somebody@somebody.com'
    }
    const incorrectEmails = { 
      to: ['abcxyzcom'], 
      body: 'some content', 
      bcc: ['foobarcom'], 
      cc: ['onetwocom'],
      subject: 'a subject',
      body: 'a body',
      from: 'somebody'
    }
    assert(validate(correctData))
    assert(!validate(incorrectEmails))
  })

  it('checks missing fields', () => {
    const data = { 
      to: ['abc@xyz.com'], 
      body: 'some content', 
      bcc: ['foo@bar.com'], 
      cc: ['one@two.com'],
      subject: 'a subject',
      from: 'somebody@somebody.com'
    }
    assert(!validate(data))
  })

})