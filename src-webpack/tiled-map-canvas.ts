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

    let host = document.getElementById('host');
    let r = new CanvasRenderer(host);

    let viewPort = new ViewPort();
    viewPort.xLeft = -100;
    viewPort.yTop = -600;
    viewPort.xRight = 1500;
    viewPort.yBottom = 600;

    let resize = (scaleRatio = 1, uOrigin = 0.5, vOrigin = 0.5) => {
        let w = viewPort.xRight - viewPort.xLeft;
        let scale = w / host.clientWidth;
        let h = host.clientHeight * scale;

        if (scaleRatio !== 1) {
            scale *= scaleRatio;
            h = host.clientHeight * scale;
            w = host.clientWidth * scale;
        }

        let wDiff = w - (viewPort.xRight - viewPort.xLeft);
        let hDiff = h - (viewPort.yBottom - viewPort.yTop);

        viewPort.xLeft -= wDiff * uOrigin;
        viewPort.yTop -= hDiff * vOrigin;
        viewPort.xRight += wDiff * (1 - uOrigin);
        viewPort.yBottom += hDiff * (1 - vOrigin);
    };

    window.addEventListener('resize', () => resize());
    setTimeout(() => resize());

    window.addEventListener('mousewheel', (e) => {
        let amount = e.deltaY;

        if (amount > 0) {
            resize(1.1);
        } else if (amount < 0) {
            resize(0.8888);
        }
        console.log(e);
    });


    let tileHighlighter = new TileHighlighter(map);
    let tileMover = new TileMover(map, false);
    let tileCloner = new TileMover(map, true);
    // let viewPortMover = new ViewportMover(map, viewPort);
    let viewPortScroller = new ViewportScroller(map, viewPort);

    let multipleDistanceStart: number;
    let multipleUStart: number;
    let multipleVStart: number;
    let multipleU2Start: number;
    let multipleV2Start: number;

    let mode = 0;

    r.onInput = (input) => {

        // if (input.isMultiple) {

        //     return;
        // }

        if (input.isMultiple) {
            console.log('Input Multiple type=', input.type, input);

            if (input.type === UserInputType.ChangeToMultipleStart) {
                // Cancel any actions started
                viewPortScroller.cancel();
                tileHighlighter.cancel();
                tileMover.cancel();
                tileCloner.cancel();

                // Start Multiple
                multipleDistanceStart = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
                multipleUStart = input.u;
                multipleVStart = input.v;
                multipleU2Start = input.u2;
                multipleV2Start = input.v2;
            } else if (input.type === UserInputType.Drag || input.type === UserInputType.MultipleEndAfter || input.type === UserInputType.MultipleEnd) {

                // Move (1 Nearest Finger)
                let du = input.u - multipleUStart;
                let dv = input.v - multipleVStart;
                let du2 = input.u - multipleU2Start;
                let dv2 = input.v - multipleV2Start;

                du = Math.abs(du) < Math.abs(du2) ? du : du2;
                dv = Math.abs(dv) < Math.abs(dv2) ? dv : dv2;

                let dx = (viewPort.xRight - viewPort.xLeft) * du;
                let dy = (viewPort.yBottom - viewPort.yTop) * dv;
                viewPort.xLeft -= dx;
                viewPort.yTop -= dy;
                viewPort.xRight -= dx;
                viewPort.yBottom -= dy;

                multipleUStart = input.u;
                multipleVStart = input.v;
                multipleU2Start = input.u2;
                multipleV2Start = input.v2;

                // Scale (2 Finger)
                if (input.inputCount > 1) {
                    let dist = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));

                    let scale = multipleDistanceStart / dist;
                    resize(scale, (input.u + input.u2) * 0.5, (input.v + input.v2) * 0.5);

                    multipleDistanceStart = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
                }
            }

            return;
        }

        console.log('Input Single', input.type, input);

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