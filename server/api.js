const axios = require('axios')
const format = require('./util/format')

module.exports = {

  mailgun(data) {
		const url = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`
		return axios({
			method: 'post',
			url,
			data: format.mailgun(data),
			auth: {
				username:  'api',
				password: process.env.MAILGUN_SECRET_KEY
			}
		})
	},

	sendgrid(data) {
		const url = 'https://api.sendgrid.com/v3/mail/send'
		return axios({
			method: 'post',
			url,
			data: format.sendgrid(data),
			headers: {
				Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
			}
		})
	}

}
