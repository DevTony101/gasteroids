// begin fixed parameters
const numberOfStars = 200;
const starsMovement = 8;
const bulletMovement = 8;
const scoreIncrement = 100;
const assetsFolder = "./assets";
const soundsFolder = `${assetsFolder}/sounds`;
const imagesFolder = `${assetsFolder}/images`;
const fontsFolder = `${assetsFolder}/fonts`;
// end fixed parameters

// begin changeable parameters
let globalDifficulty = "EASY";
let asteroidsToAdd = 1;
let numberOfInitialAsteroids = 2;
let initialLives = 5;
let scoreMultiplier = 1;
let gameOver = false;
let gameOverSfxPlayed = false;
let bulletsLimit = 5;
// end changeable parameters

// begin assets variables
let heartImage, gameOverImage;
let shootEffect, explodeEffect, gameOverEffect;
let psFont;
// end assets variables

// GUI
let gui, easyButton, mediumButton, hardButton, buttons;

// game variables
let ship, stars, asteroids;

function preload() {
  // -- Images
  heartImage = loadImage(`${imagesFolder}/heart.png`);
  gameOverImage = loadImage(`${imagesFolder}/game_over.png`);
  // -- Sounds
  shootEffect = loadSound(`${soundsFolder}/shoot_sound.mp3`);
  explodeEffect = loadSound(`${soundsFolder}/explosion_sound.mp3`);
  gameOverEffect = loadSound(`${soundsFolder}/game_over_sound.mp3`);
  // -- Fonts
  psFont = loadFont(`${fontsFolder}/PressStart2P-Regular.ttf`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  easyButton = createButton("Restart Game [Easy]", (width / 2) - 375, (height / 2) + 100, 230, 40);
  mediumButton = createButton("Restart Game [Medium]", (width / 2) - 125, (height / 2) + 100, 250, 40);
  hardButton = createButton("Restart Game [Hard]", (width / 2) + 145, (height / 2) + 100, 230, 40);
  buttons = [easyButton, mediumButton, hardButton];
  for (button of buttons) {
    button.visible = false;
    button.setStyle({
      strokeBg: color(255),
      fillBg: color(0),
      fillLabel: color(255),
      fillBgActive: color(255),
      fillLabelActive: color(0),
      fillBgHover: color(255),
      fillLabelHover: color(0)
    });
  }
  restartGame("EASY");
}

function mousePressed() {
  if (!gameOver) ship.shoot();
}

function keyPressed() {
  if (!gameOver) {
    if (keyCode === 32) ship.shoot(); // SPACE_BAR
    else if (keyCode === 27) gameOver = true; // ESC_KEY
  }
  return false;
}

function draw() {
  background(0);
  drawGui();
  drawStars();
  drawAsteroids();
  drawDifficulty();
  ship.draw(mouseX);
  if (!ship.hasAnyHeartsLeft() || gameOver) {
    asteroids = [];
    if (!gameOver) gameOver = true;
    image(gameOverImage, (width / 2) - 155, (height / 2) - 150, 310, 170, 0, 0);
    if (!gameOverSfxPlayed) {
      gameOverSfxPlayed = true;
      gameOverEffect.setVolume(0.05);
      gameOverEffect.play();
    }
    buttons.forEach(button => button.visible = true);
    if (easyButton.isPressed) restartGame("EASY");
    else if (mediumButton.isPressed) restartGame("MEDIUM");
    else if (hardButton.isPressed) restartGame("HARD");
  }
}

function adjustParameters(difficulty) {
  globalDifficulty = difficulty;
  if (difficulty === "EASY") {
    asteroidsToAdd = 1;
    numberOfInitialAsteroids = 2;
    initialLives = 5;
    scoreMultiplier = 1;
    bulletsLimit = 5;
  } else if (difficulty === "MEDIUM") {
    asteroidsToAdd = 2;
    numberOfInitialAsteroids = 3;
    initialLives = 5;
    scoreMultiplier = 1.2;
    bulletsLimit = 7;
  } else if (difficulty === "HARD") {
    asteroidsToAdd = 3;
    numberOfInitialAsteroids = 5;
    initialLives = 8;
    scoreMultiplier = 1.5;
    bulletsLimit = 9;
  }
}

function restartGame(difficulty) {
  adjustParameters(difficulty);
  gameOver = false;
  gameOverSfxPlayed = false;
  ship = new Ship(parseInt(width / 2), height - 20, bulletMovement, initialLives, bulletsLimit);
  ship.setShootSoundEffect(shootEffect);
  ship.setHeartImage(heartImage);
  ship.setScoreFont(psFont);
  stars = new MovableObjects(0, starsMovement, numberOfStars);
  buttons.forEach(button => button.visible = false);
  asteroids = Array(numberOfInitialAsteroids)
    .fill(0)
    .map(_ => {
      return new Asteroid(random(50, width - 50), random(10, 20));
    });
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
  if (!gameOver) {
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
        ship.incrementScore(scoreIncrement * scoreMultiplier);
        asteroid.explode(explodeEffect);
        ship.deleteBullet(idxBullet);
      }
  
      asteroid.move();
      asteroid.draw();
    }
  }
}

function drawDifficulty() {
  if (!gameOver) {
    push();
    textFont(psFont);
    textSize(12);
    if (globalDifficulty === "EASY") fill(68, 161, 160);
    else if(globalDifficulty === "MEDIUM") fill(238, 184, 104);
    else if (globalDifficulty === "HARD") fill(250, 0, 63);
    text(`Difficulty [${globalDifficulty}]`, 20, 130);
    pop();
  }
}
