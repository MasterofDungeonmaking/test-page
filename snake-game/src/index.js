// This file contains the JavaScript code for the Snake game.
// It initializes the game, handles user input, updates the game state, and renders the game on the screen.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let gameInterval;

function startGame() {
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(updateGame, 100);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        placeFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }

    if (checkCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over!');
    }

    drawGame();
}

function placeFood() {
    food.x = Math.floor(Math.random() * canvas.width / 10);
    food.y = Math.floor(Math.random() * canvas.height / 10);
}

function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width / 10 ||
        head.y < 0 || head.y >= canvas.height / 10 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

export { startGame, updateGame, drawGame };