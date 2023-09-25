const URL = 'https://api.unsplash.com/search/photos';
const KEY = 'yaQ7ydsJ2lF3tYD6evKdJNpjw8RLGInYmnqO2_IMje8';

const gallery = document.querySelector(".gallery-list");
const form = document.querySelector(".form-search");
const ownName = document.querySelector(".own-name");
let searchInput = document.querySelector(".input-search");
let buttonCross = document.querySelector(".button-cross");

let queryDefault = 'random';
const page = 0;

async function getData(query = queryDefault) {
    const url = `${URL}?query=${query}&page=${page}&per_page=50&orientation=landscape&client_id=${KEY}`;
    const response = await fetch(url);
    const data = await response.json();
   
    showData(data.results);
}

async function getDataUsers(username, name) {
    const url1 = `https://api.unsplash.com/users/${username}/photos?page=${page}&per_page=50&orientation=landscape&order_by=views&client_id=${KEY}`;
    searchInput.value = name;
    const response = await fetch(url1);
    const data = await response.json();
   
    showData(data);
} 
function showData(data) {
    let picture = '';

    if (data.length > 0) {
       data.map((element) => {
         picture += `<li class="gallery-item" data-picture="${element.urls.full}">
          <img src="${element.urls.regular}" alt="${element.alt_description}" loading="lazy">
            <div class="image-info">
                <div class="own-name" onclick="getDataUsers('${element.user.username}', '${element.user.name}')">${element.user.name}</div>
                <div class="own-likes">
                    <span class="material-symbols-outlined icon-likes">favorite</span>${element.likes}
                </div>
            </div>          
        </li>`;
    });
     
    } else {
        picture = `Sorry. Nothing found for this request`;
    }
    gallery.innerHTML = picture;
    if (searchInput.value !=='') {
        buttonCross.classList.add('show');
    } else {
        buttonCross.classList.remove('show');
    }
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

buttonCross.addEventListener('click', event => {

    event.preventDefault();
    searchInput.value = '';
   // getData();
});

searchInput.addEventListener('change', event => {

    if (event.target.value === '') {
        getData();
    }
    
});

function showReviewToConsole() {
 console.log (`1. Вёрстка +10;
 \n
 на странице есть несколько фото и строка поиска +5
 в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
 \n
 2. При загрузке приложения на странице отображаются полученные от API изображения +10
 3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
 4. Поиск +30
 \n
 при открытии приложения курсор находится в поле ввода +5
 есть placeholder +5
 автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
 поисковый запрос можно отправить нажатием клавиши Enter +5
 после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
 в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
 5. Lополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
 \n
 наведение на изображение отображает его автора и кол-во лайков
 клик на имя автора подгружает на страницу его фотографии`);
}


getData();
showReviewToConsole();