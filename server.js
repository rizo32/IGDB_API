const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const ejs = require("ejs");
const app = express();

// const { PORT } = require("./config");
// const { update_stock_titles } = require("./web_scraping");
const { fetchCandles } = require("./finnController");

// app.get('/candles=:symbol', fetchCandles);

const stocks = require("./frontend/static/upload/stock_titles.json");


// on crée une exception, il va toujours rouler le js
app.use(
	"/static",
	express.static(path.resolve(__dirname, "frontend", "static"))
);

app.set("view engine", "ejs");
// app.set('layout', './views/layout');
app.use(expressLayouts);

app.set("views", path.join(__dirname, "views"));

// app.get('/', (req, res) => {
//   res.render('home', { title: 'Home', layout: 'layout' });
// });

app.get("/stocks", (req, res) => {
	// const data = "data";
	// const data = stocks;
	const data = stocks;

	// res.setHeader('Content-Type', 'application/json');
	// res.send(`const stocks = ${JSON.stringify(data)};`);
	// res.send(JSON.stringify(data));
	// res.sendFile(path.resolve(__dirname, 'views', "Stocks.ejs"));
	res.render("stocks", { title: "stocks", layout: "layout", data: data });

    // ejs.renderFile("stocks.ejs", data, (err, html) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(500).end();
	// 	}
	// 	res.send(html);
	// });
});

app.get("/stockView/:name", async (req, res) => {
    stockName = req.params.name;
	// const data = "data";
	// const data = stocks;
    const data = await fetchCandles(stockName);
    

	// res.setHeader('Content-Type', 'application/json');
	// res.send(`const stocks = ${JSON.stringify(data)};`);
	// res.send(JSON.stringify(data));
	// res.sendFile(path.resolve(__dirname, 'views', "Stocks.ejs"));
    

	// ejs.renderFile("stockView.ejs", data, (err, html) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(500).end();
	// 	}
	// 	res.send(html);
	// });

	res.render("stockView", { title: "stockView", layout: "layout", data: data, });
});

// AVEC SEND !!!
// app.get("/template", (req, res) => {
// 	const data = { name: "John Doe" };
// 	ejs.renderFile("path/to/template.ejs", data, (err, html) => {
// 		if (err) {
// 			console.log(err);
// 			return res.status(500).end();
// 		}
// 		res.send(html);
// 	});
// });

app.get("/*", function (req, res) {
	res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(8081, () => console.log("server running..."));
