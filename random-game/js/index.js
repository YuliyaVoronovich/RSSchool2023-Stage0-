document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const ceil = 10;
    let nextRandom = 0;

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
      show();
    }
  }

  function moveLeft() {
    hide();
    const isLeft = currentElement.some(item => (currentPosition + item) % ceil === 0);

    if(!isLeft) currentPosition -=1
    if(currentElement.some(item => squares[currentPosition + item].classList.contains('bottom'))) {
      currentPosition +=1;
    }
    show();
  }

  function moveRight() {
    hide();
    const isRight = current.some(item => (currentPosition + item) % ceil === ceil -1)
    if(!isRight) currentPosition +=1;
    if(currentElement.some(index => squares[currentPosition + item].classList.contains('bottom'))) {
      currentPosition -=1;
    }
    show();
  }

  function moveDown() {
    hide();
    currentPosition += ceil
    show();
    stop();
  }

  show();
 // timer = setInterval(moveDown, 1000);
});