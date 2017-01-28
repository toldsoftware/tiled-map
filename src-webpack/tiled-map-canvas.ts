import { Map, MapShape, ViewPort } from '../src/tiled-map';
import { KenneyXmlLoader } from '../src/sprite-sheet/kenney-xml-loader';
import { CanvasRenderer } from '../src/renderer/canvas-renderer';
import { createMapWithSpriteSheetSamples } from '../src/loader';
import { UserInputType, TileMover, TileHighlighter, ViewportMover, ViewportScroller } from '../src/user-input/user-input';

// TODO: Load a test map

async function load_async() {
    console.log('load_async START');

    let map = await createMapWithSpriteSheetSamples(
        './kenney-isometric/landscapeTiles_sheet.png',
        './kenney-isometric/landscapeTiles_sheet.xml',
        // './kenney-isometric/cityTiles_sheet.png',
        // './kenney-isometric/cityTiles_sheet.xml',
        // './kenney-isometric/buildingTiles_sheet.png',
        // './kenney-isometric/buildingTiles_sheet.xml',
        // 67,
        83,
        new KenneyXmlLoader(), MapShape.Isometric, 128 + 4, 64 + 2);

    let viewPort = new ViewPort();
    viewPort.xLeft = -100;
    viewPort.yTop = -600;
    viewPort.xRight = 1600;
    viewPort.yBottom = 600;

    // viewPort.xLeft = 0;
    // viewPort.yTop = 0;
    // viewPort.xRight = 800;
    // viewPort.yBottom = 600;

    let r = new CanvasRenderer(document.getElementById('host'));

    let tileHighlighter = new TileHighlighter(map);
    let tileMover = new TileMover(map, false);
    let tileCloner = new TileMover(map, true);
    // let viewPortMover = new ViewportMover(map, viewPort);
    let viewPortScroller = new ViewportScroller(map, viewPort);

    let mode = 0;

    r.onInput = (input) => {
        tileHighlighter.handleInput(input);
        // viewPortMover.handleInput(input);
        if (!(input.u < 0.2 && input.v > 0.8)) {
            viewPortScroller.handleInput(input);
        } else {
            viewPortScroller.stop();
        }

        if (input.type === UserInputType.End
            && input.duration < 1000
            && input.u < 0.2 && input.v > 0.8) {
            mode++;
        }

        if (input.type === UserInputType.End
            && input.duration < 1000
            && input.u > 0.8 && input.v < 0.2) {
            save(map);
        }

        switch (mode % 2) {
            case 0:
                tileMover.handleInput(input);
                break;
            case 1:
                tileCloner.handleInput(input);
                break;
        }
    };

    let animate = () => {
        r.draw(map, viewPort);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    setTimeout(() => {
        r.draw(map, viewPort);
    }, 250);

    console.log('load_async END');
}

interface MapData {
    tiles: {
        i: number;
        j: number;
        k: number;
        type: {
            sheetUrl: string;
            x: number;
            y: number;
        }
    }[];
}

function save(map: Map) {
    let data: MapData = {
        tiles: []
    };

    for (let i = 0; i < map.tiles.length; i++) {
        let column = map.tiles[i];
        for (let j = 0; j < column.length; j++) {
            let tile = column[j];
            for (let k = 0; k < tile.stack.length; k++) {
                if (k > 0) {
                    let tileItem = tile.stack[k];
                    let sprite = tileItem.sprite;
                    data.tiles.push({
                        i, j, k,
                        type: {
                            sheetUrl: sprite.spriteSheet.url,
                            x: sprite.xSheet,
                            y: sprite.ySheet
                        }
                    });
                }
            }
        }
    }

    console.log(data);
    console.log(JSON.stringify(data));
}

export function setup() { load_async().then(); }
setup();