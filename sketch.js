let particles = [];

function setup() {
  createCanvas(400, 400);
  // Add 50 red particles at random locations
//   for (let i = 0; i < 50; i++) {
//     let x = random(width);
//     let y = random(height);
//     let particle = new Particle(x, y, color(255, 0, 0));
//     particles.push(particle);
//   }
}

function draw() {
  background(220);
  
  // test drawing
  fill(255, 0, 0); // Set fill color to red
  ellipse(50, 50, 20, 20); // Draw a red dot at the center of the canvas

  
  // Update and draw all particles
//   for (let particle of particles) {
//     particle.update();
//     particle.draw();
//   }
}
