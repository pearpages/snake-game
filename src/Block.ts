import { gameContext } from "./GameContext";
import { configuration } from "./Configuration";
import shapes from './shapes';

const { blockSize } = configuration;

class Block {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  drawSquare(color = "Black") {
    const ctx = gameContext.canvas.getContext() as CanvasRenderingContext2D;
    ctx.fillStyle = color;
    ctx.fillRect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
  }

  drawCircle(color = "Black") {
    const ctx = gameContext.canvas.getContext();
    const x = this.x * blockSize + blockSize / 2;
    const y = this.y * blockSize + blockSize / 2;

    shapes(ctx).circle(x, y, blockSize / 2, { fillStyle: color });
  }

  equals(other: Block) {
    return this.x === other.x && this.y === other.y;
  }

  static create(x: number, y: number) {
    return new Block(x, y);
  }
}

export { Block };
