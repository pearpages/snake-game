const blockSize = 10;
const width = 400;
const height = 400;
const widthInBlocks = width / blockSize; // 40
const heightInBlocks = height / blockSize; // 40

const configuration = {
  blockSize,
  width,
  height,
  widthInBlocks,
  heightInBlocks,
};

Object.freeze(configuration);

export { configuration };
