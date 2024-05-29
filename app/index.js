import { routes } from './routes.js';

function route() {
    const windowHash = window.location.hash;
    const routeKey = Object.keys(routes).find(key => {
        const { hash } = routes[key];
        const regex = new RegExp(`^${hash.replace(':currentPage', '([0-9]+)?').replace(':id', '([0-9]+)')}$`);
        return regex.test(windowHash);
    });

    let route = routes[routeKey];

    if (!route) {
        route = routes.characterList;
    }

    const match = windowHash.match(new RegExp(route.hash.replace(':currentPage', '([0-9]+)?').replace(':id', '([0-9]+)')));
    const param = match ? match[1] || 1 : 1; // Default to 1 if param is null

    route.init(param);
}

window.onhashchange = route;
route();
