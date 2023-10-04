const records = document.querySelector('.records');
const settings = document.querySelector('.settings');
const about = document.querySelector('.about');

const recordTableBody = document.querySelector('tbody');

let currentPopUp = null;

records.addEventListener('click', (event) => {
    currentPopUp = document.querySelector('#modal-login-records');
    isCloseOnClickBody = true;
    openPopUp(currentPopUp); 
    showRecords();
 });

 function showRecords() {
    let usersArray = localStorage.getItem('users');
    if (usersArray) {
        JSON.parse(usersArray);
        recordTableBody.innerHTML = '';
        JSON.parse(usersArray).slice(0,10).forEach((user) => {
            const elementTr = document.createElement('tr');
            recordTableBody.appendChild(elementTr);
            const elementTdName = document.createElement('td');
            elementTdName.innerHTML = user.name;
            const elementTdScore = document.createElement('td');
            elementTdScore.innerHTML = user.score;
            const elementTdTime = document.createElement('td');
            elementTdTime.innerHTML = user.time;
            elementTr.appendChild(elementTdName);
            elementTr.appendChild(elementTdScore);
            elementTr.appendChild(elementTdTime);
        });
    }
    console.log(usersArray);
 }