class Particle {
  static COLORS = {
    RED: "red",
    BLUE: "blue",
    DARK_GREEN: "dark green",
    ORANGE: "orange",
    PURPLE: "purple",
  };
  
  constructor(x, y, c, attraction, repulsion) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
    this.color = c;
    this.attraction = attraction;
    this.repulsion = repulsion;
    this.radius = 5;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  interact(other) {
    const color1 = this.color;
    const color2 = other.color;
    const distance = this.position.dist(other.position);

    // Predefined weights for each color combination
    const weights = {
      [Particle.COLORS.RED + Particle.COLORS.BLUE]: -0.5,
      [Particle.COLORS.RED + Particle.COLORS.DARK_GREEN]: -0.2,
      [Particle.COLORS.RED + Particle.COLORS.ORANGE]: 0.7,
      [Particle.COLORS.RED + Particle.COLORS.PURPLE]: 0.9,
      [Particle.COLORS.BLUE + Particle.COLORS.DARK_GREEN]: 0.4,
      [Particle.COLORS.BLUE + Particle.COLORS.ORANGE]: -0.1,
      [Particle.COLORS.BLUE + Particle.COLORS.PURPLE]: -0.8,
      [Particle.COLORS.DARK_GREEN + Particle.COLORS.ORANGE]: 0.3,
      [Particle.COLORS.DARK_GREEN + Particle.COLORS.PURPLE]: -0.6,
      [Particle.COLORS.ORANGE + Particle.COLORS.PURPLE]: 0.1,
    };

    const key = [color1, color2].sort().join(" + ");
    const weight = weights[key] || 0; // Default weight is 0 if color combination not defined

    if (distance > 0 && distance < 100) {
      const strength = weight / (distance * distance);
      const force = p5.Vector.sub(other.position, this.position);
      force.setMag(strength);
      this.applyForce(force);
      force.mult(-1);
      other.applyForce(force);
    }
  }
  
  paintColor() {
    let fillColor = "";
    switch (this.color) {
      case Particle.COLORS.RED:
        fillColor = color(255, 0, 0);
        break;
      case Particle.COLORS.BLUE:
        fillColor = color(0, 0, 255);
        break;
      case Particle.COLORS.DARK_GREEN:
        fillColor = color(0, 100, 0);
        break;
      case Particle.COLORS.ORANGE:
        fillColor = color(255, 165, 0);
        break;
      case Particle.COLORS.PURPLE:
        fillColor = color(128, 0, 128);
        break;
    }

    return fillColor; 
  }

  draw() {
    fill(paintColor());
    noStroke(); // Remove the outline
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}
