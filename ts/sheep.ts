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

    constructor(
        scene: Phaser.Scene,
        spriteSheetKey: string,
        map: Map
    ) {
        super(scene, spriteSheetKey);
        this.map = map;
    }

    protected SheepKeyAnims(animation: Animations) {
        return `${this.spriteSheetKey}${animation}`;
    }

    public SheepCreate() {
        this.scene.anims.create({
            key: this.SheepKeyAnims("Idle"),
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
            key: this.SheepKeyAnims("Jump"),
            frames: this.scene.anims.generateFrameNumbers(
                this.spriteSheetKey,
                {
                    start: 8,
                    end: 13,
                }
            ),
            frameRate: 8,
        });

        this.SpriteCreate(250, 900);
        this.SpritePhysicsAddCollider(this.map.floor0.water);
        this.SpritePhysicsAddCollider(this.map.floor0.elevation);
    }

    public SheepUpdate(delta: number) {
        this.SpriteMove(delta);
        this.SheepMove(delta);
    }

    protected SheepMove(delta: number) {

        if (this.sprite.body.velocity.x < 0) {
            this.sprite.scaleX = -1;
            this.sprite.body.offset.x = 85;
        } else if (this.sprite.body.velocity.x > 0) {
            this.sprite.scaleX = 1;
            this.sprite.body.offset.x = 0;
        }
    }
}