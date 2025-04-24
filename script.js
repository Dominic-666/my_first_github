class Snake {
    constructor() {
        this.body = [{x: 200, y: 200}];
        this.direction = 'RIGHT';
    }

    move() {
        const head = {...this.body[0]};
        switch(this.direction) {
            case 'UP': head.y -= 10; break;
            case 'DOWN': head.y += 10; break;
            case 'LEFT': head.x -= 10; break;
            case 'RIGHT': head.x += 10; break;
        }
        this.body.unshift(head);
        this.body.pop();
    }

    changeDirection(newDirection) {
        this.direction = newDirection;
    }
}

class Food {
    constructor() {
        this.x = Math.floor(Math.random() * 40) * 10;
        this.y = Math.floor(Math.random() * 40) * 10;
    }

    draw(ctx) {
        this.ctx.shadowBlur = 5;
this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
const gradient = this.ctx.createRadialGradient(5, 5, 0, 5, 5, 5);
gradient.addColorStop(0, '#FF0000');
gradient.addColorStop(1, '#CC0000');
this.ctx.fillStyle = gradient;
this.ctx.fillRect(this.x, this.y, 10, 10);
this.ctx.shadowBlur = 0;
        ctx.fillRect(this.x, this.y, 10, 10);
    }

    respawn() {
        this.x = Math.floor(Math.random() * 40) * 10;
        this.y = Math.floor(Math.random() * 40) * 10;
    }
}

class Game {
    reset() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.gameOver = false;
        document.getElementById('score').textContent = 0;
    }

    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.snake = new Snake();
        this.food = new Food();
        this.gameLoop = this.gameLoop.bind(this);
        this.score = 0;
        this.gameOver = false;
    }

    start() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': this.snake.changeDirection('UP'); break;
                case 'ArrowDown': this.snake.changeDirection('DOWN'); break;
                case 'ArrowLeft': this.snake.changeDirection('LEFT'); break;
                case 'ArrowRight': this.snake.changeDirection('RIGHT'); break;
            }
        });
        setInterval(this.gameLoop, 100);
    }

    gameLoop() {
        if (this.gameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.move();
        this.drawSnake();
        this.food.draw(this.ctx);

        this.checkCollision();
        this.updateScore();
    }

    checkCollision() {
        const head = this.snake.body[0];

        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.snake.body.push({}); // 增加蛇的长度
            this.food.respawn();
            this.score += 10;
        }

        // 检查是否撞墙
        if (head.x < 0 || head.x >= this.canvas.width || head.y < 0 || head.y >= this.canvas.height) {
            this.gameOver = true;
            const restart = confirm('游戏结束！你的分数是：' + this.score + '\n是否重新开始？');
            if (restart) this.reset();
        }

        // 检查是否撞到自己
        for (let i = 1; i < this.snake.body.length; i++) {
            if (head.x === this.snake.body[i].x && head.y === this.snake.body[i].y) {
                this.gameOver = true;
                const restart = confirm('游戏结束！你的分数是：' + this.score + '\n是否重新开始？');
            if (restart) this.reset();
                break;
            }
        }
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }

    drawSnake() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 10);
gradient.addColorStop(0, '#00FF00');
gradient.addColorStop(1, '#00CC00');
this.ctx.fillStyle = gradient;
this.ctx.beginPath();
this.ctx.roundRect(segment.x, segment.y, 10, 10, 3);
this.ctx.fill();
        this.snake.body.forEach(segment => {
            this.ctx.fillRect(segment.x, segment.y, 10, 10);
        });
    }
}

const game = new Game();
game.start();