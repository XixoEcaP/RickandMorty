import RickAndMortyService from '../service/rickAndMortyService.js';
import CharacterListView from '../view/characterListView.js';
import { showLoadingSpinner, hideLoadingSpinner } from '../util/spinner.js';

const characterListController = {
    currentPage: 1,
    charactersPerPage: 8,
    allCharacters: [],
    filteredCharacters: [],
    currentSearchTerm: '',

    init: async (page = 1) => {
        showLoadingSpinner();
        characterListController.currentPage = parseInt(page, 10) || 1;
        try {
            document.body.classList.add('character-list-view');
            document.body.classList.remove('character-view');
            if (characterListController.allCharacters.length === 0) {
                characterListController.allCharacters = await RickAndMortyService.getAllCharacters();
            }
            characterListController.applySearchFilter();
            characterListController.renderPage(characterListController.currentPage);
        } catch (error) {
            console.error(error);
        } finally {
            hideLoadingSpinner();
        }
    },

    search: (searchTerm) => {
        showLoadingSpinner();
        characterListController.currentSearchTerm = searchTerm;
        characterListController.applySearchFilter();
        characterListController.renderPage(1);
        hideLoadingSpinner();
    },

    applySearchFilter: () => {
        if (characterListController.currentSearchTerm) {
            characterListController.filteredCharacters = characterListController.allCharacters.filter(character =>
                character.name.toLowerCase().includes(characterListController.currentSearchTerm.toLowerCase())
            );
        } else {
            characterListController.filteredCharacters = characterListController.allCharacters;
        }
    },

    getCurrentSearchTerm: () => {
        return characterListController.currentSearchTerm;
    },

    renderPage: (page) => {
        characterListController.currentPage = page;
        const startIndex = (page - 1) * characterListController.charactersPerPage;
        const endIndex = startIndex + characterListController.charactersPerPage;
        const charactersToRender = characterListController.filteredCharacters.slice(startIndex, endIndex);
        const totalPages = Math.ceil(characterListController.filteredCharacters.length / characterListController.charactersPerPage);
        CharacterListView.render(charactersToRender, characterListController.currentPage, totalPages);
        window.location.hash = `#/${page}`;
        hideLoadingSpinner();
    },

    nextPage: () => {
        const totalPages = Math.ceil(characterListController.filteredCharacters.length / characterListController.charactersPerPage);
        if (characterListController.currentPage < totalPages) {
            const nextPage = characterListController.currentPage + 1;
            characterListController.renderPage(nextPage);
        }
    },

    prevPage: () => {
        if (characterListController.currentPage > 1) {
            const prevPage = characterListController.currentPage - 1;
            characterListController.renderPage(prevPage);
        }
    }
};

export default characterListController;

