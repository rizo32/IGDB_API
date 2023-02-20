// import Stocks from "../../../views/Stocks.ejs";
import Dashboard from "./views/Dashboard.js";





const view_stock = async() => {
    const stockArray = window.location.href.split("/");
    const stock = stockArray[stockArray.length - 1];
    const response = await fetch(`/stockView/${stock}`);
    const html = await response.text();
    return html;
    // console.log(html2);
}

const view_stocks = () => {
    return fetch('/stocks')
      .then(response => response.text())
      .catch(error => console.error(error));
};

// const view_stocks = async() => {
//     const response = await fetch('/stocks');
//     const html = await response.text();
//     return html;
// }




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

    
    const view = await match.route.view();

    // const view = new match.route.view(getParams(match));

    // document.querySelector('#app').innerHTML = html;
    document.querySelector('#app').innerHTML = view;
}

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