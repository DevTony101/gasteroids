class Ship {
  constructor(x, y, bulletMovement, initialHearts, bulletsLimit) {
    this.x = x;
    this.y = y;
    this.hearts = initialHearts;
    this.score = 0;
    this.bullets = new MovableObjects(0, -bulletMovement);
    this.bulletsLimit = bulletsLimit;
  }

  getBullets() {
    return this.bullets.collection;
  }

  getScore() {
    return this.score;
  }

  deleteBullet(index) {
    this.bullets.deleteByIndex(index);
  }

  setShootSoundEffect(soundEffect) {
    soundEffect.setVolume(0.02);
    this.shootSoundEffect = soundEffect;
  }

  setHeartImage(image) {
    this.heartImage = image;
  }

  setScoreFont(font) {
    this.scoreFont = font;
  }

  shoot() {
    if (this.bullets.size() < this.bulletsLimit) {
      this.shootSoundEffect.play();
      this.bullets.add({
        x: mapXLimits(mouseX),
        y: height - 50,
      });
    }
  }

  incrementScore(inc) {
    this.score += inc;
  }

  decrementHearts() {
    this.hearts--;
  }

  hasAnyHeartsLeft() {
    return this.hearts > 0;
  }

  draw(x) {
    this.drawScore();
    if (!gameOver) {
      this.drawHearts();
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

  drawHearts() {
    for (let i = 0; i < this.hearts; i++) {
      const xPos = (20 * i) + 20;
      const offset = 25 * i;
      image(this.heartImage, xPos + offset, 25, 35, 35, 0, 0);
    }
  }

  drawScore() {
    push();
    fill(255);
    textFont(this.scoreFont);
    textSize(15);
    if (!gameOver) {
      text(`Score: ${this.score}`, 20, 100);
    } else {
      text("Final Score", (width / 2) - 80, 75);
      if (this.score === 0) text(this.score, (width / 2) - 10, 110);
      else if (this.score < 1000) text(this.score, (width / 2) - 20, 110);
      else text(this.score, (width / 2) - 30, 110);
    }
    pop();
  }
}
