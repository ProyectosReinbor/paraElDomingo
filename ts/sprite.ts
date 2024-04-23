type SpriteOffset = { left: number, right: number };
type SpriteDirections = {
    x: "left" | "right" | "idle";
    y: "up" | "down" | "idle";
};

export class Sprite {
    protected speed: number;
    protected spriteSheetKey: string;
    protected scene: Phaser.Scene;
    protected offset: SpriteOffset;
    protected sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    protected directions: SpriteDirections = { x: "idle", y: "idle" };

    constructor(
        scene: Phaser.Scene,
        spriteSheetKey: string,
        speed: number,
        offset: SpriteOffset
    ) {
        this.scene = scene;
        this.spriteSheetKey = spriteSheetKey;
        this.speed = speed;
        this.offset = offset;
    }

    protected keyboardCreateCursorsKeys() {
        this.cursors = this.scene.input.keyboard?.createCursorKeys();
    }

    protected physicsAddCollider(layer: Phaser.Tilemaps.TilemapLayer | null) {
        if (layer !== null)
            this.scene.physics.add.collider(this.sprite, layer);
    }

    protected physicsAddSprite(
        x: number,
        y: number
    ) {
        this.sprite = this.scene.physics.add.sprite(x, y, this.spriteSheetKey);
        this.sprite.body.setSize(40, 40);
        this.sprite.body.setCollideWorldBounds(true);
    }

    protected cursorsSetDirections() {
        if (this.cursors === undefined)
            throw new Error("cursors is undefined");

        if (this.cursors.left.isDown)
            this.directions.x = "left";

        else if (this.cursors.right.isDown)
            this.directions.x = "right";

        else
            this.directions.x = "idle";

        if (this.cursors.up.isDown)
            this.directions.y = "up";

        else if (this.cursors.down.isDown)
            this.directions.y = "down";

        else
            this.directions.y = "idle";
    }

    protected setVelocityWithDirections(delta: number) {
        const velocity = this.speed * delta;

        if (this.directions.x === "left") {
            this.sprite.setVelocityX(-velocity);
            this.sprite.body.offset.x = this.offset.left;
            this.sprite.scaleX = -1;
        }
        else if (this.directions.x === "right") {
            this.sprite.setVelocityX(velocity);
            this.sprite.body.offset.x = this.offset.right;
            this.sprite.scaleX = 1;
        }
        else if (this.directions.x === "idle")
            this.sprite.setVelocityX(0);

        else
            throw new Error("direction x is invalid");

        if (this.directions.y === "up")
            this.sprite.setVelocityY(-velocity);

        else if (this.directions.y === "down")
            this.sprite.setVelocityY(velocity);

        else if (this.directions.y === "idle")
            this.sprite.setVelocityY(0);

        else
            throw new Error("direction y is invalid");
    }
}