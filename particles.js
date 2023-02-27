class Particle {
  static COLORS = {
    RED: "red",
    BLUE: "blue",
    DARK_GREEN: "dark green",
    ORANGE: "orange",
    PURPLE: "purple",
  };
  
  constructor(x, y, c) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-10, 10), random(-10, 10));
    this.acceleration = createVector();
    this.color = c;
    this.radius = 10;
    this.baseForce = 10000;
    this.repulsiveWeight = -2;
  }
  
  pos(axis) {
    if (axis == 0) {
      return this.position.x;
    } else if (axis == 1) {
      return this.position.y;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    // Wrap around screen edges
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
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

    // Get the weight for the combination of colors, or if they are the same color
    const weight = weights[color1 + color2] || 0; // Default weight is 0 if color combination not defined

    if (distance > 0 && distance < 20) {
      const strength = this.baseForce * this.repulsiveWeight / (distance * distance * distance); // all particles repel at close distances
      const force = p5.Vector.sub(other.position, this.position);
      force.setMag(strength);
      this.applyForce(force);
    } else if (distance > 0 && distance < 500) {
      const strength = this.baseForce * weight / (distance * distance);
      const force = p5.Vector.sub(other.position, this.position);
      force.setMag(strength);
      this.applyForce(force);
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
    fill(this.paintColor());
    noStroke(); // Remove the outline
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}
