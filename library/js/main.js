let activeProfile = '';
let activeCardNumber = '';
let activeProfileMenu = '.drop-menu-noauth';
const ACTIVE = 'active';

let visited = 0;
let books = 0;

let _isClickProfile = false;

window.onload= function(event) {

    activeProfile = getActiveProfile ();
    console.log(activeProfile);
    if (activeProfile) {
        showProfileIcon(activeProfile.name, activeProfile.surname);
        showProfileMenu (activeCardNumber);
    }   
};   

function getActiveProfile () {
    activeCardNumber = localStorage.getItem(ACTIVE);
    activeProfile = localStorage.getItem(activeCardNumber);
    
    return JSON.parse(activeProfile);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('burger').addEventListener('click', function() {    

        document.querySelector('.header').classList.toggle('open');
        document.querySelector('body').classList.toggle('body-overflow');

        document.querySelector(activeProfileMenu).classList.remove('open');
        
    })
});

// Закрыть при клике вне меню
document.getElementById('nav').addEventListener('click', event => {
    event._isClickMenu = true;
});
document.getElementById('burger').addEventListener('click', event => {
    event._isClickMenu = true;
});
document.body.addEventListener('click', event => {
   
    if (event._isClickMenu) return;

    document.querySelector('.header').classList.remove('open');
 //   document.querySelector('body').classList.remove('body-overflow');
});

// Код для закрытия меню при нажатии на ссылку
const links = Array.from(document.getElementById('nav-list').children);

// Для каждого элемента меню при клике вызываем ф-ию
 links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

// // Закрытие бургера при клике на меню
function closeOnClick() {
     document.querySelector('.header').classList.remove('open');
     document.querySelector('body').classList.remove('body-overflow');
 }


 // открытие меню авторизации
 document.querySelector('.profile-icon').addEventListener('click', event => {
    document.querySelector(activeProfileMenu).classList.toggle('open');
});

document.querySelector('.profile-icon').addEventListener('click', event => {
    event._isClickProfile = true;
});
const menuTitles = document.querySelectorAll('.drop-menu-title');
menuTitles.forEach((menuTitle,) => {
    menuTitle.addEventListener ('click', event => {
        event._isClickProfile = true;
    });
});
const menuLists = document.querySelectorAll('.drop-menu-list');
menuLists.forEach((menuList) => {
    menuList.addEventListener ('click', event => {
        event._isClickProfile = true;
    });
});
document.body.addEventListener('click', event => {
    console.log(event._isClickProfile);
    if (event._isClickProfile) return;

    document.querySelector(activeProfileMenu).classList.remove('open');
});


//кнопка Check the card
document.querySelector('#button-check-card').addEventListener('click', event => {
    event.preventDefault();

    console.log(event.target);

    return false;
 
});

//форма Register
const formRegister = document.forms.register;
const EMAIL_REGEXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function validation (form) {  

    const elementsForm = form.querySelectorAll('input');
    let result = true;   

    for (const element of elementsForm) {

        removeError(element);

        if (element.value === '') {
            text = 'fill in the empty field';
            createError(element, text);
            result = false;
        } else {
            if (element.name === 'password' && element.value.length < 8)  {
                text = 'password less than 8 characters';
                createError(element, text);
                result = false;
            }
            if (element.name === 'email' && !EMAIL_REGEXP.test(element.value)) {
                text = 'not correct email';
                createError(element, text);
                result = false;
            }
         }
    }    
    return result;

    function createError(element, text) {

        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error');
        errorSpan.textContent = text;
        element.after(errorSpan);        
    }

    function removeError(element) {

        const el = element.nextSibling;           
         if (el.classList) {
            if (el.classList.contains('error')) {
                el.remove();
         }   
        }
    }
}

formRegister.addEventListener('submit', event => {

    event.preventDefault();

    if (validation(event.target)) {
        //сабмит формы в localstorage
        saveToLocalStorage(formRegister); 
    }
});

function saveToLocalStorage (form) {

    const formData = new FormData(form);
    // теперь можно извлечь данные
    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const password = formData.get('password');
    const cardName = [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();

    const profile = {"name":name, "surname":surname, "email":email, "password":password, "visited": 1, "books":0, "bonuses": 1250};

    localStorage.setItem(cardName, JSON.stringify(profile));
    localStorage.setItem('active', cardName);

    showProfileIcon(name, surname);
    closePopUp('.modal-login-wrap');

    showProfileMenu(cardName);
       
}

function  showProfileIcon(name, surname) {

    const nameFirstLetter = name[0].toUpperCase();
    const surnameFirstLetter = surname[0].toUpperCase();

    const icon = document.querySelector('.profile-icon');
    const tooltip = document.querySelector('.tooltiptext');
    icon.innerHTML = `<svg height="28" width="28">
    <circle cx="14" cy="14" r="50%" fill="white"></circle>
    <text x="4" y="20" fill="#BB945F" font-size="15px">${nameFirstLetter}${surnameFirstLetter}</text>
    </svg>`;
    icon.title = name +' '+surname;  

}
function  showProfileMenu (cardName) {

    document.querySelector(activeProfileMenu).classList.remove('open');
    activeProfileMenu = '.drop-menu-auth';

    document.querySelector('.menu-profile').innerHTML = cardName;
    document.querySelector('.menu-profile').style.fontsize = '10px';
}