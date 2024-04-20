import { mapCreate, mapLoad } from "./map";
import { pawnLoad, pawnCreate, pawnUpdate } from "./pawn";
import { sheepLoad, sheepCreate, sheepUpdate } from "./sheep";

export const worldLoad = (
    scene: Phaser.Scene,
) => {
    mapLoad(scene);
    pawnLoad(scene);
    sheepLoad(scene);
}

export class World extends Phaser.Scene {
    constructor() {
        super("world");
    }

    create() {
        mapCreate(this);
        pawnCreate(this);
        sheepCreate(this);
    }

    update = (
        delta: number
    ) => {
        pawnUpdate(delta);
        sheepUpdate(delta);
    }
}