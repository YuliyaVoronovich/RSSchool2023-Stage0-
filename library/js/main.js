const ACTIVE = 'active';
let activeProfile = '';
let activeCardNumber = '';
let activeProfileMenu = '.drop-menu-noauth';

const visiteds = document.querySelectorAll('.item-count-visited');

let books = 0;

let _isClickProfile = false;

window.onload= function(event) {

   activeCardNumber = localStorage.getItem(ACTIVE);
   activeProfile = getProfile (activeCardNumber);

    if (activeProfile) {
        showProfileIcon();
        showProfileMenu();
        changeInfoCard();
    }   
};   

function getProfile (card = '') {
   
    if (card) {
        profile = localStorage.getItem(card);
        return JSON.parse(profile);
    }        
    return;
}

document.querySelector('.logout').addEventListener("click", logout);

function logout() {

    localStorage.removeItem(ACTIVE);
    activeProfile = getProfile ();
    showProfileMenu();
    showProfileIcon();
    changeInfoCard();
}

//бургер-меню
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
    if (event._isClickProfile) return;

    document.querySelector(activeProfileMenu).classList.remove('open');
});

//формы
const formLogin = document.forms.login_form;
const formRegister = document.forms.register_form;
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
            if (element.name === 'email' && seardhProfileOfEmail(element.value)) {
                text = 'this email already exists';
                createError(element, text);
                result = false;
            };
            if (element.name === 'card_number_email' && !seardhProfileOfEmail(element.value)
                && !seardhProfileOfCard(element.value)) {//для логин
                text = 'profile not registered';
                createError(element, text);
                result = false;
            };
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

formLogin.addEventListener('submit', event => {

    event.preventDefault();
    let result = false;

    if (validation(event.target)) {
   
        const formData = new FormData(formLogin);
        const cardNumberOrEmail = formData.get('card_number_email');
        const password = formData.get('password');

        const profile = getProfile(cardNumberOrEmail);//поиск по номеру карты

        if (profile && profile.password === password) {

            localStorage.setItem('active', cardNumberOrEmail);
            activeProfile = profile;
            activeCardNumber = cardNumberOrEmail;

            result = true;
        } else {
            //поиск по email
            let keys = Object.keys(localStorage);
                for(let key of keys) {   

                    const profileJson = JSON.parse(localStorage.getItem(key));

                    if (profileJson.hasOwnProperty("email")) {
                        if (profileJson.email === cardNumberOrEmail && profileJson.password === password)  {
    
                            localStorage.setItem('active', profileJson.card);
                            activeProfile = profileJson;
                            activeCardNumber = profileJson.card; 
                              
                            result = true;                       
                        }        
                    }                     
             }
        }        
    }  
    if (result) {
        showProfileMenu();
        showProfileIcon();
        changeInfoCard();
        countVisited();   
        closePopUp(document.querySelector('#modal-login-popup'));
    }
    return result; 
    
});

function seardhProfileOfEmail (email = "", item = '') {
    //поиск по email
    let keys = Object.keys(localStorage);
    let result = null;
    for(let key of keys) {   

        const profileJson = JSON.parse(localStorage.getItem(key));
        
        if (profileJson.hasOwnProperty("email")) { 
     
            if (profileJson.email === email)  {
                result = profileJson;                       
            }
        }                     
    }
    return result;
}
function seardhProfileOfCard(card = "") {
    //поиск по email
    let keys = Object.keys(localStorage);
    let result = null;
    for(let key of keys) {   

        const profileJson = JSON.parse(localStorage.getItem(key));
        
        if (profileJson.hasOwnProperty("card")) {     
            if (profileJson.card === card)  {
                result = profileJson;                       
            }
        }                     
    }
    return result;
}

function saveToLocalStorage (form) {

    const formData = new FormData(form);
    // теперь можно извлечь данные
    const name = formData.get('name').toLowerCase().trim();
    const surname = formData.get('surname').toLowerCase().trim();
    const email = formData.get('email');  
    const password = formData.get('password');
    const activeCardNumber = [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();

    activeProfile = {"card":activeCardNumber, "name":name, "surname":surname, "email":email, "password":password, "visited": 1, "books":[], "bonuses": 1250, "subscription":false};

    //проверить на почту существующую
    localStorage.setItem(activeCardNumber, JSON.stringify(activeProfile));
    localStorage.setItem('active', activeCardNumber);

    showProfileMenu();
    showProfileIcon();
    changeInfoCard();
    closePopUp(document.querySelector('#modal-register-popup'));       
}

function  showProfileIcon() {

    const icon = document.querySelector('.profile-icon');

    if (activeProfile) {
        const nameFirstLetter = activeProfile.name[0].toUpperCase();
        const surnameFirstLetter = activeProfile.surname[0].toUpperCase();       
        icon.innerHTML = `<svg height="28" width="28">
        <circle cx="14" cy="14" r="50%" fill="white"></circle>
        <text x="4" y="20" fill="#BB945F" font-size="15px">${nameFirstLetter}${surnameFirstLetter}</text>
        </svg>`;
        icon.title = activeProfile.name +' '+activeProfile.surname;  
    } else {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM18.6667 7.77778C18.6667 10.3551 16.5774 12.4444 14.0001 12.4444C11.4227 12.4444 9.33339 10.3551 9.33339 7.77778C9.33339 5.20045 11.4227 3.11111 14.0001 3.11111C16.5774 3.11111 18.6667 5.20045 18.6667 7.77778ZM19.4998 16.2781C20.9584 17.7367 21.7778 19.715 21.7778 21.7778H14L6.22225 21.7778C6.22225 19.715 7.0417 17.7367 8.50031 16.2781C9.95893 14.8194 11.9372 14 14 14C16.0628 14 18.0411 14.8194 19.4998 16.2781Z" fill="white"/>
        </svg>`;
        icon.title = '';  
    }     
}

function  showProfileMenu () {

    document.querySelector(activeProfileMenu).classList.remove('open');
    activeProfileMenu = (activeProfile) ? '.drop-menu-auth': '.drop-menu-noauth';

    if (activeCardNumber) {
        document.querySelector('.menu-profile').innerHTML = activeCardNumber;
        document.querySelector('.menu-profile').style.fontSize = '12px'; 
    }    
}

function countVisited() {

    if (activeProfile) {
        activeProfile.visited +=1;
        localStorage.setItem(activeCardNumber, JSON.stringify(activeProfile));
        changeInfoCard();
    }
   
}

// digital cards
const formCard = document.forms.formcard;
formCard.addEventListener('submit', event => {

    event.preventDefault();    
    getProfileCard (formCard);
    
});

function getProfileCard (form) {

    const formData = new FormData(form);
    const nameProfile = formData.get('nameProfile').toUpperCase().trim();
    const cardProfile = formData.get('cardProfile');
    const nameProfileArray = nameProfile.split(" ");

    profile = getProfile(cardProfile);
    if (profile) {
        if (profile.name === nameProfileArray[0] && profile.surname === nameProfileArray[1]) {

            document.querySelector('#button-check-card').style.display='none';
            document.querySelector('.profile-info-card').style.display='flex';
    
            showInfoCard();
            setTimeout(() => {   
                hiddenInfoCard();
            }, 10000);        
        } 
    }              
}

function changeInfoCard() {
    if (activeProfile) {
        showInfoCard();
    } else hiddenInfoCard();   
}

function showInfoCard() {

    
    if (activeProfile) {
        document.querySelector('[name="nameProfile"]').value = activeProfile.name;
        document.querySelector('[name="cardProfile"]').value = activeProfile.surname;
        document.querySelector('.card-reader').style.display='none';
        document.querySelector('.card-reader-login').style.display='flex';

        document.querySelector('#button-check-card').style.display='none';
        document.querySelector('.profile-info-card').style.display='flex';
        visiteds.forEach((visited, i) => {
            visited.innerHTML = activeProfile.visited;   
        });
 
    }   
}

function hiddenInfoCard() { 
    document.querySelector('#button-check-card').style.display='block';
    document.querySelector('.profile-info-card').style.display='none';
    document.querySelector('[name="nameProfile"]').value='';
    document.querySelector('[name="cardProfile"]').value='';
    document.querySelector('.card-reader').style.display='flex';
    document.querySelector('.card-reader-login').style.display='none';
}

