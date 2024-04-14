import Phaser, { Physics } from "phaser";
import { World } from "./world";
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'tomorrow',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    pixelArt: true,
    scene: World,
};

new Phaser.Game(config);