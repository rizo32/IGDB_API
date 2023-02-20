import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
// import Stocks from "../../../views/Stocks.ejs";
import Settings from "./views/Settings.js";
import PostView from "./views/PostView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    // value/key
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}
console.log("heloi");



const router = async() => {
    const routes = [
        { path: "/", view:Dashboard },
        { path: "/posts", view:Posts },
        // { path: "/stocks", view:Stocks },
        { path: "/settings", view:Settings },
        { path: "/post-view/:id", view:PostView }
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

    

    // console.log(match);
    const view = new match.route.view(getParams(match));

    console.log(match);
    // if(view )
    document.querySelector('#app').innerHTML = await view.getHtml();
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})