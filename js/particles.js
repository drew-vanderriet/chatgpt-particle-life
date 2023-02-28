class Particle {
  static COLORS = {
    RED: "red",
    BLUE: "blue",
    DARK_GREEN: "dark green",
    ORANGE: "orange",
    PURPLE: "purple",
  };
  
  static wrapDistance(position1, position2) {
    const wrappedDx = Particle.wrappedDiff(position1, position2, 0) // 0 is the x axis
    const wrappedDy = Particle.wrappedDiff(position1, position2, 1) // 1 is the y axis
    const wrappedDistance = sqrt(wrappedDx * wrappedDx + wrappedDy * wrappedDy);

    return {
      wrappedDistance,
      wrappedDx,
      wrappedDy
    };
  }
  
  static wrappedDiff(position1, position2, axis) {
    if (axis == 0) {
      const dx = position2.x - position1.x;
      return dx > width / 2 ? dx - width : dx < -width / 2 ? dx + width : dx;
    } else if (axis == 1) {
      const dy = position2.y - position1.y;
      return dy > height / 2 ? dy - height : dy < -height / 2 ? dy + height : dy;
    }
  }
  
  constructor(x, y, c, weights, maxForceDistance, repulsiveWeight, tooCloseDistance) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-10, 10), random(-10, 10));
    this.acceleration = createVector();
    this.color = c;
    this.weights = weights;
    this.radius = 10;
    this.baseForce = 10000;
    this.maxForceDistance = maxForceDistance;
    this.repulsiveWeight = repulsiveWeight;
    this.tooCloseDistance = tooCloseDistance;
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
    const { wrappedDistance, wrappedDx, wrappedDy } = Particle.wrapDistance(this.position, other.position);

    // Get the weight for the combination of colors, or if they are the same color
    const weight = this.weights[color1 + color2] || 0; // Default weight is 0 if color combination not defined

    // particles too close, the repulsive force takes over
    if (wrappedDistance > 0 && wrappedDistance < this.tooCloseDistance) {
      const strength = this.baseForce * this.repulsiveWeight / (wrappedDistance * wrappedDistance * wrappedDistance);

      // Calculate wrapped force vector
      const force = createVector(wrappedDx, wrappedDy);
      force.setMag(strength);
      this.applyForce(force);
    } else if (wrappedDistance < this.maxForceDistance) { // only calculate standard particle simulation outside of "too close" threshold
      const strength = this.baseForce * weight / (wrappedDistance * wrappedDistance);

      // Calculate wrapped force vector
      const force = createVector(wrappedDx, wrappedDy);
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
