export const setPoint = (canvas, pos, col) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = col || "#0ff";
  ctx.fillRect(pos.x, pos.y, 4, 4);
};
