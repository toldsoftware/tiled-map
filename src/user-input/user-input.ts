import { ViewPort, Map, Tile, TileItem } from '../tiled-map';

export interface UserInput {
    u: number;
    v: number;
    duration: number;

    x: number;
    y: number;
    type: UserInputType;

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

    for (let i = 0; i < map.tiles.length; i++) {
        let column = map.tiles[i];
        for (let j = 0; j < column.length; j++) {
            let tile = column[j];
            let isTileUnder = false;

            if (tile.x <= x && tile.x + tw >= x
                && tile.y <= y && tile.y + th >= y
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
        dy: t.y + map.tileHeight * 0.5 - input.y
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

        if (movingTileItem) {

            let nearestTile = getNearestTile(this.map, tilesUnder, input);

            let exceptMoving = tileItemsUnder.filter(t => t !== movingTileItem);
            let nearestTileItem = getNearestTileItem(exceptMoving, input);

            let n: TileItem[] = [];
            if (nearestTile) {
                n.push(...nearestTile.stack);
            }

            if (nearestTileItem) {
                n.push(nearestTileItem);
            }

            let nearestOfAll = getNearestTileItem(n, input, NearestTileMode.Any);

            if (nearestOfAll) {
                let stack = nearestOfAll.tile.stack;
                let k = 0;
                for (let t of stack) {
                    t.shouldHighlight = true;
                    t.shouldBringToFront = true;
                    // t.shouldBringToFront = k > 0;
                    this.oldTileItemsUnder.push(t);
                    highlightedTileItems.push(t);
                    k++;
                }
            }

            // if (nearestTile) {
            //     for (let t of nearestTile.stack) {
            //         t.shouldHighlight = true;
            //         this.oldTileItemsUnder.push(t);
            //     }
            // }
        } else {
            let nearestTileItem = getNearestTileItem(tileItemsUnder, input);
            if (nearestTileItem) {
                let stack = nearestTileItem.tile.stack;
                let k = 0;
                for (let t of stack) {
                    t.shouldHighlight = true;
                    t.shouldBringToFront = k > 0;
                    this.oldTileItemsUnder.push(t);
                    highlightedTileItems.push(t);
                    k++;
                }
                // nearestTileItem.shouldHighlight = true;
                // nearestTileItem.shouldBringToFront = nearestTileItem.tile.stack.indexOf(nearestTileItem) > 0;
                // this.oldTileItemsUnder = [nearestTileItem];
                // highlightedTileItems = [nearestTileItem];
            }
        }

    }
}

let movingTileItem: TileItem;

export class TileMover {

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
            if (input.type !== UserInputType.Start) { return; }

            let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            let nearestTileItem = getNearestTileItem(tileItemsUnder, input, NearestTileMode.TopExceptBottom);
            if (!nearestTileItem) { return; }

            if (this.shouldClone) {
                nearestTileItem = { ...nearestTileItem };
                // nearestTileItem.tile.stack.push(nearestTileItem);
                this.map.tileItems_floating.push(nearestTileItem);
                nearestTileItem.tile = null;
            }

            this.activeTileItem = nearestTileItem;
            this.dxStart = this.activeTileItem.x - input.x;
            this.dyStart = this.activeTileItem.y - input.y;
            this.xStart = this.activeTileItem.x;
            this.yStart = this.activeTileItem.y;
            this.zStart = this.activeTileItem.zIndex;

            this.previewTileItem = { ...nearestTileItem };
            this.previewTileItem.tile = null;
            this.previewTileItem.opacity = 0.3;
            this.previewTileItem.shouldHighlight = true;
            this.previewTileItem.shouldBringToFront = true;
        }

        // Move Tile
        this.activeTileItem.x = input.x + this.dxStart;
        this.activeTileItem.y = input.y + this.dyStart;
        this.activeTileItem.shouldHighlight = true;
        this.activeTileItem.shouldBringToFront = true;
        this.activeTileItem.zIndex = 10000;
        this.activeTileItem.opacity = 0.5;

        // Show Preview
        let oldTile = this.activeTileItem.tile;
        let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);

        if (oldTile && tilesUnder.some(t => t === oldTile)) {
            this.removeFromFloating(this.previewTileItem);
        } else {
            let newTileItem = getNearestTileItem(highlightedTileItems.filter(x => x !== this.activeTileItem), input);
            if (newTileItem == null) { return; }
            let newTile = newTileItem.tile;
            this.setPositionFromTileTop(this.previewTileItem, newTile);
            this.map.tileItems_floating.push(this.previewTileItem);
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
            }), 1000);

            this.activeTileItem.opacity = 1;
            this.activeTileItem = null;
            this.previewTileItem = null;
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

export class ViewportMover {
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

        if (!this.isDragging) {
            if (input.type !== UserInputType.Start) { return; }

            // Only valid if base tile
            let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            if (tileItemsUnder.some(x => x.tile.stack.length > 1)) { return; }

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

        if (input.u < r && input.u > 0) {
            dx = -1 * Math.pow(1 - (input.u / r), 2);
        }

        if (input.u > 1 - r && input.u < 1) {
            dx = 1 * Math.pow(1 - ((1 - input.u) / r), 2);
        }

        if (input.v < r && input.v > 0) {
            dy = -1 * Math.pow(1 - (input.v / r), 2);
        }

        if (input.v > 1 - r && input.v < 1) {
            dy = 1 * Math.pow(1 - ((1 - input.v) / r), 2);
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
    constructor(private map: Map, private viewPort: ViewPort, private host: { height: number, width: number }) { }

    resize(scaleRatio = 1, uOrigin = 0.5, vOrigin = 0.5) {
        let w = this.viewPort.xRight - this.viewPort.xLeft;
        let scale = w / this.host.width;
        let h = this.host.height * scale;

        if (scaleRatio !== 1) {
            scale *= scaleRatio;
            h = this.host.height * scale;
            w = this.host.width * scale;
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