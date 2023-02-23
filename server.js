const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const ejs = require("ejs");
const app = express();

const { fetchCandles } = require("./finnController");
const { update_stock_titles } = require("./web_scraping");

// Update de la liste des stock à chaque jour
setInterval(update_stock_titles, 24 * 60 * 60 * 1000);

const startServer = async () => {
	await new Promise((resolve, reject) => {
		update_stock_titles()
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});

	app.use(
		"/static",
		express.static(path.resolve(__dirname, "frontend", "static"))
	);

	app.set("view engine", "ejs");

	app.use(expressLayouts);

	app.set("views", path.join(__dirname, "views"));

	const stocks = require("./frontend/static/upload/stock_titles.json");

	app.get("/stocks", (req, res) => {
		const data = stocks;
		res.render("stocks", { title: "stocks", layout: "layout", data: data });
	});

	app.get("/stockclose/:name/:time", async (req, res) => {
		const data = await fetchCandles(req);
		res.render("stockclose", {
			title: "stockclose",
			layout: "layout",
			data: data,
		});
	});

	app.get("/*", function (req, res) {
		res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
	});

	app.listen(8081, () => console.log("server running..."));
};

startServer().catch((error) => {
	console.error("Error starting server:", error);
});
