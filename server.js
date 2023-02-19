const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const ejs = require('ejs');
const app = express();

// on crée une exception, il va toujours rouler le js
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.set('view engine', 'ejs');
// app.set('layout', './views/layout');
app.use(expressLayouts);

app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => {
//   res.render('home', { title: 'Home', layout: 'layout' });
// });

app.get('/stocks', (req, res) => {
    // const data = "data";
    // const data = stocks;
    const data = { stocks: ['AAPL', 'GOOG', 'FB'] }; // example data
    // res.setHeader('Content-Type', 'application/json');
    // res.send(`const stocks = ${JSON.stringify(data)};`);
    // res.send(JSON.stringify(data));
    // res.sendFile(path.resolve(__dirname, 'views', "Stocks.ejs"));
    res.render('stocks', { title: 'stocks', layout: 'layout', data: data });
});


app.get("/*", function(req, res){
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
})

app.listen(8081, () => console.log("server running..."));