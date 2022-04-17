class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', 'assets/sfx/blip_select12.wav');
    this.load.audio('sfx_explosion', 'assets/sfx/explosion38.wav');
    this.load.audio('sfx_rocket', 'assets/sfx/rocket_shot.wav');
  }

  create() {
    // Configuring menu text
    let titleConfig = {
      fontFamily: 'Impact',
      fontSize: '56px',
      color: '#F3B141',
      align: 'center',
      fixedWidth: 0
    }

    let menuConfig = {
      fontFamily: 'DIN Condensed',
      fontSize: '48px',
      backgroundColor: '#F3B141',
      color: '#000',
      align: 'center',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 200
    }

    // Displaying menu text
    // Title and subtitile
    this.add.text(game.config.width / 2, borderUISize + borderPadding, "ROCKET PATROL", titleConfig).setOrigin(0.5);
    titleConfig.fontSize = '28px';
    this.add.text(game.config.width / 2, borderUISize * 2 + borderPadding * 2, "Extended Edition", titleConfig).setOrigin(0.5);

    // Menu buttons
    let noviceButton = this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, "Novice", menuConfig).setOrigin(0.5);
    noviceButton.setInteractive().on('pointerover', () => {
      noviceButton.setBackgroundColor("#0F0");
    });
    noviceButton.on('pointerout', () => {
      noviceButton.setBackgroundColor("#F3B141");
    });

    noviceButton.on('pointerdown', () => {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000
      }
      this.sound.play('sfx_select');
      this.scene.start('play');
    });

    let expertButton = this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize, "Expert", menuConfig).setOrigin(0.5);
    expertButton.setInteractive().on('pointerover', () => {
      expertButton.setBackgroundColor("#0F0");
    });
    expertButton.setInteractive().on('pointerout', () => {
      expertButton.setBackgroundColor("#F3B141");
    });

    expertButton.on('pointerdown', () => {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      }
      this.sound.play('sfx_select');
      this.scene.start('play');
    });

    menuConfig.backgroundColor = "#00FF00";
    menuConfig.fixedHeight = 0;
    menuConfig.fixedWidth = 0;

    // Tutorial text
    this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize * 3 + borderPadding, "Use ←→ arrows to move & (F) to fire", menuConfig).setOrigin(0.5);

    // Defining input keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
}