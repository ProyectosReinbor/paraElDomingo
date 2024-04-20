import { Assets } from "./assets";

export const enum PawnAnimations {
    Idle = `${Assets.Pawn}Idle`,
    Walk = `${Assets.Pawn}Walk`,
    HammerBlow = `${Assets.Pawn}HammerBlow`,
}

export class Pawn {
    scene: Phaser.Scene;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    static preload(scene: Phaser.Scene) {
        scene.load.spritesheet(
            Assets.Pawn,
            "images/factions/knights/troops/pawn/blue.png",
            {
                frameWidth: 192,
                frameHeight: 192
            }
        );
    }

    create() {
        this.scene.anims.create({
            key: PawnAnimations.Idle,
            frames: this.scene.anims.generateFrameNumbers(
                Assets.Pawn,
                {
                    start: 0,
                    end: 5,
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: PawnAnimations.Walk,
            frames: this.scene.anims.generateFrameNumbers(
                Assets.Pawn,
                {
                    start: 6,
                    end: 11,
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: PawnAnimations.HammerBlow,
            frames: this.scene.anims.generateFrameNumbers(
                Assets.Pawn,
                {
                    start: 12,
                    end: 17
                }
            ),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 1000
        });

        this.sprite = this.scene.physics.add.sprite(250, 300, Assets.Pawn);
        this.sprite.setScale(1);
        this.sprite.anims.play(PawnAnimations.Walk);
    }

    update(delta: number) {
        this.move(delta);
    }

    move(delta: number) {
        if (this.sprite === undefined) return;
        this.sprite.setVelocityX(10);
        this.sprite.setVelocityY(10);
    }
}