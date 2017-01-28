export class ViewPort {
    xLeft: number;
    yTop: number;
    xRight: number;
    yBottom: number;
}

export class Map {
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
}

export interface SpriteInstance {
    sprite: Sprite;
    x: number;
    y: number;
    zIndex: number;

    shouldHighlight: boolean;
    opacity: number;
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
}