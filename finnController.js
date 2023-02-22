require("dotenv").config();
const path = require("path");

/* API */
const finnhub = require("finnhub");
const finnhubClient = new finnhub.DefaultApi();

// Configuration de la clé API pour accéder à Finnhub
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;

/**
 * Récupère les données de candles pour une action donnée
 * @param {*} req
 * @param {*} res
 */
async function fetchCandles(req, res) {
	const symbol = req.params.name;
	const time = req.params.time;
	const start = Math.floor(Date.now() / 1000) - 86400 * time; // number of days
	const end = Math.floor(Date.now() / 1000);

	return new Promise((resolve, reject) => {
		finnhubClient.stockCandles(
			symbol,
			"D",
			start,
			end,
			(error, data, response) => {
				if (error) {
					console.error(error);
					reject("Error fetching candles");
				} else {
					resolve(data.c);
				}
			}
		);
	});
}
module.exports = {
	fetchCandles
};