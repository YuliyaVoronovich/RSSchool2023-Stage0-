
const fieldGame = document.querySelector('.field-game');
let squares = Array.from(document.querySelectorAll('.field-game div'));
const scoreValue = document.querySelector('.score-value');
const lineValue = document.querySelector('.line-value');
const levelValue = document.querySelector('.level-value');
const timelValue = document.querySelector('.time-value');
const pause = document.querySelector('.pause');
const restart = document.querySelector('.restart');
const formResult = document.querySelector('.form-name');
const modalScore = document.querySelector('.modal-score');
const modalTime = document.querySelector('.modal-time');

const ceil = 10;
const constlineNextLevel = 10;

let isGameOver = false;

const audio = new Audio();
audio.currentTime = 0; 

const audioPlay = new Audio();
audioPlay.currentTime = 0; 

const colors = [
      'yellow',
      'orange',
      'fiolet',
      'green',
      'lightblue',
      'blue'
  ]

let currentPopUp = null;
let nextRandom = 0;
let score = 0;
let line = 0;
let lineLevel = 0;
let lineScore = 0;
let level = 1;
let timeId;//игра
let timerId;//текущее время игры
let time = 1000;
let date = Number(new Date(0));

const firstElement = [
    [1, ceil+1, ceil*2+1, 2],
    [ceil, ceil+1, ceil+2, ceil*2+2],
    [1, ceil+1, ceil*2+1, ceil*2],
    [ceil, ceil*2, ceil*2+1, ceil*2+2]
  ]

  const secondElement = [
    [0,ceil,ceil+1,ceil*2+1],
    [ceil+1, ceil+2,ceil*2,ceil*2+1],
    [0,ceil,ceil+1,ceil*2+1],
    [ceil+1, ceil+2,ceil*2,ceil*2+1]
  ]

  const thirdElement = [
    [1,ceil,ceil+1,ceil+2],
    [1,ceil+1,ceil+2,ceil*2+1],
    [ceil,ceil+1,ceil+2,ceil*2+1],
    [1,ceil,ceil+1,ceil*2+1]
  ]

  const fourElement = [
    [0,1,ceil,ceil+1],
    [0,1,ceil,ceil+1],
    [0,1,ceil,ceil+1],
    [0,1,ceil,ceil+1]
  ]

  const fiveElement = [
    [1,ceil+1,ceil*2+1,ceil*3+1],
    [ceil,ceil+1,ceil+2,ceil+3],
    [1,ceil+1,ceil*2+1,ceil*3+1],
    [ceil,ceil+1,ceil+2,ceil+3]
  ]

  const arrayElements = [firstElement, secondElement, thirdElement, fourElement, fiveElement];

  let currentPosition = 2;
  let currentRotation = 0;

  let random = Math.floor(Math.random()*arrayElements.length);
  let randomColor = Math.floor(Math.random()*colors.length);
  let currentElement = arrayElements[random][currentRotation];

  function playMusic(audio) {
    let playPromise = audio.play();
 
    if (playPromise !== undefined) {
       playPromise.then(e => {
       //audio.play();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  pause.addEventListener('click', event => {
    if (timeId) {
      audioPlay.pause();
      clearInterval(timeId);
      clearInterval(timerId);
      timeId = null;
      pause.innerHTML = 'PLAY';
    } else {
      audioPlay.play();
      timeId = setInterval(moveDown, time);
      currentTime();
      pause.innerHTML = 'PAUSE';
    }
  });

  restart.addEventListener('click', event => {

    location.reload();
    
    //    isGameOver = true;
    //    clearInterval(timeId);
    //    timeId = null;    
    // //  // clearInterval(timerId);
    // //  // timerId = 0;
    // //  // currentTime();
    //  let i = 160;  
    //  let timeGameOver = setInterval(function() {
    //     i-=1;
    //     const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
    //     row.every(index => squares[index].classList.add('bottom'));          
    //     row.every(index => squares[index].style.backgroundImage = '');
    //     row.every(index => squares[index].classList.add('element'));

    //     if (i == 0) {
    //       location.reload();         
    //     }
    //   }, 10); 
  });

  function show() {
    currentElement.forEach(item => {      
      squares[currentPosition + item].classList.add('element');
      squares[currentPosition + item].style.backgroundImage = `url('./assets/img/${colors[randomColor]}.jpg')`;
    })
  }

  function hide() {
    currentElement.forEach(item => {
      squares[currentPosition + item].classList.remove('element');
      squares[currentPosition + item].style.backgroundImage = '';
    })
  }

  function stop() {
    if (currentElement.some(item => squares[currentPosition + item + ceil].classList.contains('bottom'))) {
      currentElement.forEach(item => squares[currentPosition + item].classList.add('bottom'));
      //start a new element
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * arrayElements.length);
      randomColor = Math.floor(Math.random() * colors.length);
      currentElement = arrayElements[random][currentRotation];
      currentPosition = 2;     
      addScore();
      show();
      displayNext();     
      gameOver();
    }
  }

  function moveLeft() {
    if (!isGameOver) {
      hide();
      const isLeft = currentElement.some(item => (currentPosition + item) % ceil === 0);

      if(!isLeft) currentPosition -=1;
      if(currentElement.some(item => squares[currentPosition + item].classList.contains('bottom'))) {
        currentPosition +=1;
      }
      show();
    }
  }

  function moveRight() {
    if (!isGameOver) {
      hide();
      const isRight = currentElement.some(item => (currentPosition + item) % ceil === ceil -1)
      if(!isRight) currentPosition +=1;
      if(currentElement.some(item => squares[currentPosition + item].classList.contains('bottom'))) {
        currentPosition -=1;
      }
      show();
   }
  }

  function moveDown() {
    if (!isGameOver) {
      audio.src = `./assets/audio/down.wav`;
      playMusic(audio);
      hide();
      currentPosition += ceil;
      show();      
      displayNext();      
      stop();
    }    
  }

  function rotate() {
    if (!isGameOver) {
      audio.src = `./assets/audio/rotate.wav`;
      playMusic(audio);
      hide();
      currentRotation +=1;
      if(currentRotation === currentElement.length) {
        currentRotation = 0;
      }
      currentElement = arrayElements[random][currentRotation];
      checkRotatePosition();
      show();      
    }
  }
  
  function checkRotatePosition(position) {
    if (!position) {
      position = currentPosition;
    }
    if ((position + 1) % ceil < 4) { 
      if (currentElement.some(item => (currentPosition + item + 1) % ceil === 0)) {
        currentPosition +=1;
        checkRotatePosition(position);
        }
    }
    else if (position % ceil >= 5) {

      if (currentElement.some(item => (currentPosition + item) % ceil === 0)) {
        currentPosition -= 1;
        checkRotatePosition(position);
      }
    }
  }

function gameOver() {
    if(currentElement.some(item => squares[currentPosition + item].classList.contains('bottom'))) {
      clearInterval(timeId);//остановить игру
      clearInterval(timerId);//остановить время игры
      isGameOver = true;
      audio.src = `./assets/audio/gameover.wav`;
      playMusic(audio);
      //вывести модалку с результатом и сохранить с именем в LS     

      let i = 160;  
        let timeGameOver = setInterval(function() {
          i-=1;
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
          row.every(index => squares[index].classList.add('bottom'));          
          row.every(index => squares[index].style.backgroundImage = '');
          row.every(index => squares[index].classList.add('element'));
          if (i == 0) {
            clearInterval(timeGameOver);
            showResults();             
          }
        }, 10); 
    }
  }

function addScore() {
    
    lineScore = 0;
    for (let i = 0; i < 159; i +=ceil) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];      

      if(row.every(index => squares[index].classList.contains('bottom'))) {
        lineScore +=1;   

        row.forEach(index => {
          squares[index].classList.remove('bottom');
          squares[index].classList.remove('element');  
          squares[index].style.backgroundImage = '';        
        })       
        line +=1;
        lineLevel +=1;// для перехода на сл уровень
        lineValue.innerHTML = line; 
        
        if (lineLevel >= constlineNextLevel) {
          level +=1;
          levelValue.innerHTML = level; 
          nextLevel();
        }     
        audio.src = `./assets/audio/clear.wav`;
        playMusic(audio);
        const squaresRemove = squares.splice(i, ceil);
        squares = squaresRemove.concat(squares);        
        squares.forEach(cell => fieldGame.appendChild(cell));        
      }            
    }
    countScore(lineScore);  
}

function countScore(lineScore) {
      if (lineScore === 1) {
        score +=100;        
      } else if (lineScore === 2) {  
        score +=300;
      } else if (lineScore === 3) {  
        score +=700;
      } else if (lineScore === 4) {  
        score +=1500;
      }
    scoreValue.innerHTML = score; 
}

function nextLevel() {
    lineLevel = 0;
    clearInterval(timeId);
    time -=100;
    timeId = setInterval(moveDown, time);
}

function currentTime () {   

    timerId = setInterval(function() {
      let currentDate = new Date;
      currentDate.setTime(date+=time);
  
      let second = currentDate.getSeconds();
      if (second < 10) {
        second = `0${second}`;
      }
      let minute = currentDate.getMinutes();
  
      timelValue.innerHTML =  minute + ':' + second;
    }, 1000);
}

formResult.addEventListener('submit', (event) => {
  event.preventDefault();

  let usersArray = localStorage.getItem('users');
  if (usersArray) {
    usersArray = JSON.parse(usersArray);
  } else usersArray = [];

  const formData = new FormData(formResult);
    // теперь можно извлечь данные
    const name = formData.get('name').toLowerCase().trim();
    if (name) {
        let user = {"name":name, "score":modalScore.innerHTML, "time":modalTime.innerHTML, "level": levelValue.innerHTML};
        usersArray.push(user);
        localStorage.setItem('users-random-game', JSON.stringify(usersArray));

        closePopUp(currentPopUp, false);
    }   
   
    //exit сделать
});

//next element
 const displayWidth = 4;
 const displayNexts = document.querySelectorAll('.next-grid div');
 let displayIndex = 0;

 const smallTetrominoes = [
   [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* l */
   [5, displayWidth+5, displayWidth + 6, displayWidth * 2 + 6], /* z */
   [6, displayWidth+5, displayWidth + 6, displayWidth + 7], /* t */
   [5, 6, displayWidth+5, displayWidth + 6], /* o*/
   [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* i */
 ]

 function displayNext() {
  displayNexts.forEach(square => {
     square.classList.remove('element');
     square.style.backgroundImage = 'none';
   })
   
   smallTetrominoes[nextRandom].forEach(index => {    
     displayNexts[displayIndex + index].classList.add('element');
     displayNexts[displayIndex + index].style.backgroundImage = `url('./assets/img/lightblue.jpg')`;
   })
 }

  document.addEventListener('DOMContentLoaded', () => {
    audioPlay.src = `./assets/audio/play.mp3`;
    audioPlay.play();
    show();
    currentTime ();
    timeId = setInterval(moveDown, time);

    document.addEventListener('keydown', (e) => {

      if(e.keyCode === 37) {
        moveLeft();
      } else if (e.keyCode === 38) {
        rotate();
      } else if (e.keyCode === 39) {
        moveRight();
      } else if (e.keyCode === 40) {
        moveDown();
      } else if (e.keyCode === 40 && e.repeat === true) {
        e.preventDefault();
        moveDown();
      }
    });
});

function showResults () {
  currentPopUp = document.querySelector('#modal-login-gameover');
  modalScore.innerHTML = scoreValue.innerHTML;
  modalTime.innerHTML = timelValue.innerHTML;
  isCloseOnClickBody = false;
  openPopUp(currentPopUp); 
}

