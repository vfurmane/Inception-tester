const https = require('https');
const axios = require('axios');
const mysql = require('mysql');
require('dotenv').config({
	path: '.env.testing'
});

function connect_database() {
	return (new Promise(function(resolve, reject) {
		const connection = mysql.createConnection({
			host: process.env.MARIADB_CONTAINER,
			user: process.env.MARIADB_USER,
			password: process.env.MARIADB_PASSWORD
		});
		connection.connect(function(error) {
			if (error) return (reject(error));
			resolve(connection);
		});
	}));
}

describe(`when contacting http://${process.env.NGINX_CONTAINER}`, function() {

	const agent = new https.Agent({
		rejectUnauthorized: false,
		minVersion: "TLSv1.2",
		maxVersion: "TLSv1.3"
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
		const response = await axios({
			url: `http://${process.env.NGINX_CONTAINER}`,
			httpsAgent: agent,
		});
		
		await expect(response).toMatchObject({
			request: {
				protocol: 'https:'
			}
		});
	});

});

describe('when contacting the MariaDB database with valid user credentials', function() {

	test('should find the server', async function() {
		try {
			const connection = await connect_database();

			expect(connection).toEqual(expect.anything());
			connection.destroy();
		} catch (error) {
			expect(error.toString()).not.toEqual(expect.stringContaining('ENOTFOUND'));
		}
	});

	test('should connect to the server using the credentials', async function() {
		const connection = connect_database();

		await expect(connection).resolves.toEqual(expect.anything());
		connection.then(function(connection) {
			connection.destroy();
		});
	});
	
});
