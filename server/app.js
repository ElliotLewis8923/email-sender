const express = require('express')
const path = require("path")
const app = express()
const api = require('./api')

require('dotenv').config()

const PORT = 3000

app.use(express.json());
app.use('/', express.static(`${__dirname}/../build`, { index: 'index.html' }))

app.post('/api/send-email', async (req, res, next) => {
	const data = req.body
	if (!validate(data)) {
		return res.sendStatus(400)
	}
	try {
    await api.sendgrid(data)
    return res.sendStatus(200)
  } catch(e) {
    console.log(`Sendgrid request error code ${e.response.status}. Fall back to mailgun`)
	}
	try {
		await api.mailgun(data)
		return res.sendStatus(200)
	} catch(e) {
		return res.sendStatus(e.response.status)
	}
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
