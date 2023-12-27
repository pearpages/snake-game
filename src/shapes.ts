function shape(ctx: any) {
    function circle(
      x: number,
      y: number,
      radius: number,
      {
        fillStyle,
        strokeStyle = "Black",
      }: { strokeStyle?: string; fillStyle?: string } = {}
    ) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      } else {
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
      }
    }
  
    function bee(x: number, y: number) {
      ctx.lineWidth = 2;
  
      circle(x, y, 8, { fillStyle: "Gold" });
      circle(x, y, 8);
      circle(x - 5, y - 11, 5);
      circle(x + 5, y - 11, 5);
      circle(x - 2, y - 1, 2);
      circle(x - 2, y - 1, 1, { fillStyle: "#EAEAEA" });
      circle(x + 2, y - 1, 2);
      circle(x + 2, y - 1, 1, { fillStyle: "#EAEAEA" });
    }
  
    return { circle, bee };
  }
  
  export default shape;
  