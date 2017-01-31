import { Map, MapShape, ViewPort, MapData } from '../src/tiled-map';
import { KenneyXmlLoader } from '../src/sprite-sheet/kenney-xml-loader';
import { CanvasRenderer } from '../src/renderer/canvas-renderer';
import { createMapWithSpriteSheetSamples, loadSpriteSheet } from '../src/loader';
import { UserInputType, TileMover, TileHighlighter, ViewportMover, ViewportScroller, ViewportResizer, ViewportMultiTouchScroller } from '../src/user-input/user-input';

// BUG: This is not working automatically 
// (it's loading a duplicate of the module and defeating the singleton)
import { Platform, setupBrowser } from '@told/platform/lib/src';
import { resolveUrlClient } from '@told/azure-functions-server/lib/src/resolve-url';
setupBrowser();
Platform.urlResolver = resolveUrlClient;

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

    let spriteSheet = await loadSpriteSheet('./kenney-isometric/landscapeTiles_sheet.png',
        './kenney-isometric/landscapeTiles_sheet.xml',
        map.defaultSprite,
        new KenneyXmlLoader(), MapShape.Isometric, 128 + 4, 64 + 2
        , './saves/landscape_layout.json');

    map = spriteSheet.layoutMap;

    let r = new CanvasRenderer(document.getElementById('host'));

    let viewPort = new ViewPort();
    viewPort.xLeft = -1600;
    viewPort.xRight = 1600;
    viewPort.yTop = -900;
    viewPort.yBottom = 900;
    viewPort.clip_uLeft = 0;
    viewPort.clip_uRight = 1;
    viewPort.clip_vTop = 0;
    // viewPort.clip_vBottom = 0.5;
    // viewPort.clip_vBottom = 0.9;
    viewPort.clip_vBottom = 1;

    let toolPanelViewPort = new ViewPort();
    toolPanelViewPort.xLeft = -1600;
    toolPanelViewPort.xRight = 1600;
    toolPanelViewPort.yTop = -900;
    toolPanelViewPort.yBottom = 900;
    toolPanelViewPort.clip_uLeft = 0;
    toolPanelViewPort.clip_uRight = 1;
    toolPanelViewPort.clip_vTop = 0.5;
    toolPanelViewPort.clip_vBottom = 1;

    let tileHighlighter = new TileHighlighter(map);
    let tileMover = new TileMover(map, false);
    let tileCloner = new TileMover(map, true);
    let viewportMover = new ViewportMover(map, viewPort);
    let viewportScroller = new ViewportScroller(map, viewPort);
    let viewportResizer = new ViewportResizer(viewPort, r);
    let viewportMultiTouchScroller = new ViewportMultiTouchScroller(map, viewPort, viewportResizer);

    let toolPanelViewportResizer = new ViewportResizer(toolPanelViewPort, r);

    // Handle resize
    r.onResize = () => {
        viewportResizer.resize();
        toolPanelViewportResizer.resize();
    };
    setTimeout(() => {
        viewportResizer.resize();
        toolPanelViewportResizer.resize();
    });

    r.onZoom = (scaleRatio) => {
        viewportResizer.resize(scaleRatio);
        toolPanelViewportResizer.resize(scaleRatio);
    };

    let mode = 0;

    r.onInput = (input) => {

        // if (input.isMultiple) {
        //     return;
        // }

        if (input.isMultiple) {
            // console.log('Input Multiple type=', input.type, input);

            if (input.type === UserInputType.ChangeToMultipleStart) {
                // Cancel any actions started
                viewportScroller.cancel();
                viewportMover.cancel();
                tileHighlighter.cancel();
                tileMover.cancel();
                tileCloner.cancel();
            }

            viewportMultiTouchScroller.handleInput(input);
            return;
        }

        // console.log('Input Single', input.type, input);

        viewportMover.handleInput(input);

        if (viewportMover.isDragging) {
            tileHighlighter.cancel();
            viewportScroller.cancel();
            tileMover.cancel();
            tileCloner.cancel();
            return;
        }

        tileHighlighter.handleInput(input);

        if (!(input.u < 0.2 && input.v > 0.8)) {
            viewportScroller.handleInput(input);
        } else {
            viewportScroller.cancel();
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
        r.clear();
        r.draw(map, viewPort);
        // r.draw(map, toolPanelViewPort);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    console.log('load_async END');
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

export function setup() {
    load_async().then().catch(err => console.error(err));
}
setup();