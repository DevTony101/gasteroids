// begin parameters
const numberOfStars = 200;
const numberOfInitialAsteroids = 2;
const asteroidsToAdd = 1;
const starsMovement = 8;
const bulletMovement = 8;
const initialLives = 5;
const scoreIncrement = 100;
const assetsFolder = "./assets";
const soundsFolder = `${assetsFolder}/sounds`;
const imagesFolder = `${assetsFolder}/images`;
const fontsFolder = `${assetsFolder}/fonts`;
// end parameters

let ship, stars, asteroids;
let heartImage, gameOverImage;
let shootEffect, explodeEffect, gameOverEffect;
let psFont;

function preload() {
  // begin assets
  // -- Images
  heartImage = loadImage(`${imagesFolder}/heart.png`);
  gameOverImage = loadImage(`${imagesFolder}/game_over.png`);
  // -- Sounds
  shootEffect = loadSound(`${soundsFolder}/shoot_sound.mp3`);
  explodeEffect = loadSound(`${soundsFolder}/explosion_sound.mp3`);
  gameOverEffect = loadSound(`${soundsFolder}/game_over_sound.mp3`);
  // -- Fonts
  psFont = loadFont(`${fontsFolder}/PressStart2P-Regular.ttf`);
  // end assets
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(parseInt(width / 2), height - 20, bulletMovement, initialLives);
  ship.setShootSoundEffect(shootEffect);
  ship.setHeartImage(heartImage);
  ship.setScoreFont(psFont);
  stars = new MovableObjects(0, starsMovement, numberOfStars);
  asteroids = Array(numberOfInitialAsteroids)
    .fill(0)
    .map(_ => {
      return new Asteroid(random(50, width - 50), random(10, 20));
    });
}

function mousePressed() {
  if (ship.hasAnyHeartsLeft()) ship.shoot();
}

function keyPressed() {
  if (ship.hasAnyHeartsLeft()) {
    if (keyCode === 32) ship.shoot();
  }
  return false;
}

function draw() {
  background(0);
  drawStars();
  drawAsteroids();
  ship.draw(mouseX);
  if (!ship.hasAnyHeartsLeft()) {
    image(gameOverImage, (width / 2) - 155, (height / 2) - 85, 310, 170, 0, 0);
    gameOverEffect.setVolume(0.05);
    gameOverEffect.play();
    noLoop();
  }
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
    if (!asteroid.hasExploded() && asteroid.isOffsetY()) ship.decrementHearts();
    if (asteroid.isOffset()) {
      asteroids.splice(i, 1);
      continue;
    }
    
    if (!asteroid.hasExploded() && idxBullet >= 0) {
      ship.incrementScore(scoreIncrement);
      asteroid.explode(explodeEffect);
      ship.deleteBullet(idxBullet);
    }

    asteroid.move();
    asteroid.draw();
  }
}
