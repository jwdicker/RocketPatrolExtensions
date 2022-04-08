class Rocket extends Phaser.GameObjects.Sprite {
    
    constructor(scene, posX, posY, texture) {
        super(scene, posX, posY, texture);
        scene.add.existing(this);

        this.initX = posX;
        this.initY = posY;

        this.firing = false;
    }

    update() {
        const movementSpeed = 4;
        if(keyLEFT.isDown) {
            this.x -= movementSpeed;
        }

        if(keyRIGHT.isDown) {
            this.x += movementSpeed;
        }

        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.firing = true;
        }

        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.resetPos();
        }

        if(this.firing) {
            this.y -= 10;

            if(this.y < 0) {
                this.resetPos();
            }
        }
    }

    resetPos() {
        this.firing = false;
        this.x = this.initX;
        this.y = this.initY;
    }
}