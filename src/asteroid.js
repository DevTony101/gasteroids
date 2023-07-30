class Asteroid extends Debri {
  constructor(x, y) {
    super(x, y, 20, 25);
    this.movementY = random(2, 5);
    this.movementX = random(-1, 1);
    this.debri = [];
    this.exploded = false;
    this.isBonus = false;
    this.color = undefined;
  }

  setIsBonus(value) {
    this.isBonus = value;
    if (value) this.color = color(random(150, 200), random(150, 200), random(150, 200));
  }
  
  hasExploded() {
    return this.exploded;
  }
  
  isHitBy(bulletCollection) {
    const [p1, p2] = this.getHitBlockCoordinates();
    for (let i = 0; i < bulletCollection.length; i++) {
      const bullet = bulletCollection[i];
      if (bullet.x > p1.x && bullet.x < p2.x) {
        if (bullet.y > p1.y && bullet.y < p2.y) {
          return i;
        }
      }
    }
  }
  
  explode(explodeSoundEffect) {
    const middlePoint = this.getMiddlePoint();
    explodeSoundEffect.setVolume(0.01);
    explodeSoundEffect.play();
    this.exploded = true;
    this.verticies = [];
    this.debri = Array(floor(random(5, 10))).fill(0).map(_ => {
      return new Debri(middlePoint.x, middlePoint.y, 2, 5);
    });
  }
  
  move() {
    super.move();
    this.debri.forEach(debri => debri.move());
  }
  
  draw() {
    super.draw(this.color);
    this.debri.forEach(debri => debri.draw(this.color));
  }
}