import { WorldPreload } from "./world";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        WorldPreload(this);
    }

    create() {
        this.scene.start("world");
    }
}
