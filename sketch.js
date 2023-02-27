let particles = [];
let weights;
let maxForceDistance = 500;
let numberOfParticles = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Predefined weights for each color combination
  weights = {
    [Particle.COLORS.RED + Particle.COLORS.RED]: random(-1, 1),
    [Particle.COLORS.RED + Particle.COLORS.BLUE]: random(-1, 1),
    [Particle.COLORS.RED + Particle.COLORS.DARK_GREEN]: random(-1, 1),
    [Particle.COLORS.RED + Particle.COLORS.ORANGE]: random(-1, 1),
    [Particle.COLORS.RED + Particle.COLORS.PURPLE]: random(-1, 1),
    [Particle.COLORS.BLUE + Particle.COLORS.BLUE]: random(-1, 1),
    [Particle.COLORS.BLUE + Particle.COLORS.RED]: random(-1, 1),
    [Particle.COLORS.BLUE + Particle.COLORS.DARK_GREEN]: random(-1, 1),
    [Particle.COLORS.BLUE + Particle.COLORS.ORANGE]: random(-1, 1),
    [Particle.COLORS.BLUE + Particle.COLORS.PURPLE]: random(-1, 1),
    [Particle.COLORS.DARK_GREEN + Particle.COLORS.DARK_GREEN]: random(-1, 1),
    [Particle.COLORS.DARK_GREEN + Particle.COLORS.RED]: random(-1, 1),
    [Particle.COLORS.DARK_GREEN + Particle.COLORS.BLUE]: random(-1, 1),
    [Particle.COLORS.DARK_GREEN + Particle.COLORS.ORANGE]: random(-1, 1),
    [Particle.COLORS.DARK_GREEN + Particle.COLORS.PURPLE]: random(-1, 1),
    [Particle.COLORS.ORANGE + Particle.COLORS.ORANGE]: random(-1, 1),
    [Particle.COLORS.ORANGE + Particle.COLORS.RED]: random(-1, 1),
    [Particle.COLORS.ORANGE + Particle.COLORS.BLUE]: random(-1, 1),
    [Particle.COLORS.ORANGE + Particle.COLORS.DARK_GREEN]: random(-1, 1),
    [Particle.COLORS.ORANGE + Particle.COLORS.PURPLE]: random(-1, 1),
    [Particle.COLORS.PURPLE + Particle.COLORS.PURPLE]: random(-1, 1),
    [Particle.COLORS.PURPLE + Particle.COLORS.RED]: random(-1, 1),
    [Particle.COLORS.PURPLE + Particle.COLORS.BLUE]: random(-1, 1),
    [Particle.COLORS.PURPLE + Particle.COLORS.DARK_GREEN]: random(-1, 1),
    [Particle.COLORS.PURPLE + Particle.COLORS.ORANGE]: random(-1, 1),
  };
  
  // Add 50 red particles at random locations
  for (let i = 0; i < numberOfParticles; i++) {
    let x = random(width);
    let y = random(height);
    let randomColor = random(Object.values(Particle.COLORS));
    let particle = new Particle(x, y, randomColor, weights, maxForceDistance);
    particles.push(particle);
  }
}

function draw() {
  background(220);

  // Build the KD tree
  const tree = new KDTree(particles);

  // interact particles with their neighbors
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const neighbors = tree.search(particle, maxForceDistance);

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
