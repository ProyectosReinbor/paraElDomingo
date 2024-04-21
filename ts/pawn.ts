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
        super(scene, spriteSheetKey);
        this.map = map;
    }

    protected PawnKeyAnims(animation: Animations) {
        return `${this.spriteSheetKey}${animation}`;
    }

    protected PawnAnimsPlay(animation: Animations) {
        this.sprite.anims.play(
            this.PawnKeyAnims(animation),
            true
        );
    }

    public PawnCreate() {
        this.SpriteCreate(250, 300);
        this.scene.anims.create({
            key: this.PawnKeyAnims("Idle"),
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
            key: this.PawnKeyAnims("Walk"),
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
            key: this.PawnKeyAnims("HammerBlow"),
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

        this.SpritePhysicsAddCollider(this.map.floor0.water);
        this.SpritePhysicsAddCollider(this.map.floor0.elevation);
        this.SpritePhysicsAddCollider(this.map.floor1.elevation);
    }

    public PawnUpdate(delta: number) {
        this.SpriteMove(delta);
    }
}

export {
    PawnPreload,
    Pawn
}