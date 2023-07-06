const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

const snake = {
    x: 20,
    y: 20,
    size: 20
};

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.x, snake.y, snake.size, snake.size);
}

const food = {
    x: -20,
    y: -20,
    size: 20
};

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / food.size)) * food.size;
    food.y = Math.floor(Math.random() * (canvas.height / food.size)) * food.size;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, food.size, food.size);
}

function reset() {
    snake.x = 20;
    snake.y = 20;
    snake.size = 20;
    snake.direction = null;
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
    if (snake.x < 0 || snake.x > 400 || snake.y < 0 || snake.y > 400) {
        reset();
    } else {
    moveSnake();
    drawSnake();
    drawFood();
    }
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
generateFood();
drawFood();