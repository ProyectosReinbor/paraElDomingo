import { Pawn } from "./pawn";
import { Sheep } from "./sheep";

export class World extends Phaser.Scene {
    pawn: Pawn = new Pawn(this);
    sheep: Sheep = new Sheep(this);

    preload() {
        this.load.image("water", "images/terrain/water/water.png");
        this.load.image("foam", "images/terrain/water/foam.png");
        this.load.image("flat", "images/terrain/ground/flat.png");
        this.load.image("shadow", "images/terrain/ground/shadows.png");
        this.load.image("elevation", "images/terrain/ground/elevation.png");
        this.load.tilemapTiledJSON("map", "map/map.json");
        this.pawn.load();
        this.sheep.load();
    }

    create() {
        const map = this.make.tilemap({
            key: "map",
            tileWidth: 64,
            tileHeight: 64,
        });
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
        this.pawn.create();
        this.sheep.create();
    }

    update(time: number, delta: number) {
        this.pawn.update(time, delta);
        this.sheep.update(time, delta);
    }
}