class Rocket extends Phaser.GameObjects.Sprite {
    
    constructor(scene, posX, posY, texture) {
        super(scene, posX, posY, texture);
        scene.add.existing(this)
    }
}