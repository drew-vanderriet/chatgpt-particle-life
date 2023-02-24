class Particle {
  constructor(x, y, color, attraction, repulsion) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
    this.color = color;
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

  attract(other) {
    const distance = this.position.dist(other.position);
    if (distance > 0 && distance < 100) {
      const strength = (this.attraction * other.attraction) / (distance * distance);
      const force = p5.Vector.sub(other.position, this.position);
      force.setMag(strength);
      this.applyForce(force);
    }
  }

  repel(other) {
    const distance = this.position.dist(other.position);
    if (distance > 0 && distance < 100) {
      const strength = (this.repulsion * other.repulsion) / (distance * distance);
      const force = p5.Vector.sub(this.position, other.position);
      force.setMag(strength);
      this.applyForce(force);
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}
