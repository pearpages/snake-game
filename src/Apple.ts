import { configuration } from "./Configuration";
import { Block } from './Block';

const { widthInBlocks, heightInBlocks } = configuration;

function getRandomPosition(): [number, number] {
  const randomX = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  const randomY = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;

  return [randomX, randomY];
}

class Apple {
  position: Block;
  constructor(positition = Block.create(...getRandomPosition())) {
    this.position = positition;
  }
  draw() {
    this.position.drawCircle("LimeGreen");
  }
  move() {
    this.position = Block.create(...getRandomPosition());
  }
  static create() {
    return new Apple();
  }
}

export { Apple };
