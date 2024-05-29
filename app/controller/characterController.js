import CharacterView from '../view/characterView.js';
import RickAndMortyService from '../service/rickAndMortyService.js';
import { showLoadingSpinner, hideLoadingSpinner } from '../util/spinner.js';

const characterController = {
    init: async (id) => {
        showLoadingSpinner();
        try {
            document.body.classList.add('character-view');
            document.body.classList.remove('character-list-view');
            const character = await RickAndMortyService.getCharacterById(id);
            CharacterView.render(character);
        } catch (error) {
            console.error(error);
        } finally {
            hideLoadingSpinner();
        }
    }
};

export default characterController;
