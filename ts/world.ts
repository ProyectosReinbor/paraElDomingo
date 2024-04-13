//     create() {
//         this.map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
//         this.tileset = this.map.addTilesetImage("tiles");
//         this.layer = this.map.createLayer("Level1", this.tileset);

//         this.map.setCollision([20, 48]);

//         this.pickups = this.map.filterTiles(tile => tile.index === 82);

//         this.player = this.add.rectangle(96, 96, 24, 38, 0xffff00);

//         this.physics.add.existing(this.player);

//         this.physics.add.collider(this.player, this.layer);

//         this.cursors = this.input.keyboard.createCursorKeys();

//         this.cursors.up.on("down", () => {
//             if (this.player.body.blocked.down) {
//                 this.player.body.setVelocityY(-360);
//             }
//         }, this);
//     }

//     update() {
//         this.player.body.setVelocityX(0);

//         if (this.cursors.left.isDown) {
//             this.player.body.setVelocityX(-200);
//         }
//         else if (this.cursors.right.isDown) {
//             this.player.body.setVelocityX(200);
//         }

//         this.physics.world.overlapTiles(this.player, this.pickups, this.hitPickup, null, this);
//     }

//     hitPickup(player, tile) {
//         this.map.removeTile(tile, 29, false);

//         this.pickups = this.map.filterTiles(tile => tile.index === 82);
//     }
// }

export class World extends Phaser.Scene {
    preload() {
        this.load.image("water", "images/terrain/water/water.png");
        this.load.image("foam", "images/terrain/water/foam.png");
        this.load.image("flat", "images/terrain/ground/flat.png");
        this.load.image("shadow", "images/terrain/ground/shadows.png");
        this.load.image("elevation", "images/terrain/ground/elevation.png");
        this.load.tilemapTiledJSON("map", "map/map.json");

        this.load.spritesheet("pawn", "images/factions/knights/troops/pawn/blue.png", { frameWidth: 192, frameHeight: 192 });
    }

    create() {
        const map = this.make.tilemap({ key: "map", tileWidth: 64, tileHeight: 64 });
        map.addTilesetImage("water", "water");
        map.addTilesetImage("foam", "foam");
        map.addTilesetImage("flat", "flat");
        map.addTilesetImage("shadow", "shadow");
        map.addTilesetImage("elevation", "elevation");

        const floor0 = {
            water: map.createLayer("layer0/water", "water"),
            foam: map.createLayer("layer0/foam", "foam"),
            flatSand: map.createLayer("layer0/flatSand", "flat"),
            shadow: map.createLayer("layer0/shadow", "shadow"),
            ladder: map.createLayer("layer0/ladder", "elevation"),
            elevation: map.createLayer("layer0/elevation", "elevation"),
            flatWall: map.createLayer("layer0/flatWall", "flat"),
            flatElevation: map.createLayer("layer0/flatElevation", "flat"),
        };

        const floor1 = {
            shadow: map.createLayer("layer1/shadow", "shadow"),
            ladder: map.createLayer("layer1/ladder", "elevation"),
            elevation: map.createLayer("layer1/elevation", "elevation"),
            flatWall: map.createLayer("layer1/flatWall", "flat"),
            flatElevation: map.createLayer("layer1/flatElevation", "flat"),
        }

        if (

            floor0.flatSand !== null &&
            floor0.water !== null &&
            floor0.foam !== null &&
            floor0.shadow !== null &&
            floor0.ladder !== null &&
            floor0.elevation !== null &&
            floor0.flatWall !== null &&
            floor0.flatElevation !== null &&

            floor1.shadow !== null &&
            floor1.ladder !== null &&
            floor1.elevation !== null &&
            floor1.flatWall !== null &&
            floor1.flatElevation !== null
        ) {
            const scaleLayer = 0.75;
            floor0.water.setScale(scaleLayer);
            floor0.foam.setScale(scaleLayer);
            floor0.flatSand.setScale(scaleLayer);
            floor0.shadow.setScale(scaleLayer);
            floor0.ladder.setScale(scaleLayer);
            floor0.elevation.setScale(scaleLayer);
            floor0.flatWall.setScale(scaleLayer);
            floor0.flatElevation.setScale(scaleLayer);

            floor1.shadow.setScale(scaleLayer);
            floor1.ladder.setScale(scaleLayer);
            floor1.elevation.setScale(scaleLayer);
            floor1.flatWall.setScale(scaleLayer);
            floor1.flatElevation.setScale(scaleLayer);
        }

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("pawn", { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("pawn", { frames: [6, 7, 8, 9, 10, 11] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "hammerBlow",
            frames: this.anims.generateFrameNumbers("pawn", { frames: [12, 13, 14, 15, 16, 17] }),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 1000
        });

        const pawnSprite = this.add.sprite(250, 300, "pawn");
        pawnSprite.setScale(1);
        pawnSprite.play("walk");
    }
}