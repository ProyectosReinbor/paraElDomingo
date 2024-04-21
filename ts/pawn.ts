import { Assets } from "./assets";
import type { Map } from "./map";

const enum Animations {
    Idle = `${Assets.Pawn}Idle`,
    Walk = `${Assets.Pawn}Walk`,
    HammerBlow = `${Assets.Pawn}HammerBlow`,
}

export const PawnPreload = (scene: Phaser.Scene) => {
    scene.load.spritesheet(
        Assets.Pawn,
        "images/factions/knights/troops/pawn/blue.png",
        {
            frameWidth: 192,
            frameHeight: 192
        }
    );
}

export class Pawn {
    private scene: Phaser.Scene;
    private map: Map;
    private sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, map: Map) {
        this.scene = scene;
        this.map = map;
    }

    public preload() {
        this.cursors = this.scene.input.keyboard?.createCursorKeys();
    }

    public create() {
        this.scene.anims.create({
            key: Animations.Idle,
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
            key: Animations.Walk,
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
            key: Animations.HammerBlow,
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
        this.sprite.body.setSize(64, 64);
        this.sprite.setScale(1);
        this.sprite.anims.play(Animations.Walk);
        this.sprite.body.setCollideWorldBounds(true);

        if (this.map.floor0.water !== null)
            this.scene.physics.add.collider(this.sprite, this.map.floor0.water);

        if (this.map.floor0.elevation !== null)
            this.scene.physics.add.collider(this.sprite, this.map.floor0.elevation);


        if (this.map.floor1.elevation !== null)
            this.scene.physics.add.collider(this.sprite, this.map.floor1.elevation);
    }

    public update(delta: number) {
        this.move(delta);
    }

    private move(delta: number) {
        const velocity = 5 * delta;
        let idleX = false;

        if (this.cursors?.left?.isDown) {
            this.sprite.setVelocityX(-velocity);
            this.sprite.play(Animations.Walk, true);
            this.sprite.body.offset.x = 64 * 2;
            this.sprite.scaleX = -1;
        }
        else if (this.cursors?.right?.isDown) {
            this.sprite.setVelocityX(velocity);
            this.sprite.play(Animations.Walk, true);
            this.sprite.body.offset.x = 64;
            this.sprite.scaleX = 1;
        }
        else {
            idleX = true;
            this.sprite.setVelocityX(0);
        }

        if (this.cursors?.up?.isDown) {
            this.sprite.setVelocityY(-velocity);
            this.sprite.play(Animations.Walk, true);
        }
        else if (this.cursors?.down?.isDown) {
            this.sprite.setVelocityY(velocity);
            this.sprite.play(Animations.Walk, true);
        }
        else {
            if (idleX) {
                this.sprite.play(Animations.Idle, true);
            }
            this.sprite.setVelocityY(0);
        }
    }
}