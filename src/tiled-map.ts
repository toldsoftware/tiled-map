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

    _sprite: Sprite;
    _x: number;
    _y: number;
    _zIndex: number;
    _shouldHighlight: boolean;
    _opacity: number;
    _shouldBringToFront: boolean;
    _isDirty: boolean;

    xMinClip_last?: number;
    yMinClip_last?: number;
    xMaxClip_last?: number;
    yMaxClip_last?: number;

    get sprite() { return this._sprite; } set sprite(value: Sprite) { this._sprite = value; this._isDirty = true; }
    get x() { return this._x; } set x(value: number) { this._x = value; this._isDirty = true; }
    get y() { return this._y; } set y(value: number) { this._y = value; this._isDirty = true; }
    get zIndex() { return this._zIndex; } set zIndex(value: number) { this._zIndex = value; this._isDirty = true; }
    get shouldHighlight() { return this._shouldHighlight; } set shouldHighlight(value: boolean) { this._shouldHighlight = value; this._isDirty = true; }
    get opacity() { return this._opacity; } set opacity(value: number) { this._opacity = value; this._isDirty = true; }
    get shouldBringToFront() { return this._shouldBringToFront; } set shouldBringToFront(value: boolean) { this._shouldBringToFront = value; this._isDirty = true; }
    get isDirty() { return this._isDirty; } set isDirty(value: boolean) { this._isDirty = value; }

    constructor(values: SpriteInstance & { tile: Tile }) {
        this.tile = values.tile;
        this.sprite = values.sprite;
        this.x = values.x;
        this.y = values.y;
        this.zIndex = values.zIndex;
        this.shouldHighlight = values.shouldHighlight;
        this.shouldBringToFront = values.shouldBringToFront;
    }
}

export interface SpriteInstance {
    sprite: Sprite;
    x: number;
    y: number;
    zIndex: number;

    shouldHighlight: boolean;
    opacity: number;
    shouldBringToFront: boolean;

    isDirty: boolean;

    xMinClip_last?: number;
    yMinClip_last?: number;
    xMaxClip_last?: number;
    yMaxClip_last?: number;
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