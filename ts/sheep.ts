import type { Map } from "./map";
import { Sprite } from "./sprite";

type Animations = "Idle" | "Jump";

const SheepPreload = (
    scene: Phaser.Scene,
    key: string
) => {
    scene.load.spritesheet(
        key,
        "images/resources/sheep.png",
        {
            frameWidth: 128,
            frameHeight: 128,
        }
    );
}

class Sheep extends Sprite {
    protected map: Map;
    protected randomMotionTimer: number = 0;

    constructor(
        scene: Phaser.Scene,
        spriteSheetKey: string,
        map: Map
    ) {
        super(
            scene,
            spriteSheetKey,
            5,
            {
                left: 85,
                right: 45,
            }
        );
        this.map = map;
    }

    public create() {
        this.scene.anims.create({
            key: this.keyAnims("Idle"),
            frames: this.scene.anims.generateFrameNumbers(
                this.spriteSheetKey,
                {
                    start: 0,
                    end: 7,
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.keyAnims("Jump"),
            frames: this.scene.anims.generateFrameNumbers(
                this.spriteSheetKey,
                {
                    start: 8,
                    end: 13,
                }
            ),
            frameRate: 8,
        });

        this.physicsAddSprite(250, 900);
        this.physicsAddCollider(this.map.floor0.water);
        this.physicsAddCollider(this.map.floor0.elevation);
    }

    public update(delta: number) {
        this.randomMove(delta);
        this.setVelocityWithDirections(delta);
    }

    protected randomMove(delta: number) {
        this.randomMotionTimer += delta;
        if (this.randomMotionTimer > 5000) {
            this.randomMotionTimer = 0;
            this.directions.x = Phaser.Math.RND.pick(["left", "right", "idle"]);
            this.directions.y = Phaser.Math.RND.pick(["up", "down", "idle"]);
        }
    }

    protected keyAnims(animation: Animations) {
        return `${this.spriteSheetKey}${animation}`;
    }
}

export {
    SheepPreload,
    Sheep
}