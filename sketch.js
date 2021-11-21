// begin parameters
const numberOfStars = 200;
const numberOfInitialAsteroids = 5;
const asteroidsToAdd = 2;
const starsMovement = 8;
const bulletMovement = 8;
const soundsFolder = "sound_effects";
// end parameters
let ship, stars, asteroids;
let shootEffect, explodeEffect;
function preload() {
  shootEffect = loadSound(`${soundsFolder}/shoot_sound.mp3`);
  explodeEffect = loadSound(`${soundsFolder}/explosion_sound.mp3`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(parseInt(width / 2), height - 20, bulletMovement);
  ship.setShootSoundEffect(shootEffect);
  stars = new MovableObjects(0, starsMovement, numberOfStars);
  asteroids = Array(numberOfInitialAsteroids)
    .fill(0)
    .map(_ => {
      return new Asteroid(random(50, width - 50), random(10, 20));
    });
}

function mousePressed() {
  ship.shoot();
}

function keyPressed() {
  if (keyCode === 32) ship.shoot();
  return false;
}

function draw() {
  background(0);
  drawStars();
  drawAsteroids();
  ship.draw(mouseX);
}

function drawStars() {
  stars.move((x, y) => y > height, true);
  stars.draw((x, y) => {
    translate(x, y);
    fill(255);
    noStroke();
    circle(0, 0, 1);
  });
}

function drawAsteroids() {
  if (frameCount % 50 === 0) {
    for (let i = 0; i < asteroidsToAdd; i++) {
      asteroids.push(new Asteroid(random(50, width - 50), random(10, 20)));
    }
  }

  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];
    const idxBullet = asteroid.isHitBy(ship.getBullets());
    if (asteroid.isOffset()) {
      asteroids.splice(i, 1);
      continue;
    }
    
    if (!asteroid.hasExploded() && idxBullet >= 0) {
      asteroid.explode(explodeEffect);
      ship.deleteBullet(idxBullet);
    }

    asteroid.move();
    asteroid.draw();
  }
}
