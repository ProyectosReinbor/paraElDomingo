const key: "sheep" = "sheep";
let sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
const velocity: number = 30;

export const sheepLoad = (
    scene: Phaser.Scene,
) => {
    scene.load.spritesheet(
        key,
        "images/resources/sheep.png",
        {
            frameWidth: 64 * 2,
            frameHeight: 64 * 2,
        }
    );
}

export const sheepCreate = (
    scene: Phaser.Scene,
) => {
    scene.anims.create({
        key: `${key}Idle`,
        frames: scene.anims.generateFrameNumbers(
            key,
            {
                start: 0,
                end: 7,
            }
        ),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: `${key}Jump`,
        frames: scene.anims.generateFrameNumbers(
            key,
            {
                start: 8,
                end: 13,
            }
        ),
        frameRate: 8,
    });

    sprite = scene.physics.add.sprite(250, 300, key);
    sprite.setScale(1);
    sprite.anims.play(`${key}Idle`);
}

export const sheepUpdate = (delta: number) => {
    SheepMove(delta);
}

const SheepMove = (delta: number) => {
    if (sprite !== undefined) {
        sprite.setVelocityX(velocity);
        sprite.setVelocityY(velocity);
    }
}