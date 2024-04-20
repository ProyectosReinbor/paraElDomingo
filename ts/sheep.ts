import { Assets } from "./assets";
import type { Map } from "./map";

export const enum SheepAnimations {
    Idle = `${Assets.Sheep}Idle`,
    Jump = `${Assets.Sheep}Jump`,
}

export class Sheep {
    scene: Phaser.Scene;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
    velocity: number = 30;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    static preload(scene: Phaser.Scene) {
        scene.load.spritesheet(
            Assets.Sheep,
            "images/resources/sheep.png",
            {
                frameWidth: 64 * 2,
                frameHeight: 64 * 2,
            }
        );
    }

    create() {
        this.scene.anims.create({
            key: SheepAnimations.Idle,
            frames: this.scene.anims.generateFrameNumbers(
                Assets.Sheep,
                {
                    start: 0,
                    end: 7,
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: SheepAnimations.Jump,
            frames: this.scene.anims.generateFrameNumbers(
                Assets.Sheep,
                {
                    start: 8,
                    end: 13,
                }
            ),
            frameRate: 8,
        });

        this.sprite = this.scene.physics.add.sprite(250, 900, Assets.Sheep);
        this.sprite.setScale(1);
        this.sprite.anims.play(SheepAnimations.Idle);
        this.sprite.body.setCollideWorldBounds(true);

        // scene.physics.world.setBounds(0, 0, 1000, 1000);
    }

    update(delta: number) {
        this.move(delta);
    }

    private move(delta: number) {
        if (this.sprite === undefined) return;
        this.sprite.setVelocityX(this.velocity);
        this.sprite.setVelocityY(-this.velocity);
    }
}