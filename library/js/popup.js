// открытие поп-ап register
const registers = document.querySelectorAll('.register');
const logins = document.querySelectorAll('.login');
const profiles = document.querySelectorAll('.profile');
const body = document.querySelector('body');

let unlock = true;

registers.forEach((register, i) => {
    
    register.addEventListener('click', event => {   
        const currentPopUp = document.querySelector('#modal-register-popup');
        openPopUp(currentPopUp);     
        event.preventDefault();   
        document.querySelector('.drop-menu-noauth').classList.remove('open');        
        
    });    
});

logins.forEach((login, i) => {
    
    login.addEventListener('click', event => {   
        const currentPopUp = document.querySelector('#modal-login-popup');
        openPopUp(currentPopUp);  
        event.preventDefault();       
        document.querySelector('.drop-menu-noauth').classList.remove('open');        
        
    });    
});

profiles.forEach((profile, i) => {
    
    profile.addEventListener('click', event => {   
        const currentPopUp = document.querySelector('#modal-profile-popup');
        openPopUp(currentPopUp);  
        event.preventDefault();       
        document.querySelector('.drop-menu-noauth').classList.remove('open');        
        
    });    
});

// закрытие поп-ап register
document.querySelector('.close-register').addEventListener('click', event => {
    closePopUp(event.target.closest('.modal-wrap'));  
    event.preventDefault();  
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



