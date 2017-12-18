const testEmail = email => 
  /.+\@.+\..+/.test(email)

module.exports = data => 
  [
    data.from,
    data.body,
    data.subject,
    data.to.length && data.to.every(email => testEmail(email)),
    data.cc.length && data.cc.every(email => testEmail(email)),
    data.bcc.length && data.bcc.every(email => testEmail(email)),
  ].every(cond => cond)
