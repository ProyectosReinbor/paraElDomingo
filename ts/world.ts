import { Map, MapPreload } from "./map";
import { Pawn, PawnPreload } from "./pawn";
import { Sheep, SheepPreload } from "./sheep";

export const WorldPreload = (scene: Phaser.Scene) => {
    MapPreload(scene);
    PawnPreload(scene);
    SheepPreload(scene);
}

export class World extends Phaser.Scene {
    map: Map;
    pawn: Pawn;
    sheep: Sheep;

    constructor() {
        super("world");
        this.map = new Map(this);
        this.pawn = new Pawn(this, this.map);
        this.sheep = new Sheep(this, this.map);
    }

    preload() {
        this.pawn.preload();
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