const HelloView = {
    render: () => {
        const app = document.getElementById('app');
        app.innerHTML = '<h1>Hello, Rick and Morty!</h1>';
    }
};

export default HelloView;
