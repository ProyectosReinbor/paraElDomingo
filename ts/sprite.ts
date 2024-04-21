export class Sprite {
    protected speed: number;
    protected spriteSheetKey: string;
    protected scene: Phaser.Scene;
    protected sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(
        scene: Phaser.Scene,
        spriteSheetKey: string,
        speed: number,
    ) {
        this.scene = scene;
        this.spriteSheetKey = spriteSheetKey;
        this.speed = speed;
    }

    protected SpritePreload() {
        this.cursors = this.scene.input.keyboard?.createCursorKeys();
    }

    protected SpritePhysicsAddCollider(layer: Phaser.Tilemaps.TilemapLayer | null) {
        if (layer !== null)
            this.scene.physics.add.collider(this.sprite, layer);
    }

    protected SpriteCreate(
        x: number,
        y: number
    ) {
        this.sprite = this.scene.physics.add.sprite(x, y, this.spriteSheetKey);
        this.sprite.body.setSize(40, 40);
        this.sprite.body.setCollideWorldBounds(true);
    }

    protected SpriteMove(delta: number) {
        const velocity = this.speed * delta;

        if (this.cursors?.left?.isDown) {
            this.sprite.setVelocityX(-velocity);
            this.sprite.body.offset.x = 115;
            this.sprite.scaleX = -1;
        }
        else if (this.cursors?.right?.isDown) {
            this.sprite.setVelocityX(velocity);
            this.sprite.body.offset.x = 75;
            this.sprite.scaleX = 1;
        }
        else
            this.sprite.setVelocityX(0);

        if (this.cursors?.up?.isDown)
            this.sprite.setVelocityY(-velocity);

        else if (this.cursors?.down?.isDown)
            this.sprite.setVelocityY(velocity);

        else
            this.sprite.setVelocityY(0);
    }
}