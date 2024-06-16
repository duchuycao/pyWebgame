// snake_game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const GRID_WIDTH = canvas.width / GRID_SIZE;
const GRID_HEIGHT = canvas.height / GRID_SIZE;
const FPS = 10;

let snake = {
    length: 1,
    positions: [{ x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) }],
    direction: { x: 0, y: 0 },
    color: 'green',
    score: 0,
    foodPosition: { x: 0, y: 0 },
};

function drawSnake() {
    ctx.fillStyle = snake.color;
    ctx.strokeStyle = 'white';
    snake.positions.forEach(pos => {
        ctx.fillRect(pos.x * GRID_SIZE, pos.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        ctx.strokeRect(pos.x * GRID_SIZE, pos.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(snake.foodPosition.x * GRID_SIZE, snake.foodPosition.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${snake.score}`, 10, 30);
}

function drawTitle() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Snake Game', 200, 30);
}

function handleKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            snake.direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            snake.direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            snake.direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            snake.direction = { x: 1, y: 0 };
            break;
    }
}

function moveSnake() {
    const head = { x: snake.positions[0].x + snake.direction.x, y: snake.positions[0].y + snake.direction.y };
    snake.positions.unshift(head);

    if (head.x === snake.foodPosition.x && head.y === snake.foodPosition.y) {
        snake.score++;
        snake.length++;
        generateFoodPosition();
    } else {
        snake.positions.pop();
    }

    if (isSnakeCollided()) {
        resetGame();
    }
}

function isSnakeCollided() {
    const head = snake.positions[0];
    return (
        head.x < 0 ||
        head.x >= GRID_WIDTH ||
        head.y < 0 ||
        head.y >= GRID_HEIGHT ||
        snake.positions.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function generateFoodPosition() {
    snake.foodPosition = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
    };

    if (snake.positions.some(pos => pos.x === snake.foodPosition.x && pos.y === snake.foodPosition.y)) {
        generateFoodPosition();
    }
}

function resetGame() {
    snake = {
        length: 1,
        positions: [{ x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) }],
        direction: { x: 0, y: 0 },
        color: 'green',
        score: 0,
        foodPosition: { x: 0, y: 0 },
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTitle();
    drawScore();
    drawSnake();
    drawFood();
}

function main() {
    document.addEventListener('keydown', handleKeys);
    setInterval(() => {
        moveSnake();
        draw();
    }, 1000 / FPS);
}

main();
