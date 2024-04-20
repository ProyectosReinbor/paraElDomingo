const scaleLayer = 0.75;

export const mapLoad = (
    scene: Phaser.Scene,
) => {
    scene.load.image("water", "images/terrain/water/water.png");
    scene.load.image("foam", "images/terrain/water/foam.png");
    scene.load.image("flat", "images/terrain/ground/flat.png");
    scene.load.image("shadow", "images/terrain/ground/shadows.png");
    scene.load.image("elevation", "images/terrain/ground/elevation.png");
    scene.load.tilemapTiledJSON("map", "map/map.json");
}

export const mapCreate = (
    scene: Phaser.Scene,
) => {
    const map = scene.make.tilemap({
        key: "map",
        tileWidth: 64,
        tileHeight: 64,
    });
    map.addTilesetImage("water", "water");
    map.addTilesetImage("foam", "foam");
    map.addTilesetImage("flat", "flat");
    map.addTilesetImage("shadow", "shadow");
    map.addTilesetImage("elevation", "elevation");

    map.createLayer("layer0/water", "water")?.setScale(scaleLayer);
    map.createLayer("layer0/foam", "foam")?.setScale(scaleLayer);
    map.createLayer("layer0/flatSand", "flat")?.setScale(scaleLayer);
    map.createLayer("layer0/shadow", "shadow")?.setScale(scaleLayer);
    map.createLayer("layer0/ladder", "elevation")?.setScale(scaleLayer);
    map.createLayer("layer0/elevation", "elevation")?.setScale(scaleLayer);
    map.createLayer("layer0/flatWall", "flat")?.setScale(scaleLayer);
    map.createLayer("layer0/flatElevation", "flat")?.setScale(scaleLayer);

    map.createLayer("layer1/shadow", "shadow")?.setScale(scaleLayer);
    map.createLayer("layer1/ladder", "elevation")?.setScale(scaleLayer);
    map.createLayer("layer1/elevation", "elevation")?.setScale(scaleLayer);
    map.createLayer("layer1/flatWall", "flat")?.setScale(scaleLayer);
    map.createLayer("layer1/flatElevation", "flat")?.setScale(scaleLayer);
}