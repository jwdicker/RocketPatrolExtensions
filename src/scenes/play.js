class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        // Images
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("spaceship", "assets/spaceship.png");

        // Background Images
        this.load.image("starfield_0", "assets/backgrounds/starfield_layer-0.png");
        this.load.image("starfield_1", "assets/backgrounds/starfield_layer-1.png");
        this.load.image("starfield_2", "assets/backgrounds/starfield_layer-2.png");
        this.load.image("starfield_3", "assets/backgrounds/starfield_layer-3.png");

        // Explosion Animation
        this.load.spritesheet("explosion", "assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        // Input Keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Background
        this.background = new Array(
            this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield_0").setOrigin(0,0),
            this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield_1").setOrigin(0,0),
            this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield_2").setOrigin(0,0),
            this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield_3").setOrigin(0,0),
        );

        // Rockets
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, "rocket").setOrigin(0.5, 0);

        // Ships
        this.ships = new Array(
            new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0),
            new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0),
            new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        );

        // UI Borders
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, game.config.width, game.config.height, 0xffffff).setOrigin(0,0);

        // Animation Setup
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // Keeping Score
        this.p1Score = 0;
        let gameTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, gameTextConfig);

        // Game Over Flag
        this.endOGame = false;

        // 60-second play clock
        this.startTime = this.time.now;
        this.clockText = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, Math.ceil(game.settings.gameTimer / 1000), gameTextConfig).setOrigin(0.5, 0);
        this.clockText.align = 'center';
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameTextConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', gameTextConfig).setOrigin(0.5);
            this.endOGame = true;
        }, null, this);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.endOGame && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }

        // Background movement
        for(let i = 0; i < this.background.length; i++)
        {
            this.background[i].tilePositionX -= i/2 + 1;
        }

        if(!this.endOGame) {
            this.p1Rocket.update();
            for(let ship of this.ships){ship.update()};
        }

        // Collision Handling
        for(let ship of this.ships) {
            for(let rocket of [this.p1Rocket]) {
                if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship. y) {
                    this.detonate(rocket, ship);
                }
            }
        }

        // Update clock
        this.clockText.text = Math.ceil((game.settings.gameTimer - (this.time.now - this.startTime)) / 1000);
    }

    // Carries out the actions that go along with a rocket-ship collision
    detonate(rocket, ship) {
        // Reset Rocket
        rocket.resetPos();
        
        // Hide Ship
        ship.alpha = 0;

        // Update Score
        this.p1Score += ship.pointValue;
        this.scoreLeft.text = this.p1Score;

        // Play explosion sound
        this.sound.play("sfx_explosion");

        // Play explosion animation
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0,0);
        boom.anims.play('explode');
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
    }
}