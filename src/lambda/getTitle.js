const fetch = require('node-fetch');

exports.handler = async (event, context) => {
	const videoUrl = event.queryStringParameters.url;
	return fetch(videoUrl, { headers: { Accept: 'application/json' } })
		.then((response) => response.text())
		.then((data) => {
			// get title from head
			const title = data.match(/<title>([^<]*)<\/title>/)[1];
			return {
				statusCode: 200,
				body: title
			};
		})
		.catch((error) => ({ statusCode: 422, body: String(error) }));
};
