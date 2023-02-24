let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Add 50 red particles at random locations
  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = random(height);
    let randomColor = random(Object.values(Particle.COLORS));
    let particle = new Particle(x, y, randomColor);
    particles.push(particle);
  }
}

function draw() {
  background(220);
  
  // interact all particles with each other
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      if (i !== j) {
        particles[i].interact(particles[j]);
      }
    }
  }
  
  // Update and draw all particles
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
}

const baseForceSlider = document.getElementById("baseForce");
const baseForceLabel = document.getElementById("baseForceLabel");

baseForceSlider.addEventListener("input", () => {
  baseForce = parseInt(baseForceSlider.value);
  baseForceLabel.textContent = baseForce;
});
