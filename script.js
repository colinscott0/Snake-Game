const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snake = {
    x: 20,
    y: 20,
    size: 20,
    direction: null,
    tail: []
};

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.x, snake.y, snake.size, snake.size);
  
    for (let i = 0; i < snake.tail.length; i++) {
        const tailSegment = snake.tail[i];
        ctx.fillRect(tailSegment.x, tailSegment.y, tailSegment.size, tailSegment.size);
    }
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
    snake.tail = [];
}

function moveSnake() {
    const newHead = { x: snake.x, y: snake.y, size: snake.size };

    if (snake.direction === 'right') {
        newHead.x += snake.size;
    } else if (snake.direction === 'left') {
        newHead.x -= snake.size;
    } else if (snake.direction === 'up') {
        newHead.y -= snake.size;
    } else if (snake.direction === 'down') {
        newHead.y += snake.size;
    }

    snake.tail.unshift(newHead);

    if (snake.tail.length > 1) {
        const hasEaten = newHead.x === food.x && newHead.y === food.y;

        if (!hasEaten) {
            snake.tail.pop();
        } else {
            generateFood();
        }
    }

    snake.x = newHead.x;
    snake.y = newHead.y;
}

function growSnake() {
    const newTailSegment = { x: snake.x, y: snake.y, size: snake.size };
    snake.tail.unshift(newTailSegment);
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