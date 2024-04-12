export class World extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet(
            "pawn",
            "images/factions/knights/troops/pawn/blue.png",
            { frameWidth: 192, frameHeight: 192 }
        );
    }

    create() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers(
                "pawn",
                { frames: [0, 1, 2, 3, 4, 5] }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers(
                "pawn",
                { frames: [6, 7, 8, 9, 10, 11] }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "hammerBlow",
            frames: this.anims.generateFrameNumbers(
                "pawn",
                { frames: [12, 13, 14, 15, 16, 17] }
            ),
            frameRate: 8,
            repeat: -1
        });


        const cody = this.add.sprite(150, 150, "pawn");
        cody.setScale(5);
        cody.play("hammerBlow");
    }
}       