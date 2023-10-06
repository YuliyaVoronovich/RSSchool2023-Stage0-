//modal windows
const body = document.querySelector('body');
let unlock = true;
let isCloseOnClickBody = true;

// закрытие поп-ап

// closes.forEach((close, i) => {
//   close.addEventListener('click', event => {
//       closePopUp(event.target.closest('.modal-wrapper'));  
//       event.preventDefault();  
//   });
// });

function openPopUp(popUp) {

 if (popUp && unlock) {
   const popupActive = document.querySelector('.modal-wrapper.open');   
     if (popupActive) {
         closePopUp(popupActive, false);
     } else {
         bodyLock();
     }
     popUp.classList.add('open');

     if (isCloseOnClickBody) {
       popUp.addEventListener('click', event => {
           if (!event.target.closest('.modal-content')) {
             closePopUp(event.target.closest('.modal-wrapper'));
         }
     });   
     }
             
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
