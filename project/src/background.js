function drawStars(s, max) {
  s.push();
  s.background(s.round(s.random(3, 6)));
  for (let i = 0; i < max; i++) {
    let x = s.random(s.width);
    let y = s.random(s.height);
    let weight = fxrand() * 1.5;
    s.fill(255);
    let stroke = s.map(fxrand(), 0, 1, 100, 255);
    s.stroke(stroke);
    s.strokeWeight(weight);
    s.point(x, y);
  }
  s.pop();
}

export const s = (s) => {
  s.preload = () => {};
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    drawStars(s, 1000);
  };
  s.draw = () => {};
};
