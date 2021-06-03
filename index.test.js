const axios = require('axios');
require('dotenv').config({
	path: '.env.testing'
});

describe(`when contacting http://${process.env.NGINX_CONTAINER}:80`, function() {

	test('should resolve', async function() {
		const response = axios.get(`http://${process.env.NGINX_CONTAINER}:80`);

		await expect(response).resolves.toEqual(expect.anything());
	});

});
