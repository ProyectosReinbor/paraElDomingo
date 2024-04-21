export const MapPreload = (scene: Phaser.Scene) => {
    scene.load.image("water", "images/terrain/water/water.png");
    scene.load.image("foam", "images/terrain/water/foam.png");
    scene.load.image("flat", "images/terrain/ground/flat.png");
    scene.load.image("shadow", "images/terrain/ground/shadows.png");
    scene.load.image("elevation", "images/terrain/ground/elevation.png");
    scene.load.tilemapTiledJSON("map", "map/map.json");
}

export class Map {
    private scene: Phaser.Scene;
    public floor0!: {
        water: Phaser.Tilemaps.TilemapLayer | null;
        foam: Phaser.Tilemaps.TilemapLayer | null;
        flatSand: Phaser.Tilemaps.TilemapLayer | null;
        shadow: Phaser.Tilemaps.TilemapLayer | null;
        ladder: Phaser.Tilemaps.TilemapLayer | null;
        elevation: Phaser.Tilemaps.TilemapLayer | null;
        flatWall: Phaser.Tilemaps.TilemapLayer | null;
        flatElevation: Phaser.Tilemaps.TilemapLayer | null;
    };

    public floor1!: {
        shadow: Phaser.Tilemaps.TilemapLayer | null;
        ladder: Phaser.Tilemaps.TilemapLayer | null;
        elevation: Phaser.Tilemaps.TilemapLayer | null;
        flatWall: Phaser.Tilemaps.TilemapLayer | null;
        flatElevation: Phaser.Tilemaps.TilemapLayer | null;
    }

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public create() {
        const scaleLayer = 0.75;
        const map = this.scene.make.tilemap({
            key: "map",
            tileWidth: 64,
            tileHeight: 64,
        });

        map.addTilesetImage("water", "water");
        map.addTilesetImage("foam", "foam");
        map.addTilesetImage("flat", "flat");
        map.addTilesetImage("shadow", "shadow");
        map.addTilesetImage("elevation", "elevation");

        this.floor0 = {
            water: map.createLayer("layer0/water", "water"),
            foam: map.createLayer("layer0/foam", "foam"),
            flatSand: map.createLayer("layer0/flatSand", "flat"),
            shadow: map.createLayer("layer0/shadow", "shadow"),
            ladder: map.createLayer("layer0/ladder", "elevation"),
            elevation: map.createLayer("layer0/elevation", "elevation"),
            flatWall: map.createLayer("layer0/flatWall", "flat"),
            flatElevation: map.createLayer("layer0/flatElevation", "flat"),
        }

        this.floor0.water?.setScale(scaleLayer);
        this.floor0.foam?.setScale(scaleLayer);
        this.floor0.flatSand?.setScale(scaleLayer);
        this.floor0.shadow?.setScale(scaleLayer);
        this.floor0.ladder?.setScale(scaleLayer);
        this.floor0.elevation?.setScale(scaleLayer);
        this.floor0.flatWall?.setScale(scaleLayer);
        this.floor0.flatElevation?.setScale(scaleLayer);

        this.floor0.elevation?.setCollisionByProperty({ collides: true });
        this.floor0.water?.setCollisionByProperty({ collides: true });

        this.floor1 = {
            shadow: map.createLayer("layer1/shadow", "shadow"),
            ladder: map.createLayer("layer1/ladder", "elevation"),
            elevation: map.createLayer("layer1/elevation", "elevation"),
            flatWall: map.createLayer("layer1/flatWall", "flat"),
            flatElevation: map.createLayer("layer1/flatElevation", "flat"),
        }

        this.floor1.shadow?.setScale(scaleLayer);
        this.floor1.ladder?.setScale(scaleLayer);
        this.floor1.elevation?.setScale(scaleLayer);
        this.floor1.flatWall?.setScale(scaleLayer);
        this.floor1.flatElevation?.setScale(scaleLayer);

        this.floor1.elevation?.setCollisionByProperty({ collides: true });

        const debugGraphics = this.scene.add.graphics().setAlpha(0.75);
        this.floor0.elevation?.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        });

        const debugGraphics1 = this.scene.add.graphics().setAlpha(0.75);
        this.floor1.elevation?.renderDebug(debugGraphics1, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        });

        const debugGraphics2 = this.scene.add.graphics().setAlpha(0.75);
        this.floor0.water?.renderDebug(debugGraphics2, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        });

        this.scene.physics.world.setBounds(0, 0, 1920, 1080);
    }
}