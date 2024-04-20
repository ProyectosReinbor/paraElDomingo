import { Map } from "./map";
import { Pawn } from "./pawn";
import { Sheep } from "./sheep";

export class World extends Phaser.Scene {

    map: Map;
    pawn: Pawn;
    sheep: Sheep;

    constructor() {
        super("world");
        this.map = new Map(this);
        this.pawn = new Pawn(this);
        this.sheep = new Sheep(this);
    }

    static preload(
        scene: Phaser.Scene,
    ) {
        Map.preload(scene);
        Pawn.preload(scene);
        Sheep.preload(scene);
    }


    create() {
        this.map.create();
        this.pawn.create();
        this.sheep.create();
        if (this.sheep.sprite === undefined) return;
        if (this.map.layer0Elevation === undefined) return;
        console.log("addCollider");
        this.physics.add.collider(this.sheep.sprite, this.map.layer0Elevation);
    }

    update(time: number, delta: number) {
        this.pawn.update(delta);
        this.sheep.update(delta);
    }
}