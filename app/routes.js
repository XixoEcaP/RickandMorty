import characterListController from './controller/characterListController.js';
import characterController from './controller/characterController.js';
import helloController from './controller/hello.js';

export const routes = {
    hello: {
        hash: '#hello',
        init: helloController.init
    },
    characterList: {
        hash: '#/(\\d+)',  // Updated regex to correctly match numbers
        init: (currentPage) => characterListController.init(currentPage)
    },
    character: {
        hash: '#/character/(\\d+)',  // Updated regex to correctly match character IDs
        init: (id) => characterController.init(id)
    }
};

const router = () => {
    const hash = window.location.hash;
    console.log('Current Hash:', hash);

    for (const route in routes) {
        const { hash: routeHash, init } = routes[route];
        const match = hash.match(new RegExp(routeHash.replace(/:\w+/g, '(\\w+)')));

        if (match) {
            console.log('Route Matched:', route);
            init(...match.slice(1));
            return;
        }
    }

    // Default to character list if no hash is matched
    characterListController.init();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

