import { keyName } from "./keyboard";
import { configuration } from "./Configuration";
import { createCanvas } from "./canvas";
import { Apple } from "./Apple";
import { Snake } from "./Snake";

const { width, blockSize, height } = configuration;

class GameContext {
  canvas = createCanvas();
  score = 0;
  speed = 100;
  paused = false;
  apple = Apple.create();
  snake = Snake.create(() => {
    this.drawGameOver(gameContext.intervalId);
  });
  intervalId?: ReturnType<typeof setInterval>;
  private constructor() {}
  static create() {
    return new GameContext();
  }

  drawBorder() {
    const ctx = this.canvas.getContext() as CanvasRenderingContext2D;
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
  }

  drawScore() {
    const ctx = this.canvas.getContext() as CanvasRenderingContext2D;
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Score: ${gameContext.score}`, blockSize, blockSize);
  }

  drawGameOver(intervalId?: ReturnType<typeof setInterval>) {
    clearInterval(intervalId);
    const ctx = this.canvas.getContext() as CanvasRenderingContext2D;
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
  }

  paint = () => {
    this.canvas.clean();
    this.drawScore();
    this.snake.move(this.apple);
    this.snake.draw();
    this.apple.draw();
    this.drawBorder();
  }

  init() {
    this.intervalId = setInterval(gameContext.paint.bind(this), gameContext.speed);

    document.body.onkeydown = (event) => {
      const newDirection = keyName(event.keyCode);
      if (newDirection === "pause") {
        if (gameContext.paused) {
          gameContext.intervalId = setInterval(
            gameContext.paint,
            gameContext.speed
          );
          gameContext.paused = false;
        } else {
          clearInterval(gameContext.intervalId);
          gameContext.paused = true;
        }
      } else if (newDirection !== "other") {
        gameContext.snake.setNextDirection(newDirection);
      }
    };
  }
}

const gameContext = GameContext.create();

export { gameContext };
