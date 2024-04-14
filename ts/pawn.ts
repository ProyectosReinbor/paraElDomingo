export class Pawn {
    scene: Phaser.Scene;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
    key: "pawn" = "pawn";

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    load() {
        this.scene.load.spritesheet(this.key, "images/factions/knights/troops/pawn/blue.png", {
            frameWidth: 192,
            frameHeight: 192
        });
    }

    create() {
        this.scene.anims.create({
            key: `${this.key}Idle`,
            frames: this.scene.anims.generateFrameNumbers(this.key, {
                start: 0,
                end: 5,
            }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${this.key}Walk`,
            frames: this.scene.anims.generateFrameNumbers(this.key, {
                start: 6,
                end: 11,
            }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${this.key}HammerBlow`,
            frames: this.scene.anims.generateFrameNumbers(this.key, {
                start: 12,
                end: 17
            }),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 1000
        });

        this.sprite = this.scene.physics.add.sprite(250, 300, this.key);
        this.sprite.setScale(1);
        this.sprite.anims.play(`${this.key}Idle`);
    }

    move(delta: number) {
        this.sprite?.setVelocityX(10);
        this.sprite?.setVelocityY(10);
    }

    update(time: number, delta: number) {
        this.move(delta);
    }
}