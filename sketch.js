let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Add 50 red particles at random locations
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let particle = new Particle(x, y, color(255, 0, 0));
    particles.push(particle);
  }
}

function draw() {
  background(220);
  
  // Update and draw all particles
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
}
