import { configuration } from './Configuration';
import { Block } from './Block';
import { Apple } from './Apple';
import { type KeyName } from './keyboard';
import { gameContext } from './GameContext';

const { widthInBlocks, heightInBlocks } = configuration;

class Snake {
  segments: Block[] = [
    Block.create(7, 5),
    Block.create(6, 5),
    Block.create(5, 5),
  ];
  direction: KeyName = "right";
  nextDirection: KeyName = "right";
  gameOver: () => void;
  constructor(gameOver: () => void) {
    this.gameOver = gameOver;
  }
  draw() {
    this.segments[0].drawSquare("darkblue");
    this.segments
      .slice(1, this.segments.length)
      .forEach((segment) => segment.drawSquare("blue"));
  }
  checkCollision(head: Block) {
    const leftCollision = head.x === 0;
    const topCollision = head.y === 0;
    const rightCollision = head.x === widthInBlocks - 1;
    const bottomCollision = head.y === heightInBlocks - 1;

    const wallCollision =
      leftCollision || topCollision || rightCollision || bottomCollision;

    let selfCollision = false;
    this.segments.forEach((segment) => {
      if (head.equals(segment)) {
        selfCollision = true;
      }
    });

    return wallCollision || selfCollision;
  }
  setNextDirection(newDirection: KeyName) {
    if (this.direction === "up" && newDirection === "down") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }

    this.nextDirection = newDirection;
  }
  move(apple: Apple) {
    const head = this.segments[0];
    this.direction = this.nextDirection;

    let newHead: Block;
    if (this.direction === "right") {
      newHead = Block.create(head.x + 1, head.y);
    } else if (this.direction === "down") {
      newHead = Block.create(head.x, head.y + 1);
    } else if (this.direction === "left") {
      newHead = Block.create(head.x - 1, head.y);
    } else  { // (this.direction === "up")
      newHead = Block.create(head.x, head.y - 1);
    }

    if (this.checkCollision(newHead)) {
      this.gameOver();
      return;
    }

    this.segments.unshift(newHead);

    if (newHead.equals(apple.position)) {
      gameContext.score++;
      apple.move();
      gameContext.speed -= 5;
      clearInterval(gameContext.intervalId);
      gameContext.intervalId = setInterval(gameContext.paint.bind(this), gameContext.speed);
    } else {
      this.segments.pop();
    }
  }
  static create(gameOver: () => void) {
    return new Snake(gameOver);
  }
}

export { Snake };
