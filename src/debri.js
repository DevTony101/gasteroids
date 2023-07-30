class Debri {
  constructor(x, y, minSize, maxSize) {
    this.x = x;
    this.y = y;
    this.movementY = random(-10, 10);
    this.movementX = random(-10, 10);
    this.verticies = generateVerticies(x, y, minSize, maxSize, random(5, 10));
  }
  
  isOffsetX() {
    return this.x < 0 || this.x > width;
  }
  
  isOffsetY() {
    return this.y > height;
  }
  
  isOffset() {
    return this.isOffsetX() || this.isOffsetY();
  }
  
  move() {
    this.x = this.x + this.movementX;
    this.y = this.y + this.movementY;
    for (let i = 0; i < this.verticies.length; i++) {
      this.verticies[i].add(this.movementX, this.movementY);
    }
  }

  getHitBlockCoordinates() {
    const getSortedVerticies = fn => this.verticies.map(fn).sort((a, b) => a - b);
    const xPoints = getSortedVerticies(v => v.x);
    const yPoints = getSortedVerticies(v => v.y);
    return [
      createVector(xPoints[0], yPoints[0]),
      createVector(xPoints[xPoints.length - 1], yPoints[yPoints.length - 1])
    ];
  }

  getMiddlePoint() {
    const [p1, p2] = this.getHitBlockCoordinates();
    return p5.Vector.add(p1, p2).div(2);
  }
  
  draw(color) {
    push();
    beginShape();
    if (color) fill(color);
    else noFill();
    stroke(255);
    for (let i = 0; i < this.verticies.length; i++) {
      const { x, y } = this.verticies[i];
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}