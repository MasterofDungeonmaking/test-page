// This file contains the JavaScript code for the Snake game.
// It initializes the game, handles user input, updates the game state, and renders the game on the screen.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let gameOver = false;

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = '#1976d2';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Game over
    if (gameOver) {
        ctx.fillStyle = '#d32f2f';
        ctx.font = '32px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial, sans-serif';
        ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 40);
    }
}

function update() {
    if (gameOver) return;

    // Move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Wall collision
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount
    ) {
        gameOver = true;
        draw();
        return;
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver = true;
            draw();
            return;
        }
    }

    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            break;
        }
    }
    food = newFood;
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100);
    }
}

document.addEventListener('keydown', e => {
    if (gameOver && e.code === 'Space') {
        resetGame();
        return;
    }
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 1) break;
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === -1) break;
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 1) break;
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === -1) break;
            direction = { x: 1, y: 0 };
            break;
    }
});

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    placeFood();
    gameOver = false;
    gameLoop();
}

// Start game
draw();
gameLoop();

export { startGame, updateGame, drawGame };