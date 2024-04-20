
const key: "pawn" = "pawn";
let sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

export const pawnLoad = (
    scene: Phaser.Scene,
) => {
    scene.load.spritesheet(
        key,
        "images/factions/knights/troops/pawn/blue.png",
        {
            frameWidth: 192,
            frameHeight: 192
        }
    );
}

export const pawnCreate = (
    scene: Phaser.Scene,
) => {
    scene.anims.create({
        key: `${key}Idle`,
        frames: scene.anims.generateFrameNumbers(
            key,
            {
                start: 0,
                end: 5,
            }
        ),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: `${key}Walk`,
        frames: scene.anims.generateFrameNumbers(
            key,
            {
                start: 6,
                end: 11,
            }
        ),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: `${key}HammerBlow`,
        frames: scene.anims.generateFrameNumbers(
            key,
            {
                start: 12,
                end: 17
            }
        ),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 1000
    });

    sprite = scene.physics.add.sprite(250, 300, key);
    sprite.setScale(1);
    sprite.anims.play(`${key}Idle`);
}

export const pawnUpdate = (delta: number) => {
    pawnMove(delta);
}

const pawnMove = (delta: number) => {
    if (sprite !== undefined) {
        sprite.setVelocityX(10);
        sprite.setVelocityY(10);
    }
}