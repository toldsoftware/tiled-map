import { ViewPort, Map, Tile, TileItem } from '../tiled-map';

export interface UserInput {
    u: number;
    v: number;
    duration: number;

    x: number;
    y: number;
    type: UserInputType;

    tilesUnder?: Tile[];
    tileItemsUnder?: TileItem[];
}

export enum UserInputType {
    Move,
    Start,
    Drag,
    End
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

    constructor(private map: Map) {
    }

    handleInput(input: UserInput) {
        // if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);

        for (let t of this.oldTileItemsUnder) {
            t.shouldHighlight = false;
            t.shouldBringToFront = false;
        }
        this.oldTileItemsUnder = [];
        highlightedTileItems = [];
        // for (let tile of this.oldTilesUnder) {
        //     for (let t of tile.stack) {
        //         t.shouldHighlight = false;
        //     }
        // }

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

    activeTileItem: TileItem;
    dxStart: number;
    dyStart: number;
    xStart: number;
    yStart: number;
    zStart: number;

    constructor(private map: Map, private shouldClone: boolean) {
    }

    handleInput(input: UserInput) {
        if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        if (!this.activeTileItem) {
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
        }

        this.activeTileItem.x = input.x + this.dxStart;
        this.activeTileItem.y = input.y + this.dyStart;
        this.activeTileItem.shouldHighlight = true;
        this.activeTileItem.zIndex = 10000;
        this.activeTileItem.opacity = 0.5;

        if (input.type === UserInputType.End) {
            // Move Stack
            let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            let oldTile = this.activeTileItem.tile;

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
                this.activeTileItem.x = newTile.x + this.map.tileWidth * 0.5 - this.activeTileItem.sprite.xBottomCenter_fromTopLeft;
                this.activeTileItem.y = newTile.y + this.map.tileHeight - this.activeTileItem.sprite.yBottomCenter_fromTopLeft;
                this.activeTileItem.y -= newTile.stack.reduce((out, t) => out += t.sprite.stackHeight, 0);
                this.activeTileItem.zIndex = newTile.zIndex + newTile.stack.length * 0.1;

                // Change stack
                if (oldTile) {
                    oldTile.stack.splice(oldTile.stack.indexOf(this.activeTileItem), 1);
                }
                newTile.stack.push(this.activeTileItem);
                this.activeTileItem.tile = newTile;

                let i = this.map.tileItems_floating.indexOf(this.activeTileItem);
                if (i >= 0) {
                    this.map.tileItems_floating.splice(i, 1);
                }
            }

            this.activeTileItem.shouldHighlight = false;
            this.activeTileItem.opacity = 1;
            this.activeTileItem = null;
        }

        movingTileItem = this.activeTileItem;
    }
}

export class ViewportMover {
    isDragging: boolean;
    xStart: number;
    yStart: number;
    xLeftStart: number;
    yTopStart: number;

    constructor(private map: Map, private viewPort: ViewPort) {
    }

    handleInput(input: UserInput) {
        if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        if (!this.isDragging) {
            let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            let nearestTileItem = getNearestTileItem(tileItemsUnder, input, NearestTileMode.TopIsBottom);
            if (!nearestTileItem) { return; }

            this.isDragging = true;
            this.xStart = input.x;
            this.yStart = input.y;
            this.xLeftStart = this.viewPort.xLeft;
            this.yTopStart = this.viewPort.yTop;

        }

        let dx = input.x - this.xStart;
        let dy = input.y - this.yStart;

        console.log(this.xLeftStart, this.xStart, input.x, dx, this.viewPort.xLeft);

        let w = this.viewPort.xRight - this.viewPort.xLeft;
        let h = this.viewPort.yBottom - this.viewPort.yTop;

        // Reduce jumping
        // dx = Math.max(-2, Math.min(1, dx));
        // dy = Math.max(-1, Math.min(1, dy));
        // dx = Math.round(dx);
        // dy = Math.round(dy);

        this.viewPort.xLeft = this.xLeftStart - dx;
        this.viewPort.yTop = this.yTopStart - dy;

        this.viewPort.xRight = this.viewPort.xLeft + w;
        this.viewPort.yBottom = this.viewPort.yTop + h;

        if (input.type === UserInputType.End) {
            this.isDragging = false;
        }
    }
}

export class ViewportScroller {

    animationId: number;
    dx: number;
    dy: number;
    speed = 20;

    constructor(private map: Map, private viewPort: ViewPort) {
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

        this.viewPort.xLeft += this.dx * this.speed;
        this.viewPort.yTop += this.dy * this.speed;

        this.viewPort.xRight = this.viewPort.xLeft + w;
        this.viewPort.yBottom = this.viewPort.yTop + h;

        cancelAnimationFrame(this.animationId);
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}