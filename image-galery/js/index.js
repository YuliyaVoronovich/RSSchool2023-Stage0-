const URL = 'https://api.unsplash.com/search/photos';
const KEY = 'yaQ7ydsJ2lF3tYD6evKdJNpjw8RLGInYmnqO2_IMje8';

const gallery = document.querySelector(".gallery-list");

const query = 'baby';
const page = 0;

async function getData() {
    const url = `${URL}?query=${query}&page=${page}&per_page=50&orientation=landscape&client_id=${KEY}`;
    const response = await fetch(url);
    const data = await response.json();
   
    showData(data);
}

function showData(data) {
    let picture = '';
    data.results.map((element) => {
         picture += `<li class="gallery-item" data-picture="${element.urls.full}">
          <img src="${element.urls.regular}" alt="${element.alt_description}" loading="lazy">          
        </li>`;
    });
    console.log(picture);
    gallery.innerHTML = picture;
}

getData();