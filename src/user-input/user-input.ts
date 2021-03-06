import { ViewPort, Map, Tile, TileItem } from '../tiled-map';

export interface UserInput {
    u: number;
    v: number;
    duration: number;

    x: number;
    y: number;
    type: UserInputType;
    isTouch: boolean;

    isMultiple: boolean;
    inputCount: number;
    u2: number;
    v2: number;
    x2: number;
    y2: number;

    tilesUnder?: Tile[];
    tileItemsUnder?: TileItem[];
}

export enum UserInputType {
    Move,
    Start,
    Drag,
    End,
    ChangeToMultipleStart,
    MultipleEnd,
    MultipleEndAfter,
}

const TILE_Y_OFFSET = 0.3;

export function getTilesAtInput(map: Map, input: UserInput) {
    if (input.tilesUnder) {
        return { tilesUnder: input.tilesUnder, tileItemsUnder: input.tileItemsUnder };
    }

    let tilesUnder: Tile[] = [];
    let tileItemsUnder: TileItem[] = [];

    let x = input.x;
    let y = input.y;
    let tw = map.tileWidth;
    let th = map.tileHeight;

    let tyo = TILE_Y_OFFSET * th;

    for (let i = 0; i < map.tiles.length; i++) {
        let column = map.tiles[i];
        for (let j = 0; j < column.length; j++) {
            let tile = column[j];
            let isTileUnder = false;

            if (tile.x <= x && tile.x + tw >= x
                && tile.y - tyo <= y && tile.y - tyo + th >= y
            ) {
                tilesUnder.push(tile);
                isTileUnder = true;
            }

            for (let k = 0; k < tile.stack.length; k++) {
                let tileItem = tile.stack[k];

                if (tileItem.x <= x && tileItem.x + tileItem.sprite.width >= x
                    && tileItem.y <= y && tileItem.y + tileItem.sprite.height >= y
                ) {
                    tileItemsUnder.push(tileItem);

                    // if (!isTileUnder) {
                    //     tilesUnder.push(tile);
                    // }
                }
            }
        }
    }

    // console.log('getTilesAtInput', tilesUnder, tileItemsUnder);

    input.tilesUnder = tilesUnder;
    input.tileItemsUnder = tileItemsUnder;
    return { tilesUnder, tileItemsUnder };
}


export function getNearestTile(map: Map, tilesUnder: Tile[], input: UserInput) {
    if (tilesUnder.length === 0) {
        return null;
    }

    return tilesUnder.map(t => ({
        t,
        dx: t.x + map.tileWidth * 0.5 - input.x,
        dy: t.y + map.tileHeight * (0.5 - TILE_Y_OFFSET) - input.y
    })).map(t => ({ distSqr: t.dx * t.dx + t.dy * t.dy, ...t }))
        .reduce((out, t) => out.distSqr < t.distSqr ? out : t)
        .t;
}


export enum NearestTileMode {
    AnyTop,
    TopExceptBottom,
    TopIsBottom,
    Any
}

export function getNearestTileItem(tileItemsUnder: TileItem[], input: UserInput, mode = NearestTileMode.AnyTop) {

    let items = tileItemsUnder;

    if (mode !== NearestTileMode.Any) {
        items = items
            .filter(t => t.tile.stack[t.tile.stack.length - 1] === t);
    }

    switch (mode) {
        case NearestTileMode.TopExceptBottom:
            items = items.filter(t => t.tile.stack.length > 1);
            break;
        case NearestTileMode.TopIsBottom:
            items = items.filter(t => t.tile.stack.length === 1);
            break;
    }

    if (items.length === 0) {
        return null;
    }

    return items
        .map(t => ({
            t,
            dx: t.x + t.sprite.xBottomCenter_fromTopLeft - input.x,
            dy: t.y + t.sprite.yBottomCenter_fromTopLeft - t.sprite.height * 0.5 - input.y
        })).map(t => ({ distSqr: t.dx * t.dx + t.dy * t.dy, ...t }))
        .reduce((out, t) => out.distSqr < t.distSqr ? out : t)
        .t;
}

export enum TargetTileItemMode {
    SelectByBase,
    SelectByTop,
    SelectByBaseOrTop
}

export function getTargetTileItem(map: Map, input: UserInput, mode: TargetTileItemMode) {

    let { tilesUnder, tileItemsUnder } = getTilesAtInput(map, input);

    let nearestTile = getNearestTile(map, tilesUnder, input);

    let exceptMoving = tileItemsUnder.filter(t => t !== movingTileItem);
    let nearestTileItem = getNearestTileItem(exceptMoving, input);

    let n: TileItem[] = [];
    if (mode !== TargetTileItemMode.SelectByTop && nearestTile) {
        n.push(...nearestTile.stack);
    }

    if (mode !== TargetTileItemMode.SelectByBase && nearestTileItem) {
        n.push(nearestTileItem);
    }

    let nearestOfAll = getNearestTileItem(n, input, NearestTileMode.Any);
    return nearestOfAll;
}

let highlightedTileItems: TileItem[];

export class TileHighlighter {
    oldTilesUnder: Tile[] = [];
    oldTileItemsUnder: TileItem[] = [];
    unhighlightTimeoutId: number;

    constructor(private map: Map) {
    }

    cancel() {
        this.unhighlight();
        highlightedTileItems = [];
        this.oldTilesUnder = [];
        this.oldTileItemsUnder = [];
    }

    unhighlight() {
        for (let t of this.oldTileItemsUnder) {
            t.shouldHighlight = false;
            t.shouldBringToFront = false;
        }

        for (let tile of this.oldTilesUnder) {
            for (let t of tile.stack) {
                t.shouldHighlight = false;
                t.shouldBringToFront = false;
            }
        }
    }

    handleInput(input: UserInput) {
        // if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);

        this.unhighlight();

        clearTimeout(this.unhighlightTimeoutId);
        this.unhighlightTimeoutId = setTimeout((() => {
            this.unhighlight();
        }), 1000);

        this.oldTilesUnder = [];
        this.oldTileItemsUnder = [];
        highlightedTileItems = [];

        let selectedItem = getTargetTileItem(this.map, input, movingTileItem === null ? TargetTileItemMode.SelectByTop : TargetTileItemMode.SelectByTop);
        if (selectedItem == null) { return; }

        let stack = selectedItem.tile.stack;

        let k = 0;
        for (let t of stack) {
            t.shouldHighlight = true;
            // t.shouldBringToFront = k > 0 && movingTileItem != null;
            // t.shouldBringToFront = movingTileItem != null ? k > 0 : true;
            t.shouldBringToFront = k > 0;
            this.oldTileItemsUnder.push(t);
            highlightedTileItems.push(t);
            k++;
        }

    }
}

let movingTileItem: TileItem;

export class TileMover {

    isWaiting: boolean;
    previewTileItem: TileItem;
    activeTileItem: TileItem;
    dxStart: number;
    dyStart: number;
    xStart: number;
    yStart: number;
    zStart: number;

    constructor(private map: Map, private shouldClone: boolean) {
    }

    removeFromFloating(tileItem: TileItem) {
        // let i = this.map.tileItems_floating.indexOf(tileItem);
        // if (i >= 0) {
        //     this.map.tileItems_floating.splice(i, 1);
        // }

        // TEMP
        this.map.tileItems_floating = [];
    }

    cancel() {

        if (!this.activeTileItem) {
            return;
        }

        // Return to old position
        this.activeTileItem.x = this.xStart;
        this.activeTileItem.y = this.yStart;
        this.activeTileItem.zIndex = this.zStart;
        this.activeTileItem.opacity = 1;
        this.activeTileItem.shouldHighlight = false;

        // Remove floating item
        this.removeFromFloating(this.activeTileItem);
        this.removeFromFloating(this.previewTileItem);

        this.activeTileItem = null;
        this.previewTileItem = null;
        movingTileItem = null;
    }

    handleInput(input: UserInput) {
        if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        if (!this.activeTileItem) {
            if (input.type === UserInputType.Start) {
                // let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
                // let target = getNearestTileItem(tileItemsUnder, input, NearestTileMode.TopExceptBottom);
                // if (!target) { return; }

                let target = getTargetTileItem(this.map, input, TargetTileItemMode.SelectByTop);
                if (!target || target.tile.stack.length === 1) { return; }

                this.activeTileItem = target;
                this.dxStart = this.activeTileItem.x - input.x;
                this.dyStart = this.activeTileItem.y - input.y;
                this.xStart = this.activeTileItem.x;
                this.yStart = this.activeTileItem.y;
                this.zStart = this.activeTileItem.zIndex;

                this.isWaiting = true;
                console.log('TileMover WAIT');
            }

            return;
        }


        if (this.isWaiting) {
            let isDoneWaiting = input.duration > MAX_DURATION_START_MOVE;
            if (!isDoneWaiting) { return; }

            this.isWaiting = false;
            console.log('TileMover START');

            let target = this.activeTileItem;

            if (this.shouldClone) {
                target = new TileItem(target);
                // nearestTileItem.tile.stack.push(nearestTileItem);
                this.map.tileItems_floating.push(target);
                target.tile = null;
            }

            this.activeTileItem = target;
            this.activeTileItem.opacity = 0.0;

            this.previewTileItem = new TileItem(target);
            this.previewTileItem.tile = null;
            this.previewTileItem.opacity = 1;
            this.previewTileItem.shouldHighlight = true;
            this.previewTileItem.shouldBringToFront = true;
            this.previewTileItem.zIndex = 100000;

            this.map.tileItems_floating.push(this.previewTileItem);
        }

        // Move Tile
        // this.activeTileItem.x = input.x + this.dxStart;
        // this.activeTileItem.y = input.y + this.dyStart;
        // this.activeTileItem.shouldHighlight = true;
        // this.activeTileItem.shouldBringToFront = true;
        // this.activeTileItem.zIndex = 10000;
        // this.activeTileItem.opacity = 0.5;
        // this.activeTileItem.opacity = 0.0;

        // Show Preview
        let oldTile = this.activeTileItem.tile;
        let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);

        if (oldTile && tilesUnder.some(t => t === oldTile)) {
            // this.removeFromFloating(this.previewTileItem);
            this.previewTileItem.x = this.xStart;
            this.previewTileItem.y = this.yStart;
            this.previewTileItem.zIndex = this.zStart;
        } else {
            let newTileItem = getNearestTileItem(highlightedTileItems.filter(x => x !== this.activeTileItem), input);
            if (newTileItem == null) { return; }
            let newTile = newTileItem.tile;
            this.setPositionFromTileTop(this.previewTileItem, newTile);
            // this.map.tileItems_floating.push(this.previewTileItem);
        }

        // Drop
        if (input.type === UserInputType.End) {
            // Move Stack
            console.log('Move Stack', oldTile, this.activeTileItem, tilesUnder);

            if (oldTile && tilesUnder.some(t => t === oldTile)) {
                // Return to old position
                this.activeTileItem.x = this.xStart;
                this.activeTileItem.y = this.yStart;
                this.activeTileItem.zIndex = this.zStart;
            } else {
                // Move to new stack
                // let newTile = getNearestTile(this.map, tilesUnder, input);
                let newTileItem = getNearestTileItem(highlightedTileItems.filter(x => x !== this.activeTileItem), input);
                if (newTileItem == null) { return; }
                let newTile = newTileItem.tile;

                // Calculate New position          
                this.setPositionFromTileTop(this.activeTileItem, newTile);

                // Change stack
                if (oldTile) {
                    oldTile.stack.splice(oldTile.stack.indexOf(this.activeTileItem), 1);
                }
                newTile.stack.push(this.activeTileItem);
                this.activeTileItem.tile = newTile;

            }

            this.removeFromFloating(this.activeTileItem);
            this.removeFromFloating(this.previewTileItem);

            let a = this.activeTileItem;
            setTimeout((() => {
                a.shouldHighlight = false;
                a.shouldBringToFront = false;
            }), 200);

            this.activeTileItem.opacity = 1;
            this.activeTileItem = null;
            this.previewTileItem = null;

            console.log('TileMover DONE');
        }

        movingTileItem = this.activeTileItem;
    }

    setPositionFromTileTop(tileItem: TileItem, newTile: Tile) {
        tileItem.x = newTile.x + this.map.tileWidth * 0.5 - tileItem.sprite.xBottomCenter_fromTopLeft;
        tileItem.y = newTile.y + this.map.tileHeight - tileItem.sprite.yBottomCenter_fromTopLeft;
        tileItem.y -= newTile.stack.reduce((out, t) => out += t.sprite.stackHeight, 0);
        tileItem.zIndex = newTile.zIndex + newTile.stack.length * 0.1;
    }
}

const MAX_DURATION_START_MOVE = 250;
const MIN_DISTANCE_START_MOVE_SQ = 0.03 * 0.03;

export class ViewportMover {
    mightDrag: boolean;
    isDragging: boolean;
    uStart: number;
    vStart: number;

    constructor(private map: Map, private viewPort: ViewPort) {
    }

    cancel() {
        this.isDragging = false;
    }

    handleInput(input: UserInput) {
        if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        if (this.mightDrag) {
            if (input.type === UserInputType.Drag && input.duration < MAX_DURATION_START_MOVE) {
                let distanceSq =
                    (this.uStart - input.u) * (this.uStart - input.u)
                    + (this.vStart - input.v) * (this.vStart - input.v);

                if (distanceSq > MIN_DISTANCE_START_MOVE_SQ) {
                    // Start Moving
                    console.log('Start Move');

                    this.isDragging = true;
                    this.mightDrag = false;
                }
            }
        }

        if (!this.isDragging) {
            if (input.type !== UserInputType.Start) { return; }

            // Only immediate drag if base tile
            let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            if (tileItemsUnder.some(x => x.tile.stack.length > 1)) {

                console.log('Might Move');
                this.mightDrag = true;
                this.uStart = input.u;
                this.vStart = input.v;
                return;
            }

            this.isDragging = true;
            this.uStart = input.u;
            this.vStart = input.v;
        }

        let du = input.u - this.uStart;
        let dv = input.v - this.vStart;

        let w = this.viewPort.xRight - this.viewPort.xLeft;
        let h = this.viewPort.yBottom - this.viewPort.yTop;

        let dx = du * w;
        let dy = dv * h;

        this.viewPort.xLeft -= dx;
        this.viewPort.yTop -= dy;
        this.viewPort.xRight = this.viewPort.xLeft + w;
        this.viewPort.yBottom = this.viewPort.yTop + h;

        this.uStart = input.u;
        this.vStart = input.v;

        if (input.type === UserInputType.End) {
            this.isDragging = false;
        }
    }
}

export function scaleToViewport(uv: { u: number, v: number }, viewPort: ViewPort) {
    let u = uv.u;
    let v = uv.v;

    // Scale to clip
    u = (u - viewPort.clip_uLeft) / (viewPort.clip_uRight - viewPort.clip_uLeft);
    v = (v - viewPort.clip_vTop) / (viewPort.clip_vBottom - viewPort.clip_vTop);

    return { u, v };
}

export class ViewportScroller {

    stopTimeoutId: number;
    animationId: number;
    dx: number;
    dy: number;
    speed = 20;

    constructor(private map: Map, private viewPort: ViewPort) {
    }

    cancel() {
        this.stop();
    }

    handleInput(input: UserInput) {

        let r = 0.1;

        let dx = 0;
        let dy = 0;

        let {u, v} = scaleToViewport(input, this.viewPort);

        if (u < r && u >= 0) {
            dx = -1 * Math.pow(1 - (u / r), 2);
        }

        if (u > 1 - r && u <= 1) {
            dx = 1 * Math.pow(1 - ((1 - u) / r), 2);
        }

        if (v < r && v >= 0) {
            dy = -1 * Math.pow(1 - (v / r), 2);
        }

        if (v > 1 - r && v <= 1) {
            dy = 1 * Math.pow(1 - ((1 - v) / r), 2);
        }

        this.dx = dx;
        this.dy = dy;

        // console.log(dx, dy);

        if (dx === 0 && dy === 0) {
            return;
        }

        cancelAnimationFrame(this.animationId);
        this.animationId = requestAnimationFrame(() => this.animate());

        clearTimeout(this.stopTimeoutId);
        this.stopTimeoutId = setTimeout(() => this.stop(), 3000);
    }

    stop() {
        this.dx = 0;
        this.dy = 0;
    }

    animate() {

        if (this.dx === 0 && this.dy === 0) {
            return;
        }

        let w = this.viewPort.xRight - this.viewPort.xLeft;
        let h = this.viewPort.yBottom - this.viewPort.yTop;

        let scale = w / 1600;

        this.viewPort.xLeft += this.dx * this.speed * scale;
        this.viewPort.yTop += this.dy * this.speed * scale;

        this.viewPort.xRight = this.viewPort.xLeft + w;
        this.viewPort.yBottom = this.viewPort.yTop + h;

        cancelAnimationFrame(this.animationId);
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

export class ViewportResizer {
    constructor(private viewPort: ViewPort, private host: { height: number, width: number }) { }

    resize(scaleRatio = 1, uOrigin = 0.5, vOrigin = 0.5) {

        let hw = this.host.width * (this.viewPort.clip_uRight - this.viewPort.clip_uLeft);
        let hh = this.host.height * (this.viewPort.clip_vBottom - this.viewPort.clip_vTop);

        let w = this.viewPort.xRight - this.viewPort.xLeft;
        let scale = w / hw;
        let h = hh * scale;

        if (scaleRatio !== 1) {
            scale *= scaleRatio;
            w = hw * scale;
            h = hh * scale;
        }

        let wDiff = w - (this.viewPort.xRight - this.viewPort.xLeft);
        let hDiff = h - (this.viewPort.yBottom - this.viewPort.yTop);

        this.viewPort.xLeft -= wDiff * uOrigin;
        this.viewPort.yTop -= hDiff * vOrigin;
        this.viewPort.xRight += wDiff * (1 - uOrigin);
        this.viewPort.yBottom += hDiff * (1 - vOrigin);
    }
}

export class ViewportMultiTouchScroller {

    multipleDistanceStart: number;
    multipleUStart: number;
    multipleVStart: number;
    multipleU2Start: number;
    multipleV2Start: number;

    constructor(private map: Map, private viewPort: ViewPort, private resizer: ViewportResizer) { }

    handleInput(input: UserInput) {
        if (input.type === UserInputType.ChangeToMultipleStart) {
            // Start Multiple
            this.multipleDistanceStart = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
            this.multipleUStart = input.u;
            this.multipleVStart = input.v;
            this.multipleU2Start = input.u2;
            this.multipleV2Start = input.v2;
        } else if (input.type === UserInputType.Drag || input.type === UserInputType.MultipleEndAfter || input.type === UserInputType.MultipleEnd) {

            // Move (1 Nearest Finger)
            let du = input.u - this.multipleUStart;
            let dv = input.v - this.multipleVStart;
            let du2 = input.u - this.multipleU2Start;
            let dv2 = input.v - this.multipleV2Start;

            du = Math.abs(du) < Math.abs(du2) ? du : du2;
            dv = Math.abs(dv) < Math.abs(dv2) ? dv : dv2;

            let dx = (this.viewPort.xRight - this.viewPort.xLeft) * du;
            let dy = (this.viewPort.yBottom - this.viewPort.yTop) * dv;
            this.viewPort.xLeft -= dx;
            this.viewPort.yTop -= dy;
            this.viewPort.xRight -= dx;
            this.viewPort.yBottom -= dy;

            this.multipleUStart = input.u;
            this.multipleVStart = input.v;
            this.multipleU2Start = input.u2;
            this.multipleV2Start = input.v2;

            // Scale (2 Finger)
            if (input.inputCount > 1) {
                let dist = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));

                let scale = this.multipleDistanceStart / dist;
                this.resizer.resize(scale, (input.u + input.u2) * 0.5, (input.v + input.v2) * 0.5);

                this.multipleDistanceStart = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
            }
        }
    }
}