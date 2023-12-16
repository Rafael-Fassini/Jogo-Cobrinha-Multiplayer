const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function gerarNumeroAleatorio(min, max) {
  return Math.random() * (max - min + 1) + min;
}

const pixelSize = 30;

const snake = [
  { x: 0, y: 0 }
];

const food = {
  x: 90,
  y: 90,
  color: 'yellow'
};


let direction, loopId;


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


  ctx.clearRect(0, 0, 690, 690);
  drawGrid();
  moveSnake();
  drawSnake();
  drawFood();

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
