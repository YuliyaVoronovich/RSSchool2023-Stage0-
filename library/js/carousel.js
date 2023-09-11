/*Carousel*/
let slideToShow;
let positionPadding;
let position = 0;
let itemWidth = 0;
let movePosition = 0;
let counter = 0;
let currentDataItem = '';    
const container = document.querySelector('.about-pictures');
const track = document.querySelector('.about-list');
const item = document.querySelector('.about-item');
const items = document.querySelectorAll('.about-item');
const buttons = document.querySelectorAll('.carousel-item');
const buttonList = document.querySelector('.carousel-list');
let currentButton = buttonList.firstElementChild;
const nextArrow = document.querySelector('.about-button-right');
const prevArrow = document.querySelector('.about-button-left');

document.addEventListener('DOMContentLoaded', reportWindowSize());

window.onresize = function(event) {
    reportWindowSize ();
};    

items.forEach((item) => {
     item.style.minWidth = `${itemWidth}px`;
}); 

function reportWindowSize ()  {
    let widthWind = document.querySelector('body').offsetWidth;

    if (widthWind < 1000) {
        slideToShow = 1;
        positionPadding = 0;
        calcutateStartParams();
     } else if (widthWind >= 1000 && widthWind < 1423) {
         slideToShow = 2;
         positionPadding = 25;
         calcutateStartParams();
    }  else {
        slideToShow = 3;
        positionPadding = 25;
        calcutateStartParams();
    }
};

function calcutateStartParams() {

    itemWidth = (container.clientWidth - 2*positionPadding) / slideToShow;
    movePosition = itemWidth + positionPadding;
    position = 0;
    counter = 0;
    currentDataItem = 'item-1';
    track.style.transform = `translateX(0)`;

    removeActiveButton(currentButton);

    currentButton = buttonList.firstElementChild;
    chooseActiveButton(currentButton);
    chooseNoActiveArrow(prevArrow); 
    
}

function switchUp (stepMovePosition = 1) {

    position +=(movePosition * stepMovePosition);
    track.style.transform = `translateX(-${position}px)`;
}

function switchDown (stepMovePosition = -1) {

    position -=(movePosition * -stepMovePosition);  
    track.style.transform = `translateX(-${position}px)`;
}

function chooseNoActiveArrow(arrow) {
    arrow.style.pointerEvents = "none";
    arrow.querySelector('path').style.stroke = "grey";
}

function removeNoActiveArrow(arrow) {
    arrow.style.pointerEvents = "";
    arrow.querySelector('path').style.stroke = "black";
}

function chooseActiveArrow(arrow) {
    arrow.querySelector('path').style.stroke = '#bb945f';
}

function chooseActiveButton(button) {
    button.querySelector('.carousel-button').style.color = '#bb945f';
    button.querySelector('.carousel-button').style.background = '#bb945f';
    button.querySelector('.carousel-button').style.pointerEvents = "none";
}

function removeActiveButton(button) {
    button.querySelector('.carousel-button').style.color = '#000000';
    button.querySelector('.carousel-button').style.background = '#000000';
}

buttons.forEach((button) => {
    
    button.addEventListener ('click', event => {

        const dataItem = button.dataset.item;        
        const stepMovePosition = parseInt(parseInt(dataItem.match(/\d+/) - currentDataItem.match(/\d+/)));

        if (parseInt(dataItem.match(/\d+/)) !== parseInt(currentDataItem.match(/\d+/)) ) {
            chooseActiveButton(button);
            removeActiveButton(currentButton);
        }

        if (currentDataItem < dataItem)  {
            switchUp (stepMovePosition);
            removeNoActiveArrow(prevArrow);    
            chooseActiveArrow(nextArrow);   
            if (parseInt(dataItem.match(/\d+/)) === items.length) chooseNoActiveArrow(nextArrow); 

            counter+=stepMovePosition;
        } else {
            switchDown (stepMovePosition);
            removeNoActiveArrow(nextArrow);   
            chooseActiveArrow(prevArrow);  
            if (parseInt(dataItem.match(/\d+/)) === 1) chooseNoActiveArrow(prevArrow); 

            counter-=-stepMovePosition;        
        } 
        currentDataItem = dataItem;
        currentButton = button;
    });
});

nextArrow.addEventListener ('click',  event => {     
   
    removeNoActiveArrow(prevArrow);   
    chooseActiveArrow(nextArrow);
    
    counter++;
    if (counter === items.length-1) chooseNoActiveArrow(nextArrow);
    switchUp ();

    /*связать с кнопками*/
    currentDataItem = buttons[counter].dataset.item; 
    currentButton = buttons[counter];
    chooseActiveButton(buttonList.children[counter]);
    removeActiveButton(buttonList.children[counter - 1]);
    
});

prevArrow.addEventListener ('click',  event => { 

    removeNoActiveArrow(nextArrow);
    chooseActiveArrow(prevArrow);

    counter--;
      if (counter === 0)  chooseNoActiveArrow(prevArrow);
    switchDown ();

    /*связать с кнопками*/
    currentDataItem = buttons[counter].dataset.item; 
    currentButton = buttons[counter];
    chooseActiveButton(buttonList.children[counter]);
    removeActiveButton(buttonList.children[counter + 1]);

    
});

/*End Carousel*/