export declare class ViewPort {
    xLeft: number;
    yTop: number;
    xRight: number;
    yBottom: number;
}
export declare class Map {
    tiles: Tile[][];
    iZero: number;
    jZero: number;
    shape: MapShape;
    tileWidth: number;
    tileHeight: number;
    defaultSprite: Sprite;
}
export declare enum MapShape {
    Rectangular = 0,
    Isometric = 1,
}
export declare class Tile {
    stack: TileItem[];
    x: number;
    y: number;
    zIndex: number;
}
export declare class TileItem implements SpriteInstance {
    sprite: Sprite;
    x: number;
    y: number;
    zIndex: number;
}
export interface SpriteInstance {
    sprite: Sprite;
    x: number;
    y: number;
    zIndex: number;
}
export declare class Sprite {
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
export declare class SpriteSheet {
    url: string;
    image?: any;
    sprites: Sprite[];
}
