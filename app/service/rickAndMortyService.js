const RickAndMortyService = {
    baseURL: 'https://rickandmortyapi.com/api',

    fetch: async (endpoint) => {
        const response = await fetch(`${RickAndMortyService.baseURL}/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    },

    getAllCharacters: async () => {
        let allCharacters = [];
        let page = 1;
        let data;
        
        do {
            data = await RickAndMortyService.fetch(`character?page=${page}`);
            allCharacters = allCharacters.concat(data.results);
            page++;
        } while (data.info.next);

        return allCharacters;
    },

    getCharacterById: async (id) => {
        const data = await RickAndMortyService.fetch(`character/${id}`);
        return data;
    }
};

export default RickAndMortyService;
