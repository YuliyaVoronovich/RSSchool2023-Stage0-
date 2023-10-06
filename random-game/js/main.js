const records = document.querySelector('.records');
const settings = document.querySelector('.settings');
const about = document.querySelector('.about');
const deleteIcons = document.querySelectorAll('.img-delete');

const recordTableBody = document.querySelector('tbody');

let currentPopUp = null;

records.addEventListener('click', (event) => {
    currentPopUp = document.querySelector('#modal-records');
    isCloseOnClickBody = true;
    openPopUp(currentPopUp); 
    showRecords();
 });

 about.addEventListener('click', (event) => {
    currentPopUp = document.querySelector('#modal-about');
    isCloseOnClickBody = true;
    openPopUp(currentPopUp); 
    showAbout();
 });

 deleteIcons.forEach((deleteIcon, i) => {
    deleteIcon.addEventListener('click', event => {
        closePopUp(event.target.closest('.modal-wrapper'));  
        event.preventDefault();  
    });
});

 function showRecords() {
    let usersArray = localStorage.getItem('users-random-game');
    if (usersArray) {
        JSON.parse(usersArray);
        recordTableBody.innerHTML = '';
        JSON.parse(usersArray).reverse().slice(0,10).forEach((user) => {
            const elementTr = document.createElement('tr');
            recordTableBody.appendChild(elementTr);
            const elementTdName = document.createElement('td');
            elementTdName.innerHTML = user.name;
            const elementTdScore = document.createElement('td');
            elementTdScore.innerHTML = user.score;
            const elementTdTime = document.createElement('td');
            elementTdTime.innerHTML = user.time;
            const elementTdLevel = document.createElement('td');
            elementTdLevel.innerHTML = user.level;
            elementTr.appendChild(elementTdName);
            elementTr.appendChild(elementTdScore);
            elementTr.appendChild(elementTdTime);
            elementTr.appendChild(elementTdLevel);
        });
    }
 }

 function  showAbout() {
    
 }