const URL = 'https://api.unsplash.com/';
const KEY = 'yaQ7ydsJ2lF3tYD6evKdJNpjw8RLGInYmnqO2_IMje8';


const gallery = document.querySelector(".gallery-list");
const form = document.querySelector(".form-search");
const ownName = document.querySelector(".own-name");
let searchInput = document.querySelector(".input-search");
let buttonCross = document.querySelector(".button-cross");
const load = document.querySelector(".load");

let page = 1;
let query = 'random';
const timeout = 400;
let url = '';
let data;
let username = '';
let name = '';

async function getData(query, username, name) {

    if (username != '') {
        url = `${URL}users/${username}/photos?page=${page}&per_page=30&orientation=landscape&order_by=views&client_id=${KEY}`;
        searchInput.value = name;
        const response = await fetch(url);
        data = await response.json();
    } else {
        url = `${URL}search/photos?query=${query}&page=${page}&per_page=50&orientation=landscape&client_id=${KEY}`;
        const response = await fetch(url);
        data = await response.json();
        data = data.results;
    }
   
    if (page > 1) {
        return data;
    } else {
       showData(data); 
    }
}
function showData(data) {
    data.map((element) => {
        const elementLi = document.createElement('li');
        elementLi.classList.add('gallery-item');

        const image = document.createElement('img');
        image.src = `${element.urls.regular}`;
        image.alt = `${element.alt_description}`;
        image.loading = "lazy";
        elementLi.append(image);

        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');
        elementLi.append(imageInfo);

        const OwnName = document.createElement('div');
        OwnName.classList.add('own-name');
        OwnName.dataset.username = `${element.user.username}`;
        OwnName.textContent = `${element.user.name}`;
        imageInfo.append(OwnName);

        const OwnLikes = document.createElement('div');
        OwnLikes.classList.add('own-likes');
        imageInfo.append(OwnLikes);       

        const iconLikes = document.createElement('span');
        iconLikes.classList.add('material-symbols-outlined');
        iconLikes.classList.add('icon-likes');
        iconLikes.textContent = "favorite";
        OwnLikes.append(iconLikes);
        OwnLikes.append(`${element.likes}`);
       
        gallery.appendChild(elementLi);
     
    });
    showButtonCross ();
}
function clearElements () {

    let items = document.querySelectorAll(".gallery-item");
    for (let i=0; i< items.length; i++) {
        gallery.removeChild(items[i]);
    }
}

function showButtonCross () {
    if (searchInput.value !=='') {
        buttonCross.classList.add('show');
    } else {
        buttonCross.classList.remove('show');
    }
}

form.addEventListener('submit', event => {
    
    event.preventDefault();
    page = 1;

    const formData = new FormData(form);
    const search = formData.get('search');
    if (search) {
        query = search;
    } else  query = 'random';

    clearElements();
    getData(query, username = '', name= '');
});

buttonCross.addEventListener('click', event => {

    event.preventDefault();
    searchInput.value = '';
    username = '', 
    name= '';
    showButtonCross();
   // getData();
});

// searchInput.addEventListener('change', event => {

//     if (event.target.value === '') {
//         clearElements();
//         page = 1;
//         getData();
//     }    
// });

window.addEventListener('scroll', async () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight-1) {
        //показать загрузку а потом отображение след картинок
        load.classList.add('show');
        page +=1;
        data = await getData(query, username, name);

        setTimeout (() => {           
            showData(data);
            load.classList.remove('show');
          }, timeout);
 
    }
});

gallery.addEventListener('click', event => {
    if (event.target.classList.contains('own-name')) {
        page = 1;
        window.scrollTo(0,0);
        username = event.target.dataset.username;
        name = event.target.innerHTML;

        clearElements();
        getData(query, event.target.dataset.username, name);
      }
    
});

function showReviewToConsole() {
 console.log (`1. Вёрстка +10
    на странице есть несколько фото и строка поиска +5
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
 2. При загрузке приложения на странице отображаются полученные от API изображения +10
 3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
 4. Поиск +30
    при открытии приложения курсор находится в поле ввода +5
    есть placeholder +5
    автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
    поисковый запрос можно отправить нажатием клавиши Enter +5
    после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
    в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
 5. Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
    1. инфинити скролл
    2. наведение на изображение отображает его автора и кол-во лайков
    3. клик на имя автора подгружает на страницу его фотографии
\n
score: 60`);
}
document.addEventListener('DOMContentLoaded', async () => {
    getData(query, username, name);
    showReviewToConsole(); 
});


