const querystring = require('querystring')

module.exports = {

  mailgun({ from, subject, body, to, cc, bcc }) {
    const data = { 
      from,
      subject,
      text: body,
      to: to.join(', ')
    }

    if (cc.length) data.cc = cc.join(', ')
    if (bcc.length) data.cc = bcc.join(', ') 
    return querystring.stringify(data)
  },

  sendgrid({ from, subject, body, to, cc, bcc }) {
    const data = {
      to: to.map(email => ({ email })),
      subject,
      from: { email: from },
      content: [{ type: 'text/plain', value: body }]
    }

    if(cc.length) data.cc = cc.map(email => ({ email }))
    if(bcc.length) data.bcc = bcc.map(email => ({ email }))
    return { personalizations: [data] }
  }

}
