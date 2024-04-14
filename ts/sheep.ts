export class Sheep {
    key: "sheep" = "sheep";
    scene: Phaser.Scene;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
    velocity: number = 30;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    load() {
        this.scene.load.spritesheet(this.key, "images/resources/sheep.png", {
            frameWidth: 64 * 2,
            frameHeight: 64 * 2,
        });
    }

    create() {
        this.scene.anims.create({
            key: `${this.key}Idle`,
            frames: this.scene.anims.generateFrameNumbers(this.key, {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${this.key}Jump`,
            frames: this.scene.anims.generateFrameNumbers(this.key, {
                start: 8,
                end: 13,
            }),
            frameRate: 8,
        });

        this.sprite = this.scene.physics.add.sprite(250, 300, this.key);
        this.sprite.setScale(1);
        this.sprite.anims.play(`${this.key}Idle`);
    }

    move(delta: number) {
        this.sprite?.setVelocityX(this.velocity);
        this.sprite?.setVelocityY(this.velocity);
    }

    update(time: number, delta: number) {
        this.move(delta);
    }
}