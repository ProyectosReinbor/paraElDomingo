import Phaser from "phaser";
import { World } from "./world";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    scene: World
};

new Phaser.Game(config);