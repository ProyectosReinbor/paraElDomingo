import type { Map } from "./map";
import { Sprite } from "./sprite";

type Animations = "Idle" | "Walk" | "HammerBlow";

const PawnPreload = (
    scene: Phaser.Scene,
    key: string,
    color: "blue" | "purple" | "red" | "yellow"
) => {
    const url = `images/factions/knights/troops/pawn/${color}.png`;
    scene.load.spritesheet(
        key,
        url,
        {
            frameWidth: 192,
            frameHeight: 192
        }
    );
}

class Pawn extends Sprite {
    protected map: Map;

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
                left: 115,
                right: 75
            }
        );
        this.map = map;
    }

    public preload() {
        this.keyboardCreateCursorsKeys();
    }

    public create() {
        this.physicsAddSprite(250, 300);
        this.scene.anims.create({
            key: this.keyAnims("Idle"),
            frames: this.scene.anims.generateFrameNumbers(
                this.spriteSheetKey,
                {
                    start: 0,
                    end: 5,
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.keyAnims("Walk"),
            frames: this.scene.anims.generateFrameNumbers(
                this.spriteSheetKey,
                {
                    start: 6,
                    end: 11,
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.keyAnims("HammerBlow"),
            frames: this.scene.anims.generateFrameNumbers(
                this.spriteSheetKey,
                {
                    start: 12,
                    end: 17
                }
            ),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 1000
        });

        this.physicsAddCollider(this.map.floor0.water);
        this.physicsAddCollider(this.map.floor0.elevation);
        this.physicsAddCollider(this.map.floor1.elevation);
    }

    public update(delta: number) {
        this.move(delta);
    }

    protected keyAnims(animation: Animations) {
        return `${this.spriteSheetKey}${animation}`;
    }

    protected animsPlay(animation: Animations) {
        this.sprite.anims.play(
            this.keyAnims(animation),
            true
        );
    }
}

export {
    PawnPreload,
    Pawn
}