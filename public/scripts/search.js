
function filterCampgrounds(query) {
    const campgroundItems = document.querySelectorAll('.campground-item');

    campgroundItems.forEach(item => {
        const title = item.querySelector('.card-title').innerText.toLowerCase();
        const description = item.querySelector('.card-text').innerText.toLowerCase();
        const location = item.querySelector('.text-muted').innerText.toLowerCase();


        if (title.includes(query) || description.includes(query) || location.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    filterCampgrounds(query);
});