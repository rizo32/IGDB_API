<h5 style="text-align: center;">Collège de Maisonneuve<br>
<br><br><br><br><br>
Activité 1<br>
<br><br><br><br><br>
Par<br>
Gabriel ROY-RIZZOLI<br>
2295331<br>
<br><br><br><br><br>
Techniques avancées en programmation Web<br>
<br><br><br><br><br>
Travail présenté à<br>
Marcos V SANCHES<br>
dans le cadre du cours<br>
582-41F-MA<br>
<br><br><br><br><br><br>
Groupe 21622<br>
<br><br><br><br><br>
24 février 2023<br>
<br><br>


### TP 1

Github: https://github.com/rizo32/SPA-stockmarket-rizo

#### Description:

L'application consiste à afficher des graphiques du marché boursier depuis un interval de temps spécifié par l'usager. Les informations proviennent de l'API gratuit 'finnhub'.
    
#### Lignes de commande:

Notez que node.js doit avoir été téléchargé pour que les commandes suivantes fonctionnent.
    (https://nodejs.org);

##### Express

    npm i express --save

##### Librairies
 
    npm i axios
    npm i canvas
    npm i chart.js
    npm i csv-parser
    npm i dotenv
    npm i ejs
    npm i express
    npm i express-ejs-layouts
    npm i finnhub
    npm i puppeteer

##### Démarrage

    npm run dev (avec la ligne:   ` "dev": "nodemon server" `   dans packages.json)


#### Guide

La navigation "Stocks" permet de voir un affichage des stocks disponible, et les liens avec des périodes permettent d'afficher un graphique des résultats du titre à travers cet interval de temps.

<b>Pro tip:</b> Vous pouvez également indiquer un nombre de jour (ouvrable) précis dans l'URL pour avoir un interval spécifique.
