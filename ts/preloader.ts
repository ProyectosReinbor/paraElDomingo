import { worldLoad } from "./world";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        worldLoad(this);
    }

    create() {
        this.scene.start("world");
    }
}
