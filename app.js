const express = require("express");
const path = require("path");
const app = express();
const { PORT } = require("./config");
const { router } = require("./routes");

// Utilisation du middleware pour parser les requêtes en JSON
app.use(express.json());

app.use(router);

app.listen(80 || process.env.port || PORT || 4001, () => {
  console.log(`Server started on port ${PORT}`);
});