class Particle {
  static COLORS = {
    RED: "red",
    BLUE: "blue",
    DARK_GREEN: "dark green",
    ORANGE: "orange",
    PURPLE: "purple",
  };
  
  constructor(x, y, c, weights) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-10, 10), random(-10, 10));
    this.acceleration = createVector();
    this.color = c;
    this.weights = weights;
    this.radius = 10;
    this.baseForce = 10000;
    this.repulsiveWeight = -1;
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
    const dx = other.position.x - this.position.x;
    const dy = other.position.y - this.position.y;

    // Calculate wrapped distances
    const wrappedDx = this.wrapDistance(dx, width);
    const wrappedDy = this.wrapDistance(dy, height);
    const wrappedDistance = sqrt(wrappedDx * wrappedDx + wrappedDy * wrappedDy);

    // Get the weight for the combination of colors, or if they are the same color
    const weight = this.weights[color1 + color2] || 0; // Default weight is 0 if color combination not defined

    if (wrappedDistance > 0 && wrappedDistance < 50) {
      const strength = this.baseForce * this.repulsiveWeight / (wrappedDistance * wrappedDistance * wrappedDistance); // all particles repel at close distances

      // Calculate wrapped force vector
      const force = createVector(wrappedDx, wrappedDy);
      if (abs(dx) > width / 2) {
        force.x -= width * Math.sign(dx);
      }
      if (abs(dy) > height / 2) {
        force.y -= height * Math.sign(dy);
      }
      force.setMag(strength);
      this.applyForce(force);
    } else if (wrappedDistance > 0 && wrappedDistance < 500) {
      const strength = this.baseForce * weight / (wrappedDistance * wrappedDistance);

      // Calculate wrapped force vector
      const force = createVector(wrappedDx, wrappedDy);
      if (abs(dx) > width / 2) {
        force.x -= width * Math.sign(dx);
      }
      if (abs(dy) > height / 2) {
        force.y -= height * Math.sign(dy);
      }
      force.setMag(strength);
      this.applyForce(force);
    }
  }

  wrapDistance(distance, bound) {
    if (abs(distance) > bound / 2) {
      return distance > 0 ? distance - bound : distance + bound;
    }
    return distance;
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
