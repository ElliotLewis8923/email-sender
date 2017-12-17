const axios = require('axios')
const formatMailgunData = require('./util/format').formatMailgunData

module.exports = {
  mailgun(data) {
		const apiUrl = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`
		return axios({
			method: 'post',
			url: apiUrl,
			data: formatMailgunData(data),
			auth: {
				username:  'api',
				password: process.env.MAILGUN_SECRET_KEY
			}
		})
	}
}
