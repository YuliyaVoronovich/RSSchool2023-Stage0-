document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreValue = document.querySelector('.score-value');
    const lineValue = document.querySelector('.line-value');
    const levelValue = document.querySelector('.level-value');
    const timelValue = document.querySelector('.time-value');

    const ceil = 10;
    const lineNextLevel = 10;
    let nextRandom = 0;
    let score = 0;
    let line = 0;
    let lineLevel = 0;
    let level = 1;
    let timeId;
    let timer = 1000;

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
  let currentElement = arrayElements[random][currentRotation];

  function control(e) {
    if(e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }


  function show() {
    currentElement.forEach(item => {
      squares[currentPosition + item].classList.add('element');
    })
  }

  function hide() {
    currentElement.forEach(item => {
      squares[currentPosition + item].classList.remove('element');
    })
  }

  function stop() {
    if (currentElement.some(item => squares[currentPosition + item + ceil].classList.contains('bottom'))) {
      currentElement.forEach(item => squares[currentPosition + item].classList.add('bottom'));
      //start a new element
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * arrayElements.length);
      currentElement = arrayElements[random][currentRotation];
      currentPosition = 2;
     
      addScore();
      show();
    }
  }

  function moveLeft() {
    hide();
    const isLeft = currentElement.some(item => (currentPosition + item) % ceil === 0);

    if(!isLeft) currentPosition -=1;
    if(currentElement.some(item => squares[currentPosition + item].classList.contains('bottom'))) {
      currentPosition +=1;
    }
    show();
  }

  function moveRight() {
    hide();
    const isRight = currentElement.some(item => (currentPosition + item) % ceil === ceil -1)
    if(!isRight) currentPosition +=1;
    if(currentElement.some(item => squares[currentPosition + item].classList.contains('bottom'))) {
      currentPosition -=1;
    }
    show();
  }

  function moveDown() {
    hide();
    currentPosition += ceil;
    show();
    stop();
  }

  function rotate() {
    hide();
    currentRotation +=1;
    if(currentRotation === currentElement.length) {
      currentRotation = 0;
    }
    currentElement = arrayElements[random][currentRotation];
    show();
  }

  function addScore() {
    
    for (let i = 0; i < 159; i +=ceil) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];      

      if(row.every(index => squares[index].classList.contains('bottom'))) {        
        row.forEach(index => {
          squares[index].classList.remove('bottom');
          squares[index].classList.remove('element');
        })       
        line +=1;
        lineLevel +=1;
        lineValue.innerHTML = line;
        score +=100;
        scoreValue.innerHTML = score; 
        console.log(lineLevel);
        if (lineLevel >= lineNextLevel) {
          level +=1;
          levelValue.innerHTML = level; 
          nextLevel();
        }     
        const squaresRemoved = squares.splice(i, ceil);
        squares = squaresRemoved.concat(squares);        
        squares.forEach(cell => grid.appendChild(cell));
        
      }
    }
  }

  function nextLevel() {
    lineLevel = 0;
    clearInterval(timeId);
    timer -=100;
    timeId = setInterval(moveDown, timer);
  }

  function cureentTime () {
    let d = +new Date(2023, 1, 1);
    setInterval(function() {
      let time = new Date;
      time.setTime(d += 1000);
  
      let second = time.getSeconds();
      if (second < 10) {
        second = `0${second}`;
      }
      let minute = time.getMinutes();
  
      timelValue.innerHTML =  minute + ':' + second
    }, 1000);
  }

  show();
  cureentTime ();
  timeId = setInterval(moveDown, timer);

 document.addEventListener('keyup', control);
});

