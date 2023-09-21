const URL = 'https://api.unsplash.com/search/photos';
const KEY = 'yaQ7ydsJ2lF3tYD6evKdJNpjw8RLGInYmnqO2_IMje8';

const gallery = document.querySelector(".gallery-list");
const form = document.querySelector(".form-search");
const ownName = document.querySelector(".own-name");
let searchInput = document.querySelector(".input-search");

let queryDefault = 'random';
const page = 0;

async function getData(query = queryDefault) {
    const url = `${URL}?query=${query}&page=${page}&per_page=50&orientation=landscape&client_id=${KEY}`;
    const response = await fetch(url);
    const data = await response.json();
   
    showData(data.results);
}

async function getDataCollection(username, name) {
    const url1 = `https://api.unsplash.com/users/${username}/photos?page=${page}&per_page=50&orientation=landscape&client_id=${KEY}`;
    searchInput.value = name;
    const response = await fetch(url1);
    const data = await response.json();
   
    showData(data);
} 
function showData(data) {
    let picture = '';
    data.map((element) => {
         picture += `<li class="gallery-item" data-picture="${element.urls.full}">
          <img src="${element.urls.regular}" alt="${element.alt_description}" loading="lazy">
            <div class="image-info">
                <div class="own-name" onclick="getDataCollection('${element.user.username}', '${element.user.name}')">${element.user.name}</div>
                <div class="own-likes">
                    <span class="material-symbols-outlined icon-likes">favorite</span>${element.likes}
                </div>
            </div>          
        </li>`;
    });
    gallery.innerHTML = picture;
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const search = formData.get('search');
    if (search) {
        query = search;
    } else  query = queryDefault;

    getData(query);
});


getData();