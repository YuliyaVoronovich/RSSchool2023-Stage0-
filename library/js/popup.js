const body = document.querySelector('body');
const registers = document.querySelectorAll('.register');
const logins = document.querySelectorAll('.login');
const profiles = document.querySelectorAll('.profile');
const buys = document.querySelectorAll('.btn-buy');
const closes = document.querySelectorAll('.close-icon');


let unlock = true;

registers.forEach((register, i) => {
    
    register.addEventListener('click', event => {   
        const currentPopUp = document.querySelector('#modal-register-popup');
        openPopUp(currentPopUp);     
        document.querySelector('.drop-menu-noauth').classList.remove('open');        
        
    });    
});

logins.forEach((login, i) => {
    
    login.addEventListener('click', event => {   
        const currentPopUp = document.querySelector('#modal-login-popup');
        openPopUp(currentPopUp);    
        document.querySelector('.drop-menu-noauth').classList.remove('open');        
        
    });    
});

profiles.forEach((profile, i) => {
    
    profile.addEventListener('click', event => {   
        const currentPopUp = document.querySelector('#modal-profile-popup');
        openPopUp(currentPopUp);
        if (activeCardNumber) {
          document.querySelector('.card-info-number').innerHTML = activeCardNumber;   
        }     
        if (activeProfile) {
            document.querySelector('.modal-profile-initials').innerHTML = activeProfile.name[0] + ' ' + activeProfile.surname[0];
            document.querySelector('.modal-profile-name').innerHTML = activeProfile.name.toLowerCase() + ' ' + activeProfile.surname.toLowerCase();  
          }    
        document.querySelector('.drop-menu-auth').classList.remove('open');        
        
    });    
});

buys.forEach((buy, i) => {
    
    buy.addEventListener('click', event => { 
        console.log(activeProfile.subscription);
        if (activeProfile) {
            if (!activeProfile.subscription) {
                const currentPopUp = document.querySelector('#modal-buy-popup');
                openPopUp(currentPopUp); 
            } else {
                buy.classList.add("btn-own");
                buy.innerHTML = "Own";
                //добавить книгу в массив профиля в локалсторидж
            }            
        } else {
            const currentPopUp = document.querySelector('#modal-login-popup');
            openPopUp(currentPopUp); 
        }            
        
    });    
});
// закрытие поп-ап

closes.forEach((close, i) => {
    close.addEventListener('click', event => {
        closePopUp(event.target.closest('.modal-wrap'));  
        event.preventDefault();  
    });
});

function openPopUp(popUp) {

    if (popUp && unlock) {
    const popupActive = document.querySelector('.modal-wrap.open');   
        if (popupActive) {
            closePopUp(popupActive, false);
        } else {
            bodyLock();
        }
        popUp.classList.add('open');

        popUp.addEventListener('click', event => {
              if (!event.target.closest('.modal-content')) {
                closePopUp(event.target.closest('.modal-wrap'));
            }
        });          
    }     
}

function closePopUp(popUp, doUnlock = true) {
    if (unlock) {
        popUp.classList.remove('open');
        if(doUnlock) {
            bodyUnlock();
        }
    }    
}

function  bodyLock() {
    body.style.paddingRight = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    body.classList.add('body-overflow');
}

function  bodyUnlock() {
    body.style.paddingRight = '0px';
    body.classList.remove('body-overflow');
}



