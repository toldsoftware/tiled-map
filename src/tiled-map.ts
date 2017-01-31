export class ViewPort {
    xLeft: number;
    yTop: number;
    xRight: number;
    yBottom: number;

    clip_uLeft: number;
    clip_uRight: number;
    clip_vTop: number;
    clip_vBottom: number;
}

export class Map {
    tileItems_floating: TileItem[];

    toolSlots: Sprite[];
    iToolSlot: number;

    tiles: Tile[][];
    iZero: number;
    jZero: number;

    shape: MapShape;
    tileWidth: number;
    tileHeight: number;

    defaultSprite: Sprite;
}

export enum MapShape {
    Rectangular,
    // Rows run from left to top
    Isometric,
}

export class Tile {
    stack: TileItem[];
    x: number;
    y: number;
    zIndex: number;
}

export class TileItem implements SpriteInstance {
    tile: Tile;

    sprite: Sprite;
    x: number;
    y: number;
    zIndex: number;

    shouldHighlight: boolean;
    opacity: number;
    shouldBringToFront: boolean;
}

export interface SpriteInstance {
    sprite: Sprite;
    x: number;
    y: number;
    zIndex: number;

    shouldHighlight: boolean;
    opacity: number;
    shouldBringToFront: boolean;
}

export class Sprite {
    spriteSheet: SpriteSheet;
    xSheet: number;
    ySheet: number;
    width: number;
    height: number;

    xBottomCenter_fromTopLeft: number;
    yBottomCenter_fromTopLeft: number;
    stackHeight: number;
    stackBottomKind: string;
    stackTopKind: string;
}

export class SpriteSheet {
    url: string;
    image?: any;
    imageEffects?: any[];
    sprites: Sprite[];

    layoutMap: Map;
}

export interface MapData {
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