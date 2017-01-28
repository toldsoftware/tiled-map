import { setupBrowser, Platform } from '@told/platform/lib/src';

import { SpriteSheetLoader } from './sprite-sheet/sprite-sheet-loader';
import { Map, MapShape, Tile } from './tiled-map';

setupBrowser();
const http = Platform.http();

export async function createMapWithSpriteSheetSamples(spriteSheetImageUrl: string, spriteSheetMetaDataUrl: string, defaultSpriteIndex: number,
    spriteSheetLoader: SpriteSheetLoader, shape: MapShape, tileWidth: number, tileHeight: number): Promise<Map> {
    let map: Map = {
        iZero: 100,
        jZero: 100,
        shape,
        tileWidth,
        tileHeight,
        tiles: [],
        tileItems_floating: [],
        defaultSprite: null
    };

    let iZero = map.iZero;
    let jZero = map.jZero;

    let image = new Image();
    image.src = spriteSheetImageUrl;

    let metaDataText = (await http.request(spriteSheetMetaDataUrl)).data;
    let spriteSheet = spriteSheetLoader.load(spriteSheetImageUrl, image, tileWidth, tileHeight, metaDataText);

    // Load default sprites
    let defaultSprite = map.defaultSprite = spriteSheet.sprites[defaultSpriteIndex];

    for (let i = 0; i < iZero * 2; i++) {
        for (let j = 0; j < jZero * 2; j++) {
            let s = defaultSprite;

            let {xBottomCenter, yBottomCenter, zIndex} = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero);

            let x = xBottomCenter - s.width * 0.5;
            let y = yBottomCenter - s.height;

            map.tiles[i] = map.tiles[i] || [];
            let tile = map.tiles[i][j] = map.tiles[i][j] || {
                stack: [],
                x: xBottomCenter - tileWidth * 0.5,
                y: yBottomCenter - tileHeight,
                zIndex
            };

            tile.stack.push({
                tile,
                sprite: s,
                x,
                y,
                zIndex,
                opacity: 1,
                shouldHighlight: false,
                shouldBringToFront: false
            });
        }
    }

    // Load Sample Sprites
    let spriteCount = spriteSheet.sprites.length;
    let columns = Math.ceil(Math.sqrt(spriteCount));
    let rows = columns;
    let iSprite = 0;

    for (let i = iZero; i < columns + iZero; i++) {
        for (let j = jZero; j < rows + jZero; j++) {
            let s = spriteSheet.sprites[iSprite];

            let {xBottomCenter, yBottomCenter, zIndex} = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero);

            let x = xBottomCenter - s.width * 0.5;
            let y = yBottomCenter - s.height;

            map.tiles[i] = map.tiles[i] || [];
            let tile = map.tiles[i][j] = map.tiles[i][j] || {
                stack: [],
                x,
                y,
                zIndex
            };

            tile.stack.push({
                tile,
                sprite: s,
                x,
                y: y - defaultSprite.stackHeight,
                zIndex: zIndex + 0.1,
                opacity: 1,
                shouldHighlight: false,
                shouldBringToFront: false
            });

            iSprite++;
            if (iSprite >= spriteCount) { break; }
        }

        if (iSprite >= spriteCount) { break; }
    }



    return map;
}

function getTilePosition(i: number, j: number, shape: MapShape, tileWidth: number, tileHeight: number, iZero: number, jZero: number): { xBottomCenter: number, yBottomCenter: number, zIndex: number } {

    let xPerI = tileWidth;
    let xPerJ = 0;
    let yPerI = 0;
    let yPerJ = tileHeight;
    let zIndexPerI = 0;
    let zIndexPerJ = 1;

    if (shape === MapShape.Isometric) {
        xPerI = tileWidth * 0.5;
        xPerJ = tileWidth * 0.5;
        yPerI = - tileHeight * 0.5;
        yPerJ = tileHeight * 0.5;
        zIndexPerI = -1;
        zIndexPerJ = 1;
    }

    return {
        xBottomCenter: (i - iZero) * xPerI + (j - jZero) * xPerJ,
        yBottomCenter: (i - iZero) * yPerI + (j - jZero) * yPerJ,
        zIndex: (i - iZero) * zIndexPerI + (j - jZero) * zIndexPerJ,
    };
}