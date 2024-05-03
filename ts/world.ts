import { Map, MapPreload } from "./map";
import { Pawn, PawnPreload } from "./pawn";
import { Sheep, SheepPreload } from "./sheep";

export const WorldPreload = (scene: Phaser.Scene) => {
    MapPreload(scene);
    PawnPreload(scene, "panw", "blue");
    SheepPreload(scene, "sheep");
}

export class World extends Phaser.Scene {
    map: Map;
    pawn: Pawn;
    sheep: Sheep;

    constructor() {
        super("world");
        this.map = new Map(this);
        this.pawn = new Pawn(this, "panw", this.map);
        this.sheep = new Sheep(this, "sheep", this.map);
    }

    preload() {
    }

    create() {
        this.map.create();
        this.pawn.create();
        this.sheep.create();
    }

    update(time: number, delta: number) {
        this.pawn.update(delta);
        this.sheep.update(delta);
    }
}