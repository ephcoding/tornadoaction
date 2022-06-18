import Cors from "cors";
import RSSParser from "rss-parser";

export default async function handler(req, res) {
	let rss_parser = new RSSParser();

	await runMiddleware(req, res, corsMiddleware);

	await rss_parser.parseURL(req.body.feed_url, (error, feed) => {
		if (error) throw error;
		res.status(200).json(feed.items);
	});
}

const corsMiddleware = Cors({
	origin: true,
	methods: ["POST", "OPTIONS"],
	preflightContinue: true,
});

function runMiddleware(req, res, middleware) {
	return new Promise((resolve, reject) => {
		middleware(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
