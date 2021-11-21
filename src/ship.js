class Ship {
  constructor(x, y, bulletMovement) {
    this.x = x;
    this.y = y;
    this.bullets = new MovableObjects(0, -bulletMovement);
    this.shootSoundEffect = null;
  }

  getBullets() {
    return this.bullets.collection;
  }

  deleteBullet(index) {
    this.bullets.deleteByIndex(index);
  }

  setShootSoundEffect(soundEffect) {
    soundEffect.setVolume(0.02);
    this.shootSoundEffect = soundEffect;
  }

  shoot() {
    if (this.bullets.size() < 5) {
      this.shootSoundEffect.play();
      this.bullets.add({
        x: mapXLimits(mouseX),
        y: height - 50,
      });
    }
  }

  draw(x) {
    this.drawBullets();
    let translateX = mapXLimits(x);
    push();
    translate(translateX, this.y);
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(0, 0, 60, 20);
    rect(0, -20, 20, 20);
    pop();
  }

  drawBullets() {
    if (this.bullets.size() > 0) this.bullets.move((x, y) => y < 0);
    this.bullets.draw((x, y) => {
      translate(x, y);
      fill(255);
      noStroke();
      rect(0, 0, 2, 10);
    });
  }
}
