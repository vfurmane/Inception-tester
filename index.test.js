const axios = require('axios');

describe('when contacting http://localhost:80', function() {

	test('should resolve', async function() {
		const response = axios.get('http://172.17.0.1');

		await expect(response).resolves.toEqual(expect.anything());
	});

});
