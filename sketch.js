let particles = [];
let weights;

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
//   for (let i = 0; i < 150; i++) {
//     let x = random(width);
//     let y = random(height);
//     let randomColor = random(Object.values(Particle.COLORS));
//     let particle = new Particle(x, y, randomColor, weights);
//     particles.push(particle);
//   }
  particle1 = new Particle(50, 300, Particle.COLORS.RED, weights);
  particle2 = new Particle(width - 50, 300, Particle.COLORS.RED, weights);
  particle3 = new Particle(1000, 20, Particle.COLORS.RED, weights);
  particle4 = new Particle(1000, height - 20, Particle.COLORS.RED, weights);
  
  particles.push(particle1);
  particles.push(particle2);
  particles.push(particle3);
  particles.push(particle4);
}

function draw() {
  background(220);

  // Build the KD tree
  const tree = new KDTree(particles);

  // interact particles with their neighbors
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const neighbors = tree.search(particle, 500);

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
