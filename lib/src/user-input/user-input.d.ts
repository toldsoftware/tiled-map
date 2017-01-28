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
export declare enum NearestTileMode {
    AnyTop = 0,
    TopExceptBottom = 1,
    TopIsBottom = 2,
    Any = 3,
}
export declare function getNearestTileItem(tileItemsUnder: TileItem[], input: UserInput, mode?: NearestTileMode): TileItem;
export declare class TileHighlighter {
    private map;
    oldTilesUnder: Tile[];
    oldTileItemsUnder: TileItem[];
    unhighlightTimeoutId: number;
    constructor(map: Map);
    unhighlight(): void;
    handleInput(input: UserInput): void;
}
export declare class TileMover {
    private map;
    private shouldClone;
    activeTileItem: TileItem;
    dxStart: number;
    dyStart: number;
    xStart: number;
    yStart: number;
    zStart: number;
    constructor(map: Map, shouldClone: boolean);
    handleInput(input: UserInput): void;
}
export declare class ViewportMover {
    private map;
    private viewPort;
    isDragging: boolean;
    xStart: number;
    yStart: number;
    xLeftStart: number;
    yTopStart: number;
    constructor(map: Map, viewPort: ViewPort);
    handleInput(input: UserInput): void;
}
export declare class ViewportScroller {
    private map;
    private viewPort;
    animationId: number;
    dx: number;
    dy: number;
    speed: number;
    constructor(map: Map, viewPort: ViewPort);
    handleInput(input: UserInput): void;
    stop(): void;
    animate(): void;
}
