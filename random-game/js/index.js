document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const width = 10;
    let nextRandom = 0;

  const firstElement = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const secondElement = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const thirdElement = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const fourElement = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const fiveElement = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
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
    currentElement.forEach(index => {
      squares[currentPosition + index].classList.remove('element');
    })
  }

  function moveDown() {
    hide();
    currentPosition += width
    show();
  }

  show();
  //timer = setInterval(moveDown, 1000);
});