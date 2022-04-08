class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    create() {
        let menuText = this.add.text(320, 240, "Menu to be inserted");
        menuText.setOrigin(0.5, 0.5);

        this.scene.start("play");
    }
}