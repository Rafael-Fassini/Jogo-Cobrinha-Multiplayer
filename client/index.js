const finalScore = document.querySelector('.final-score > span');
const score = document.querySelector('.score--value');
const menu = document.querySelector('.menu-screen');
const buttonPlay = document.querySelector('.btn-play');


const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const audio = new Audio('audio.mp3');

const incrementScore = () => {
  score.innerText = +score.innerText + 10;
}


const randomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const randomPosition = () => {
  const number = randomNumber(0, canvas.width - pixelSize);
  return Math.round(number / 30) * 30;
}


const initialPosition = { x: 270, y: 240 };

const pixelSize = 30;

let snake = [initialPosition];

const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: 'yellow'
};


let direction, loopId;


const checkEat = () => {
  const head = snake[snake.length - 1];

  if (head.x == food.x && head.y == food.y){
    incrementScore();
    snake.push(head); 
    audio.play();

    let X = randomPosition();
    let Y = randomPosition();

    while (snake.find((position) => position.x == X && position.y == Y)) {
      let x = randomPosition();
      let y = randomPosition();
    }

    food.x = X;
    food.y = Y;


  }
}

const checkCollision = () => {
  const head = snake[snake.length - 1];
  const canvasLimit = canvas.width - pixelSize;
  const neckIndex = snake.length - 2;

  const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
    
  const selfCollision = snake.find((position, index) => {
    return index < neckIndex && position.x == head.x && position.y == head.y;
  })

  if (selfCollision || wallCollision) {
    gameOver();
  }
  

}

const gameOver = () => {
  direction = undefined;

  menu.style.display = 'flex';
  finalScore.innerText = score.textContent;
  canvas.style.filter = 'blur(2px)';
}

const drawSnake = () => {

  ctx.fillStyle = 'purple';

  snake.forEach((position, index) => {
    if (index == snake.length -1) {
      ctx.fillStyle = 'white';
    };

    ctx.fillRect(position.x, position.y, pixelSize, pixelSize);

  });
};

const moveSnake  = () => {
  const head = snake.at(-1);

  if (!direction) return;
 

  if (direction == 'right') {
    snake.push({ x: head.x + pixelSize, y: head.y});
  }

  if (direction == 'left') {
    snake.push({ x: head.x - pixelSize, y: head.y});
  }

  if (direction == 'down') {
    snake.push({ x: head.x, y: head.y + pixelSize});
  }

  if (direction == 'up') {
    snake.push({ x: head.x, y: head.y - pixelSize});
  }

  snake.shift();
}

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#191919'

  for (let i = 30; i < canvas.width; i += 30){
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 700);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(700, i);
    ctx.stroke();
  }
}

const drawFood = () => {
  const { color, x, y } = food;

  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, pixelSize, pixelSize);
  ctx.shadowBlur = 0;
}

const gameLoop = () => {
  clearInterval(loopId);


  ctx.clearRect(0, 0, 600, 600);
  drawGrid();
  moveSnake();
  drawSnake();
  drawFood();
  checkEat();
  checkCollision();

  loopId = setTimeout(() => {
    gameLoop()
  }, 300);
}


gameLoop();


document.addEventListener('keydown', ({ key }) => {

  if (key === 'ArrowUp' && direction != 'down'){
    direction = 'up';
  }

  if (key === 'ArrowDown' && direction != 'up'){
    direction = 'down';
  }

  if (key === 'ArrowLeft' && direction != 'right'){
    direction = 'left';
  }

  if (key === 'ArrowRight' && direction != 'left'){
    direction = 'right';
  }
  

})

buttonPlay.addEventListener('click', () => {
  score.innerText = '00';
  menu.style.display = 'none';
  canvas.style.filter = 'none';

  food.x = randomPosition();
  food.y = randomPosition();
  
  snake = [initialPosition];
})
