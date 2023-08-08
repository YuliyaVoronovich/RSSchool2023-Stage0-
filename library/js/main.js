document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('burger').addEventListener('click', function() {    
        document.querySelector('.header').classList.toggle('open');
        document.querySelector('body').classList.toggle('body-overflow');
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
    document.querySelector('body').classList.remove('body-overflow');
});

// Код для закрытия меню при нажатии на ссылку
const links = Array.from(document.getElementById('nav-list').children);

// Для каждого элемента меню при клике вызываем ф-ию
 links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

// // Закрытие попапа при клике на меню
function closeOnClick() {
     document.querySelector('.header').classList.remove('open');
     document.querySelector('body').classList.remove('body-overflow');
 }