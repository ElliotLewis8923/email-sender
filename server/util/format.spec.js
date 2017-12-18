const assert = require('assert')
const querystring = require('querystring')
const format = require('./format')



describe('format Sendgrid', () => {

	it('should remove CC and BCC fields if not present', () => {
    const data = { 
      to: ['abc@xyz.com'], 
      body: 'some content', 
      bcc: [], 
      cc: [],
      subject: 'a subject',
      body: 'a body'
    }
    const formatted = format.sendgrid(data)
    assert(!formatted.personalizations[0].hasOwnProperty('bcc'))
    assert(!formatted.personalizations[0].hasOwnProperty('cc'))
  })
  
  it('should wrap email addresses in an object', () => {
    const data = { 
      to: ['abc@xyz.com'], 
      body: 'some content', 
      bcc: ['foo@bar.com'], 
      cc: ['one@two.com'],
      subject: 'a subject',
      body: 'a body'
    }
    const formatted = format.sendgrid(data)
    assert.deepEqual(formatted.personalizations[0].to, [{ email: 'abc@xyz.com' }])
    assert.deepEqual(formatted.personalizations[0].cc, [{ email: 'one@two.com' }])
    assert.deepEqual(formatted.personalizations[0].bcc, [{ email: 'foo@bar.com' }])
  })

  it('should wrap body into an object with type and value', () => {
    const data = { 
      to: ['abc@xyz.com'], 
      body: 'some content', 
      bcc: ['foo@bar.com'], 
      cc: ['one@two.com'],
      subject: 'a subject',
      body: 'a body'
    }
    const formatted = format.sendgrid(data)
    assert.deepEqual(formatted.personalizations[0].content, [{ type: 'text/plain', value: data.body }])
  })
})

describe('format Mailgun', () => {

  it('should cast arrays to a comma seperated list and encode everything as a querystring', () => {
    const data = { 
      to: ['abc@xyz.com', 'ghj@jkl.com'], 
      body: 'some content', 
      bcc: ['foo@bar.com', 'qwe@sdf.com'], 
      cc: ['one@two.com', 'zxc@vbn.com'],
      subject: 'a subject',
      body: 'a body'
    }
    const parsed = querystring.parse(format.mailgun(data))
    assert(parsed.to === 'abc@xyz.com, ghj@jkl.com')
    assert(parsed.bcc === 'foo@bar.com, qwe@sdf.com')
    assert(parsed.cc === 'one@two.com, zxc@vbn.com')
    assert(parsed.subject === data.subject)
    assert(parsed.text === data.body)
  })
})