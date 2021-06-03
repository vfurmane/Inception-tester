const https = require('https');
const axios = require('axios');
require('dotenv').config({
	path: '.env.testing'
});

describe(`when contacting http://${process.env.NGINX_CONTAINER}`, function() {

	const agent = new https.Agent({
		rejectUnauthorized: false
	});

	test('should resolve', async function() {
		const response = axios({
			url: `http://${process.env.NGINX_CONTAINER}`,
			httpsAgent: agent,
		});

		await expect(response).resolves.toEqual(expect.anything());
	});

	test('should throw 301 error', async function() {
		const response = axios({
			url: `http://${process.env.NGINX_CONTAINER}`,
			httpsAgent: agent,
			maxRedirects: 0
		});
		
		await expect(response).rejects.toThrowError('301');
	});

	test('should redirect to https', async function() {
		const response = axios({
			url: `http://${process.env.NGINX_CONTAINER}`,
			httpsAgent: agent,
		});
		
		await expect(response).resolves.toMatchObject({
			request: {
				protocol: 'https:'
			}
		});
	});

});
