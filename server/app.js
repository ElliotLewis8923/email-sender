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
	try {
		await api.mailgun(data)
		return res.sendStatus(200)
	} catch(e) {
		const status = e.response.status
		if (status == 400) return res.sendStatus(status)
	}
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
