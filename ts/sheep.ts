import { Assets } from "./assets";
import type { Map } from "./map";

const enum Animations {
    Idle = `${Assets.Sheep}Idle`,
    Jump = `${Assets.Sheep}Jump`,
}

export const SheepPreload = (scene: Phaser.Scene) => {
    scene.load.spritesheet(
        Assets.Sheep,
        "images/resources/sheep.png",
        {
            frameWidth: 64 * 2,
            frameHeight: 64 * 2,
        }
    );
}
export class Sheep {
    private scene: Phaser.Scene;
    private sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private map: Map;

    constructor(scene: Phaser.Scene, map: Map) {
        this.scene = scene;
        this.map = map;
    }

    public create() {
        this.scene.anims.create({
            key: Animations.Idle,
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
            key: Animations.Jump,
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
        this.sprite.setSize(50, 50);
        this.sprite.setScale(1);
        this.sprite.anims.play(Animations.Idle);
        this.sprite.body.setCollideWorldBounds(true);

        if (this.map.floor0.water !== null)
            this.scene.physics.add.collider(this.sprite, this.map.floor0.water);

        if (this.map.floor0.elevation !== null)
            this.scene.physics.add.collider(this.sprite, this.map.floor0.elevation);
    }

    public update(delta: number) {
        this.move(delta);
    }

    private move(delta: number) {
        const velocity = 5 * delta;
        this.sprite.body.setVelocityX(-velocity);
        this.sprite.body.setVelocityY(-velocity);
    }
}