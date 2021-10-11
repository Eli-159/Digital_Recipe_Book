// Waits for the page to load.
document.addEventListener('DOMContentLoaded', () => {
    setSearchBarEventListeners();
});

const setSearchBarEventListeners = () => {
    const searchBar = document.getElementById('searchBar');
    document.addEventListener('keypress', event => {
        if (event.code == 'Enter' && event.target.id == searchBar.id) {
            const searchTerm = encodeURI(searchBar.value);
            window.location.href = '?query=' + searchTerm + '&#search';
        }
    });
}