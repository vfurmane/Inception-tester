const axios = require('axios');

describe('when contacting http://localhost:80', function() {

	test('should resolve', async function() {
		const response = axios.get('http://localhost:80');

		await expect(response).resolves.toEqual(expect.anything());
	});

});
