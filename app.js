const auth = '563492ad6f9170000100000102fa5677eab941859ddd058b60c69acf';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let nextPage;

const fetchApi = async (url) => {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    nextPage = data.next_page;
    return data;
};

const clear = () => {
    gallery.innerHTML = '';
};

const generateGallery = (data) => {
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class='gallery-info'>
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} target="_blank">Download</a>
        </div>
        <a href=${photo.src.original} target="_blank">
        <img src=${photo.src.large}></img>
        </a>`;
        gallery.appendChild(galleryImg);
    });
};

const curatedPhotos = async () => {
    const data = await fetchApi(
        'https://api.pexels.com/v1/curated?per_page=16&page=1'
    );
    generateGallery(data);
};

const searchPhotos = async (query) => {
    const data = await fetchApi(
        `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=1`
    );
    clear();
    searchInput.value = '';
    generateGallery(data);
};

const loadMore = async () => {
    const data = await fetchApi(nextPage);
    generateGallery(data);
};

// Event Handlers
searchInput.addEventListener('input', (e) => {
    searchValue = e.target.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

// ................................... //

curatedPhotos();
