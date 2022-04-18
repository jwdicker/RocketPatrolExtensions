/* 
 * Name: Jacob Dickerman
 * Project Title: Rocket Patrol Mods
 * Date: 17 April 2022
 * Approx. Time to complete: ~6hrs
 */

/*
 * Sources: 
 * Phaser 3 Documentation (https://newdocs.phaser.io/docs/3.55.2)
 * Audio - Notes of Phaser 3 (https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/)
 */

/*
 * Points Breakdown:
 * 
 * Starting Tier (5 Points)
 * Add your own (copyright-free) background music to the Play scene
 * Randomize each spaceship's movement direction at the start of each play
 * Create a new scrolling tile sprite for the background
   * Part of Paralax Scrolling
 * Allow the player to control the Rocket after it's fired
   * Horizontal Movement is never revoked
 * 
 * Novice Tier (10 Points)
 * Display the time remaining (in seconds) on the screen
 * Create a new animated sprite for the Spaceship enemies
   * The animation is subtle. Pay attention to the rear of the craft and both nacelles
 * Create a new title screen (e.g., new artwork, typography, layout)
 * Implement parallax scrolling
   * Note the different speeds of the background stars
 * 
 * Intermediate Tier (20 Points)
 * Create new artwork for all of the in-game assets (rocket, spaceships, explosion)
 * Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
 *
 * Total: 4 * 5 + 4 * 10 + 2 * 20 = 100
 */

const config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;