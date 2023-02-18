const { API_KEY } = require("../config");

const finnhub = require('finnhub');
const finnhubClient = new finnhub.DefaultApi();

// Configuration de la clé API pour accéder à Finnhub
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = API_KEY;

/**
 * Récupère les données de candles pour une action donnée
 * @param {*} req 
 * @param {*} res 
 */
async function fetchCandles(req, res) {
  const { symbol } = req.params;
  console.log(symbol);

  try {
    // Appel à l'API Finnhub pour récupérer les candles de l'action
    const response = finnhubClient.stockCandles(symbol, "W", 1676690511, 1676690511);
    // const response = finnhubClient.stockCandles(symbol, "W", 1590988249, 1676690511);
    // const response = finnhubClient.stockCandles(symbol, "D", 1590988249, 1591852249);
    res.json(response);
    // console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching candles');
  }
}

module.exports = {
  fetchCandles,
};