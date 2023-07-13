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
    let isFoodOnSnake = true;

    while (isFoodOnSnake) {
        food.x = Math.floor(Math.random() * (canvas.width / food.size)) * food.size;
        food.y = Math.floor(Math.random() * (canvas.height / food.size)) * food.size;

        // Check if the food position coincides with any part of the snake
        isFoodOnSnake = snake.tail.some(tailSegment => {
            return tailSegment.x === food.x && tailSegment.y === food.y;
        });
    }
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
    resetScore();
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

    // Check for wall collision
    if (
        newHead.x < 0 ||
        newHead.x >= canvas.width ||
        newHead.y < 0 ||
        newHead.y >= canvas.height
    ) {
        reset();
        return; // Exit the function to prevent further movement
    }

    // Check for collision with own body
    for (let i = 0; i < snake.tail.length; i++) {
        const tailSegment = snake.tail[i];
        if (newHead.x === tailSegment.x && newHead.y === tailSegment.y) {
            reset();
            return; // Exit the function to prevent further movement
        }
    }

    snake.tail.unshift(newHead);

    if (snake.tail.length > 1) {
        const hasEaten = newHead.x === food.x && newHead.y === food.y;

        if (!hasEaten) {
            snake.tail.pop();
        } else {
            generateFood();
            increaseScore(); // Increase the score when appropriate
            updateHighScoreIfNecessary(); // Update the high score if necessary
        }
    }

    snake.x = newHead.x;
    snake.y = newHead.y;
}

function growSnake() {
    const newTailSegment = { x: snake.x, y: snake.y, size: snake.size };
    snake.tail.unshift(newTailSegment); // adds new head
}

setInterval(() => {
    moveSnake();
    drawSnake();
    drawFood();
    isDirectionSet = false;
    updateScore;
}, 150);

let isDirectionSet = false; // Flag to track if a keypress has been registered
document.addEventListener('keydown', (event) => {
    if (!isDirectionSet) {
        if (event.key === 'ArrowRight' && snake.direction !== 'left') {
            snake.direction = 'right';
            isDirectionSet = true; // Set the flag to true
        } else if (event.key === 'ArrowLeft' && snake.direction !== 'right') {
            snake.direction = 'left';
            isDirectionSet = true; // Set the flag to true
        } else if (event.key === 'ArrowUp' && snake.direction !== 'down') {
            snake.direction = 'up';
            isDirectionSet = true; // Set the flag to true
        } else if (event.key === 'ArrowDown' && snake.direction !== 'up') {
            snake.direction = 'down';
            isDirectionSet = true; // Set the flag to true
        }
    }
});

drawSnake();
generateFood();
drawFood();

const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');

let score = 0;
let highScore = 0;

function updateScore() {
    scoreElement.textContent = score;
}

function updateHighScore() {
    highScoreElement.textContent = highScore;
}

function increaseScore() {
    score++;
    updateScore();
}

function updateHighScoreIfNecessary() {
    if (score > highScore) {
        highScore = score;
        updateHighScore();
    }
}

function resetScore() {
    score = 0;
    updateScore();
}