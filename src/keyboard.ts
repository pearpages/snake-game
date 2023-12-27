type KeyName = "left" | "up" | "right" | "down" | "pause" | "other";

function keyName(keyCode: number): KeyName {
  switch (keyCode) {
    case 37:
      return "left";
    case 38:
      return "up";
    case 39:
      return "right";
    case 40:
      return "down";
    case 32:
      return "pause";
    default:
      return "other";
  }
}

export { keyName };
export type { KeyName };