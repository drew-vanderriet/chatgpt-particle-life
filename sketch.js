const KDTree = require('./kdTree.js');

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Add 50 red particles at random locations
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let randomColor = random(Object.values(Particle.COLORS));
    let particle = new Particle(x, y, randomColor);
    particles.push(particle);
  }
}

function draw() {
  background(220);

  // Build the KD tree
  const tree = new KDTree(particles, ['x', 'y']);

  // interact particles with their neighbors
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const neighbors = tree.nearest(particle, 500, true);

    for (let j = 0; j < neighbors.length; j++) {
      if (particle !== neighbors[j]) {
        particle.interact(neighbors[j]);
      }
    }
  }

  // Update and draw all particles
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
}
