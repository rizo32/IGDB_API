// Import des modules et fichiers nécessaires
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const axios = require("axios");
const request = require("request");
const logger = require('./middleware/logger');

// Import des variables de configuration
const { PORT } = require("./config");
const { CLIENT_ID } = require("./config");
const { CLIENT_SECRET } = require("./config");

// Utilisation du middleware pour parser les requêtes en JSON
app.use(express.json());

// Route pour récupérer un jeton d'accès auprès de l'API Twitch
app.post('/get_access_token', async (req, res) => {
  console.log('Making request to Twitch API...');

  try {
    // Utilisation de la librairie Axios pour faire une requête HTTP POST à l'API Twitch avec les identifiants d'application
    const response = await axios({
      url: `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      method: 'post',
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });
    
    // Envoi de la réponse de l'API contenant le jeton d'accès au client
    res.send(response.data.access_token);
  } catch (error) {
    // En cas d'erreur, affichage du message d'erreur et envoi d'une réponse avec un code d'erreur 500
    console.error(error);
    res.status(500).send('Error getting access token');
  }
});

// Faire une requête AJAX pour récupérer un jeton d'accès au serveur
axios.post('/get_access_token', {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
})
  .then((response) => console.log('Access token:', response.data))
  .catch((error) => console.error('Error getting access token', error));

// Lancement du serveur sur le port spécifié dans la configuration ou sur le port 4001 si aucun port n'est spécifié
app.listen(80 || process.env.port || PORT || 4001, () => {
  console.log(`Server started on port ${PORT}`);
});
