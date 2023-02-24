let particle;

function setup() {
  createCanvas(400, 400);
  particle = new Particle(200, 200, color(255, 0, 0));
}

function draw() {
  background(220);
  particle.update();
  particle.draw();
}
