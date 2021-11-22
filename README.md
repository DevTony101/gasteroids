# Gasteroids 👾 + ☄️
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://github.com/DevTony101/gasteroids/blob/main/LICENSE)
![Made Using: P5JS](https://img.shields.io/badge/Made%20Using-P5JS-pink?style=flat-square)

## Preamble
A mysterious horde of asteroids had been released upon Earth and unleashed terror among its inhabitants. You, an awarded space commander, had been chosen to protect Earth by destroying all the asteroids before they hit the planet!

## Game mechanics
- **Your misssion**: Destroy as many asteroids as you can! If an asteroid goes past the bottom border of your screen you will lose a heart point! The number of heart points you start the game with are conditioned by the game's difficulty.
- **Moving**: You can move your ship by moving the mouse along the x-axis.
- **Shooting**: You can activate your laser gun by clicking on the screen or pressing the space bar. The number of "bullets" you can fire at a given time is conditioned by the game's difficulty.
- **Exiting the game**: You can press the **[ESC]** key at any time to exit the game.

## Game modes
There's three game modes you can play: **Easy**, **Medium**, **Hard**. Each game mode changes certain aspects of the game, specifically:

- The number of lives you start the game with
- The number of lasers you can fire at a given time
- The number of asteroids the game starts with
- The number of asteroids that spawn each 50 frames of animation
- The score multiplier

The way these values are set in each game mode are given in the table below:
| Game Mode | Number of Initial Lives | Number of Lasers that can be Fired at Once | Number of Initial Asteroids | Number of Generated Asteroids | Score multiplier |
|:---------:|:-----------------------:|:------------------------------------------:|:---------------------------:|:-----------------------------:|:----------------:|
|    Easy   |            5            |                      5                     |              2              |               1               |         1        |
|   Medium  |            5            |                      7                     |              3              |               2               |        1.2       |
|    Hard   |            8            |                      9                     |              5              |               3               |        1.3       |

## Improvements
If you are interested, here's some items you could make to improve this game:

- [ ] Make the ship explode when an asteroid hit it
- [ ] Give the ship some special super-power based on the score
- [ ] Give the ship an extra-live based on the score
- [ ] Give the ship some powerup by exploding an "special item"
- [ ] Add a bossfight (A big asteroid that requires a set number of hits maybe?)
