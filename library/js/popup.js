// открытие поп-ап register
const registers = document.querySelectorAll('.register');
const body = document.querySelector('body');
let unlock = true;


registers.forEach((register, i) => {
    
    register.addEventListener('click', event => {   
        openPopUp('.modal-login-wrap');        
        document.querySelector('.drop-menu-auth').classList.remove('open');        
        
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
            console.log(event.target.closest('.modal-register'));
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



//форма Register
const formRegister = document.forms.register;
const EMAIL_REGEXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function validation (form) {  

    const elementsForm = form.querySelectorAll('input');
    let result = true;

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
}

formRegister.addEventListener('submit', event => {

    event.preventDefault();

    if (validation(event.target)) {
        //сабмит формы в localstorage
        console.log('ok');  
    }
});