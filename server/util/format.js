const querystring = require('querystring')

module.exports = {
  formatMailgunData({ from, subject, body, to, cc, bcc}) {
    const data = { from, subject }
    data.text = body
    data.to = to.join(', ')    
    if (cc.length) data.cc = cc.join(', ')
    if (bcc.length) data.cc = bcc.join(', ') 
    return querystring.stringify(data)
  }
}
