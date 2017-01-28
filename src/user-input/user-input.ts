import { Map, Tile, TileItem } from '../tiled-map';

export interface UserInput {
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

export function getNearestTileItem(tileItemsUnder: TileItem[], input: UserInput) {
    let topTiles = tileItemsUnder
        // Only if top of stack
        .filter(t => t.tile.stack[t.tile.stack.length - 1] === t);

    if (topTiles.length === 0) {
        return null;
    }

    return topTiles
        .map(t => ({
            t,
            dx: t.x + t.sprite.xBottomCenter_fromTopLeft - input.x,
            dy: t.y + t.sprite.yBottomCenter_fromTopLeft - t.sprite.height * 0.5 - input.y
        })).map(t => ({ distSqr: t.dx * t.dx + t.dy * t.dy, ...t }))
        .reduce((out, t) => out.distSqr < t.distSqr ? out : t)
        .t;
}

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
        }

        // for (let tile of this.oldTilesUnder) {
        //     for (let t of tile.stack) {
        //         t.shouldHighlight = false;
        //     }
        // }

        let nearestTileItem = getNearestTileItem(tileItemsUnder, input);
        if (nearestTileItem) {
            nearestTileItem.shouldHighlight = true;
            this.oldTileItemsUnder = [nearestTileItem];
        }

        if (nearestTileItem.opacity < 1) {
            let nearestTile = getNearestTile(this.map, tilesUnder, input);
            if (nearestTile) {
                for (let t of nearestTile.stack) {
                    t.shouldHighlight = true;
                    this.oldTileItemsUnder.push(t);
                }
            }
        }

        // this.oldTilesUnder = [nearestTile];


    }
}

export class TileMover {

    activeTileItem: TileItem;
    dxStart: number;
    dyStart: number;
    xStart: number;
    yStart: number;
    zStart: number;

    constructor(private map: Map) {
    }

    handleInput(input: UserInput) {
        if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);

        if (!this.activeTileItem) {
            let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            let nearestTileItem = getNearestTileItem(tileItemsUnder, input);
            if (!nearestTileItem) { return; }

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

            console.log('Move Stack', this.activeTileItem.tile, this.activeTileItem, tilesUnder);

            if (tilesUnder.some(t => t === this.activeTileItem.tile)) {
                // Return to old position
                this.activeTileItem.x = this.xStart;
                this.activeTileItem.y = this.yStart;
                this.activeTileItem.zIndex = this.zStart;
            } else {
                // Move to new stack
                let newTile = getNearestTile(this.map, tilesUnder, input);
                if (newTile == null) { return; }

                let oldTile = this.activeTileItem.tile;

                // Calculate New position                
                this.activeTileItem.x = newTile.x + this.map.tileWidth * 0.5 - this.activeTileItem.sprite.xBottomCenter_fromTopLeft;
                this.activeTileItem.y = newTile.y + this.map.tileHeight - this.activeTileItem.sprite.yBottomCenter_fromTopLeft;
                this.activeTileItem.y -= newTile.stack.reduce((out, t) => out += t.sprite.stackHeight, 0);
                this.activeTileItem.zIndex = newTile.zIndex + newTile.stack.length * 0.1;

                // Change stack
                oldTile.stack.splice(oldTile.stack.indexOf(this.activeTileItem), 1);
                newTile.stack.push(this.activeTileItem);
                this.activeTileItem.tile = newTile;
            }

            this.activeTileItem.shouldHighlight = false;
            this.activeTileItem.opacity = 1;
            this.activeTileItem = null;
        }

    }
}