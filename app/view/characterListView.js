import characterListController from '../controller/characterListController.js';
import { showLoadingSpinner, hideLoadingSpinner } from '../util/spinner.js';

const CharacterListView = {
    render: (characters, currentPage, totalPages) => {
        const app = document.getElementById('app');
        const previousSearchTerm = characterListController.getCurrentSearchTerm();
        const hasFocus = document.activeElement === document.getElementById('filter-input');

        app.innerHTML = `
            <div class="character-list-view">
                <div class="logo">
                    <img src="https://image.ibb.co/hTQdUF/Rick_and_Morty_logo.png" alt="Rick and Morty Logo">
                </div>
                <div class="search-bar">
                    <input type="text" id="filter-input" placeholder="Search characters...">
                    <button id="clear-button" class="clear-button">
                        <span>Clear</span>
                        <img src="https://static1.squarespace.com/static/570413982eeb8114b6631016/59cffa294c0dbf7579528461/59cffc5937c5819421e5d541/1506803258457/Portal.gif" alt="Clear">
                    </button>
                </div>
                <div class="character-list">
                    ${characters.map(character => `
                        <div class="character-card" data-id="${character.id}">
                            <h3 class="character-name">${character.name}</h3>
                            <img src="${character.image}" alt="${character.name}">
                        </div>
                    `).join('')}
                    <div class="pagination">
                    <button id="prev-page" class="button-with-spinner" ${currentPage === 1 ? 'disabled' : ''}>
                        <span>Previous</span>
                        <img src="https://static1.squarespace.com/static/570413982eeb8114b6631016/59cffa294c0dbf7579528461/59cffc5937c5819421e5d541/1506803258457/Portal.gif" alt="Prev">
                    </button>
                    <button id="next-page" class="button-with-spinner" ${currentPage === totalPages ? 'disabled' : ''}>
                        <span>Next</span>
                        <img src="https://static1.squarespace.com/static/570413982eeb8114b6631016/59cffa294c0dbf7579528461/59cffc5937c5819421e5d541/1506803258457/Portal.gif" alt="Next">
                    </button>
                </div>
                </div>
                
            </div>
        `;

        const filterInput = document.getElementById('filter-input');
        filterInput.value = previousSearchTerm;

        filterInput.addEventListener('input', function () {
            const filterValue = this.value.toLowerCase();
            characterListController.search(filterValue);
        });

        document.getElementById('clear-button').addEventListener('click', () => {
            
            filterInput.value = '';
            characterListController.search('');
        });

        document.getElementById('prev-page').addEventListener('click', async () => {
            showLoadingSpinner();
            await characterListController.prevPage();
            hideLoadingSpinner();
        });

        document.getElementById('next-page').addEventListener('click', async () => {
            showLoadingSpinner();
            await characterListController.nextPage();
            hideLoadingSpinner();
        });

        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(card => {
            card.addEventListener('click', (event) => {
                const id = event.currentTarget.getAttribute('data-id');
                window.location.hash = `#/character/${id}`;
            });
        });

        if (hasFocus) {
            filterInput.focus();
        }
    }
};

export default CharacterListView;

