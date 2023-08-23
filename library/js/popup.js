// открытие поп-ап register
const registers = document.querySelectorAll('.register');
const body = document.querySelector('body');

let unlock = true;

registers.forEach((register, i) => {
    
    register.addEventListener('click', event => {   
        openPopUp('.modal-login-wrap');        
        document.querySelector('.drop-menu-noauth').classList.remove('open');        
        
    });    
});

// закрытие поп-ап register
document.querySelector('#close-register').addEventListener('click', event => {
    closePopUp('.modal-login-wrap');  
    event.preventDefault();  
});

function openPopUp(popUp) {

    if (popUp && unlock) {
    const popupActive = document.querySelector('.modal-login-wrap.open');   
        if (popupActive) {
            closePopUp(popUp, false);
        } else {
            bodyLock();
        }
        document.querySelector(popUp).classList.add('open');

        document.querySelector('.modal-login-wrap').addEventListener('click', event => {
              if (!event.target.closest('.modal-register') && event.target.closest('.modal-register') !== null) {
                closePopUp('.modal-login-wrap');
            }
        });          
    }     
}

function closePopUp(popUp, doUnlock = true) {
    if (unlock) {
        document.querySelector(popUp).classList.remove('open');
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



