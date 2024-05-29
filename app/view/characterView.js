import { hideLoadingSpinner } from '../util/spinner.js';

const CharacterView = {
    render: (character) => {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="bg" class="character-view">
                <button id="back-button" class="button-with-spinner">
                    <span>Back</span>
                    <img src="https://static1.squarespace.com/static/570413982eeb8114b6631016/59cffa294c0dbf7579528461/59cffc5937c5819421e5d541/1506803258457/Portal.gif" alt="Back">
                </button>
                <img class="character-image" src="${character.image}" alt="${character.name}">
                <div class="character-detail-card">
                    <div class="character-info">
                        <h1>${character.name}</h1>
                        <p>Status: ${character.status}</p>
                        <p>Species: ${character.species}</p>
                        <p>Gender: ${character.gender}</p>
                        <p>Origin: ${character.origin.name}</p>
                        <p>Location: ${character.location.name}</p>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('back-button').addEventListener('click', () => {
            history.back();
        });

        hideLoadingSpinner();
    }
};

export default CharacterView;
