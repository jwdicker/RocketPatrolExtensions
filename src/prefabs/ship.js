class Ship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, pointValue, leftMoving) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.pointValue = pointValue;
        this.leftMoving = leftMoving;
        if(this.leftMoving) {
            this.movementSpeed = game.settings.spaceshipSpeed;
        } else {
            this.movementSpeed = -game.settings.spaceshipSpeed;
        }
    }

    update() {
        this.x -= this.movementSpeed;
        if(this.leftMoving && this.x < 0 - this.width) {
            this.x = game.config.width;
        }

        if(!this.leftMoving && this.x > game.config.width) {
            this.x = 0 - this.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}