const fs = require("fs");
const puppeteer = require("puppeteer");
const csv = require("csv-parser");
const axios = require("axios");

const path = "./frontend/static/upload/stock_titles"; // chemin du téléchargement


// Pour obtenir l'URL du lien dynamiquement (le nom du fichier csv pourrait changer)
const update_stock_titles = async () => {
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		executablePath:
			"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
		userDataDir: "./chrome-user-data",
	});

    try {
        /* Ouvrir le site à racler */
        const page = await browser.newPage();
        await page.goto("https://www.rizorizo.art/about/");

        /* Le bouton a un ID particulier */
        /* IMPORTANT: Ceci doit être mis à jour manuellement si l'id du bouton change */
        const selectorNasdaq = "a#download-stock-titles";

        /* Attend que le DOM soit visible */
        await page.waitForSelector(selectorNasdaq, { visible: true });
        const button = await page.$(selectorNasdaq);

        /* Évaluation du HREF */
        const url = await page.evaluate(
            (downloadLink) => downloadLink.getAttribute("href"),
            button
        );

        /* Téléchargement CSV */
        await downloadCsvFile(url, path);

        /* Conserve une colonne (symbole), converti en JSON */
        await fetchTitles();

    } catch (error) {
        console.error("Error during script execution:", error);

    } finally {
        await browser.close();
    }
};


/* Téléchargement CSV */
const downloadCsvFile = async (url, path) => {
    // Fait une requête HTTP GET pour récupérer le fichier CSV
    const response = await axios({
        method: "get",
        url,
        responseType: "stream",
    });

    // Crée un flux d'écriture vers le fichier local
    const writer = fs.createWriteStream(`${path}.csv`);

    // Pipe le flux de données du fichier CSV vers le flux d'écriture local
    response.data.pipe(writer);

    // Retourne une promesse qui résout une fois que l'écriture est terminée ou qui rejette une erreur si elle survient
    await new Promise((resolve, reject) => {
        // Attache des gestionnaires d'événements pour résoudre ou rejeter la promesse
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
};

/* Conserve une colonne (symbole), converti en JSON */
const fetchTitles = async () => {
	try {
		const results = [];
        fs.createReadStream(`${path}.csv`) // Crée un flux de lecture de fichier pour le fichier stock_titles.csv
            .pipe(csv()) // Utilise le parseur csv-parser pour lire le flux et convertir chaque ligne en objet JS
			.on("data", (data) => {
                // Conserve une seule colonne, rempli un tableau
				results.push(data.Symbol);
			})
			.on("end", () => {
                // Conversion JSON
				fs.writeFile(`${path}.json`, JSON.stringify(results),
					(err) => {
						if (err) throw err;
					}
				);
			});
	} catch (error) {
		console.error("Error during script execution:", error);
	}
};

module.exports = { update_stock_titles };