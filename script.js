const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

const snake = {
    x: 10,
    y: 10,
    size: 20
};

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.x, snake.y, snake.size, snake.size);
}

function moveSnake() {
    if (snake.direction === 'right') {
        snake.x += snake.size;
        console.log("snake is moving");
    } else if (snake.direction === 'left') {
        snake.x -= snake.size;
    } else if (snake.direction === 'up') {
        snake.y -= snake.size;
    } else if (snake.direction === 'down') {
        snake.y += snake.size;
    }
}

setInterval(() => {
    moveSnake();
    drawSnake();
}, 200);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && snake.direction !== 'left') {
        snake.direction = 'right';
      } else if (event.key === 'ArrowLeft' && snake.direction !== 'right') {
        snake.direction = 'left';
      } else if (event.key === 'ArrowUp' && snake.direction !== 'down') {
        snake.direction = 'up';
      } else if (event.key === 'ArrowDown' && snake.direction !== 'up') {
        snake.direction = 'down';
      }
});

drawSnake();