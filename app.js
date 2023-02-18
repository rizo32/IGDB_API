const express = require("express");
const path = require('path');
const app = express();
const { PORT } = require("./config");
const { update_stock_titles } = require("./web_scraping");
const { fetchCandles } = require("./controllers/finnController");


// Utilisation du middleware pour parser les requêtes en JSON
app.use(express.json());

// Route pour récupérer les candles
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", function(req, res){
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
})

// app.get('/candles=:symbol', fetchCandles);
// app.get('/candles', );


// Update de la liste des stock à chaque jour
setInterval(update_stock_titles, 24 * 60 * 60 * 1000);
// Commande pour update manuel:
// update_stock_titles();



app.listen(process.env.port || PORT || 8080, () => {
  console.log(`Server started on port ${PORT}`);
});