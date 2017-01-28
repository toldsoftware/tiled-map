import { Map, MapShape, ViewPort } from '../src/tiled-map';
import { KenneyXmlLoader } from '../src/sprite-sheet/kenney-xml-loader';
import { CanvasRenderer } from '../src/renderer/canvas-renderer';
import { createMapWithSpriteSheetSamples } from '../src/loader';

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
        67,
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

    setTimeout(() => {
        r.draw(map, viewPort);
    }, 250);

    console.log('load_async END');
}

export function load() { load_async().then(); }
load();