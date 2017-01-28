import { Map, Tile, TileItem } from '../tiled-map';
export interface UserInput {
    x: number;
    y: number;
    type: UserInputType;
    tilesUnder?: Tile[];
    tileItemsUnder?: TileItem[];
}
export declare enum UserInputType {
    Move = 0,
    Start = 1,
    Drag = 2,
    End = 3,
}
export declare function getTilesAtInput(map: Map, input: UserInput): {
    tilesUnder: Tile[];
    tileItemsUnder: TileItem[];
};
export declare function getNearestTile(map: Map, tilesUnder: Tile[], input: UserInput): Tile;
export declare function getNearestTileItem(tileItemsUnder: TileItem[], input: UserInput): TileItem;
export declare class TileHighlighter {
    private map;
    oldTilesUnder: Tile[];
    oldTileItemsUnder: TileItem[];
    constructor(map: Map);
    handleInput(input: UserInput): void;
}
export declare class TileMover {
    private map;
    activeTileItem: TileItem;
    dxStart: number;
    dyStart: number;
    xStart: number;
    yStart: number;
    zStart: number;
    constructor(map: Map);
    handleInput(input: UserInput): void;
}
