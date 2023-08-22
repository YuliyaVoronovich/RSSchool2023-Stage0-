document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('burger').addEventListener('click', function() {    

        document.querySelector('.header').classList.toggle('open');
        document.querySelector('body').classList.toggle('body-overflow');

        document.querySelector('.drop-menu-auth').classList.remove('open');
        
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
    document.querySelector('.drop-menu-auth').classList.toggle('open');
});

document.querySelector('.profile-icon').addEventListener('click', event => {
    event._isClickProfile = true;
});
document.querySelector('.drop-menu-title').addEventListener('click', event => {
    event._isClickProfile = true;
});
document.querySelector('.drop-menu-list').addEventListener('click', event => {
    event._isClickProfile = true;
});
document.body.addEventListener('click', event => {
    if (event._isClickProfile) return;

    document.querySelector('.drop-menu-auth').classList.remove('open');
});


//кнопка Check the card
document.querySelector('#button-check-card').addEventListener('click', event => {
    event.preventDefault();

    console.log(event.target);

    return false;
 
});