document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreValue = document.querySelector('.score-value');

    const ceil = 10;
    let nextRandom = 0;
    let score = 0;

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
        score +=100;
        scoreValue.innerHTML = score;
        console.log(row);
        row.forEach(index => {
          squares[index].classList.remove('bottom');
          squares[index].classList.remove('element');
        })
        const squaresRemoved = squares.splice(i, ceil);
        squares = squaresRemoved.concat(squares);
        
        squares.forEach(cell => grid.appendChild(cell));
        console.log(squares);
      }
    }
  }

  show();
 // timer = setInterval(moveDown, 1000);

 document.addEventListener('keyup', control);
});

