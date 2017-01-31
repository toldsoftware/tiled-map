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
export declare enum UserInputType {
    Move = 0,
    Start = 1,
    Drag = 2,
    End = 3,
    ChangeToMultipleStart = 4,
    MultipleEnd = 5,
    MultipleEndAfter = 6,
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
export declare enum TargetTileItemMode {
    SelectByBase = 0,
    SelectByTop = 1,
    SelectByBaseOrTop = 2,
}
export declare function getTargetTileItem(map: Map, input: UserInput, mode: TargetTileItemMode): TileItem;
export declare class TileHighlighter {
    private map;
    oldTilesUnder: Tile[];
    oldTileItemsUnder: TileItem[];
    unhighlightTimeoutId: number;
    constructor(map: Map);
    cancel(): void;
    unhighlight(): void;
    handleInput(input: UserInput): void;
}
export declare class TileMover {
    private map;
    private shouldClone;
    previewTileItem: TileItem;
    activeTileItem: TileItem;
    dxStart: number;
    dyStart: number;
    xStart: number;
    yStart: number;
    zStart: number;
    constructor(map: Map, shouldClone: boolean);
    removeFromFloating(tileItem: TileItem): void;
    cancel(): void;
    handleInput(input: UserInput): void;
    setPositionFromTileTop(tileItem: TileItem, newTile: Tile): void;
}
export declare class ViewportMover {
    private map;
    private viewPort;
    isDragging: boolean;
    uStart: number;
    vStart: number;
    constructor(map: Map, viewPort: ViewPort);
    cancel(): void;
    handleInput(input: UserInput): void;
}
export declare function scaleToViewport(uv: {
    u: number;
    v: number;
}, viewPort: ViewPort): {
    u: number;
    v: number;
};
export declare class ViewportScroller {
    private map;
    private viewPort;
    stopTimeoutId: number;
    animationId: number;
    dx: number;
    dy: number;
    speed: number;
    constructor(map: Map, viewPort: ViewPort);
    cancel(): void;
    handleInput(input: UserInput): void;
    stop(): void;
    animate(): void;
}
export declare class ViewportResizer {
    private viewPort;
    private host;
    constructor(viewPort: ViewPort, host: {
        height: number;
        width: number;
    });
    resize(scaleRatio?: number, uOrigin?: number, vOrigin?: number): void;
}
export declare class ViewportMultiTouchScroller {
    private map;
    private viewPort;
    private resizer;
    multipleDistanceStart: number;
    multipleUStart: number;
    multipleVStart: number;
    multipleU2Start: number;
    multipleV2Start: number;
    constructor(map: Map, viewPort: ViewPort, resizer: ViewportResizer);
    handleInput(input: UserInput): void;
}
