import Phaser from "phaser";
import { World } from "./world";
import { Preloader } from "./preloader";

const config: Phaser.Types.Core.GameConfig = {
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
    scene: [Preloader, World],
};

new Phaser.Game(config);