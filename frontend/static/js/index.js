import Dashboard from "./views/Dashboard.js";
import { scatterplot } from "./scatterplot.js";

// Fetch de la vue dynamique liste
const view_stocks = async () => {
	// Récupération des données du stock auprès du serveur
	const response = await fetch("/stocks");
	const html = await response.text();

	// Extraction du main
	const promise = await extractMain(html);
	return promise;
};

// Fetch de la vue dynamique détail
const view_stock = async () => {
	// Récupération du nom du stock et de la date dans l'URL
	const stockArray = window.location.href.split("/");
	const stock = stockArray[stockArray.length - 2];
	const time = stockArray[stockArray.length - 1];

	// Récupération des données du stock auprès du serveur
	const response = await fetch(`/stockclose/${stock}/${time}`);
	const html = await response.text();

	// Extraction du main
	const promise = await extractMain(html);
	return promise;
};

// Extraction du main
const extractMain = async (html) => {
	// Extraction de la partie dynamique de la page HTML
	const header = 'id="app">';
	const footer = "</main>";
	const indexHeader = html.indexOf(header);
	const indexFooter = html.indexOf(footer);
	const main = html.slice(indexHeader + header.length, indexFooter);
	return main;
};

// Paramètres de l'URL
const pathToRegex = (path) =>
	new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
	// value/key
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
		(result) => result[1]
	);

	return Object.fromEntries(
		keys.map((key, i) => {
			return [key, values[i]];
		})
	);
};

// Router
const router = async () => {
	const routes = [
		{ path: "/", view: Dashboard },
		{ path: "/stocks", view: view_stocks },
		{ path: `/stockclose/:name/:time`, view: view_stock },
	];

	// match
	const potentialMatches = routes.map((route) => {
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path)),
		};
	});

	let match = potentialMatches.find(
		(potentialMatch) => potentialMatch.result != null
	);

	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname],
		};
	}

// Rendu -------------------------- 
	let view;

	// Page statique
	if (match.route.path == "/") {
		view = new match.route.view(getParams(match));
		document.querySelector("#app").innerHTML = await view.getHtml();

    // Pages dynamiques
	} else {
		view = await match.route.view();
		document.querySelector("#app").innerHTML = view;

        // Scatterplot
        if (match.route.path == "/stockclose/:name/:time"){
            scatterplot();
        }
	}
};

// SPA config
const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (e) => {
		e.preventDefault();
		navigateTo(e.target.href);
	});
	router();
});