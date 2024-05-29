export function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<img src="https://static1.squarespace.com/static/570413982eeb8114b6631016/59cffa294c0dbf7579528461/59cffc5937c5819421e5d541/1506803258457/Portal.gif" alt="Loading...">';
    document.body.appendChild(spinner);
}

export function hideLoadingSpinner() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}
