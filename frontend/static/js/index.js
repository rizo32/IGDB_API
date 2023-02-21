// import Stocks from "../../../views/Stocks.ejs";
import Dashboard from "./views/Dashboard.js";





const view_stock = async() => {
    const stockArray = window.location.href.split("/");
    const stock = stockArray[stockArray.length - 1];
    const response = await fetch(`/stockView/${stock}`);
    const html = await response.text();

    const header = 'id="app">'
    const footer = '</main>'
    const indexHeader = html.indexOf(header);
    const indexFooter = html.indexOf(footer);
    const main = html.slice(indexHeader + header.length, indexFooter);
    return main;
}

// const view_stocks = () => {
//     return fetch('/stocks')
//       .then(response => response.text())
//       .catch(error => console.error(error));
// };

const view_stocks = async() => {
    const response = await fetch('/stocks');
    const html = await response.text();
    
    const header = 'id="app">'
    const footer = '</main>'
    const indexHeader = html.indexOf(header);
    const indexFooter = html.indexOf(footer);
    const main = html.slice(indexHeader + header.length, indexFooter);
    return main;
}




const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    // value/key
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}


const router = async() => {
    const routes = [
        { path: "/", view:Dashboard },
        { path: "/stocks", view:view_stocks },
        { path: `/stockView/:name`, view:view_stock },
    ]

    // match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            // isMatch: location.pathname === route.path
            result: location.pathname.match(pathToRegex(route.path))
        }
    })
    // console.log(location.pathname);
    let match = potentialMatches.find(potentialMatch => potentialMatch.result != null);

    if(!match){
        match={
            route: routes[0],
            result: [location.pathname]
        }
    }

    /* Page statique vs dynamique */
    let view;
    if(match.route.path == "/"){
        view = new match.route.view(getParams(match));
        document.querySelector('#app').innerHTML = await view.getHtml();
    } else if(match.route.path == "/stockView/:name") {
        view = await match.route.view();
        document.querySelector('#app').innerHTML = view;

        // console.log(document.querySelector('#app').innerHTML);

        let stockPrices = document.querySelectorAll("li");
        let yValues = Array.from(stockPrices).map(stockPrice => parseFloat(stockPrice.innerText));
        // const yValues = [Math.floor(Math.min(...xValues)-5), Math.ceil(Math.max(...xValues)+5)]

        // let xValues = [-4, -3, -2, -1];
        
        // const dataPoints = xValues.map((x, i) => ({ x, y: yValues[i] }));

        const dataPoints = yValues.map((value, index) => {
            return { x: -yValues.length + index, y: value };
          });
        
        console.log(dataPoints);
        // console.log(yValues);



        // Create the scatter plot chart
        const canvas = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(canvas, {
        type: 'scatter',
        data: {
            datasets: [{
                data: dataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: 'true',
                        text: 'Days'
                    },
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    title: {
                        display: 'true',
                        text: 'Closing price ($)'
                    },
                    type: 'linear',
                    position: 'left'
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
        });



    } else {
        view = await match.route.view();
        document.querySelector('#app').innerHTML = view;
    }

    // const view = new match.route.view(getParams(match));

    // document.querySelector('#app').innerHTML = html;
    // document.querySelector('#app').innerHTML = view;
}


// const creationGraphique = () => {
//     const stockPrices = document.querySelectorAll("li");
//     console.log(stockPrices);
//     // stockPrices.forEach(stockPrice => )
// }

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e=>{
        // if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        // }
    })
    router();
})