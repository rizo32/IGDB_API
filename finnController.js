
require('dotenv').config();
const path = require('path');

const finnhub = require('finnhub');
const finnhubClient = new finnhub.DefaultApi();

const { createCanvas } = require('canvas');
const Chart = require('chart.js');




// Configuration de la clé API pour accéder à Finnhub
console.log(process.env.API_KEY);
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY;

/**
 * Récupère les données de candles pour une action donnée
 * @param {*} req 
 * @param {*} res 
 */
async function fetchCandles(req, res) {
  const symbol = req;
  const start = Math.floor(Date.now() / 1000) - 86400 * 30; // 30 days ago
  const end = Math.floor(Date.now() / 1000);

//   try {
    // Appel à l'API Finnhub pour récupérer les candles de l'action
    // const response = finnhubClient.stockCandles(symbol, "W", 1676690511, 1676690511);

    // finnhubClient.stockCandles(symbol, "W", 1676690511, 1676690511, (error, data, response) => {
    //     console.log(data)
    // });

    return new Promise((resolve, reject) => {
        finnhubClient.stockCandles(symbol, "D", start, end, (error, data, response) => {
          if (error) {
            console.error(error);
            reject('Error fetching candles');
          } else {
            // const canvas = createCanvas(800, 600);
            // const ctx = canvas.getContext('2d');

            // xValues = data.c;
            // yValues = [0, 200]
            // const chart = new Chart(ctx, {
            // type: 'bar',
            // data: {
            //     labels: xValues,
            //     datasets: [{
            //     label: 'My Dataset',
            //     data: yValues,
            //     backgroundColor: ['red', 'orange', 'yellow', 'green'],
            //     borderWidth: 1
            //     }]
            // },
            // options: {
            //     scales: {
            //     yAxes: [{
            //         ticks: {
            //         beginAtZero: true
            //         }
            //     }]
            //     }
            // }
            // });
            // resolve(chart);

            //   console.log(data.c);
            resolve(data.c);




          }
        });
      });
    }



    // const response = finnhubClient.stockCandles(symbol, "W", 1590988249, 1676690511);
    // const response = finnhubClient.stockCandles(symbol, "D", 1590988249, 1591852249);
//     console.log("res " + data);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching candles');
//   }

module.exports = {
  fetchCandles
};