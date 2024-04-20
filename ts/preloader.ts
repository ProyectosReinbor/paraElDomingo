import { World } from "./world";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        World.preload(this);
    }

    create() {
        this.scene.start("world");
    }
}
