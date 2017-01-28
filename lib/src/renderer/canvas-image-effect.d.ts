import { SpriteSheet } from '../tiled-map';
export declare enum ImageEffectKind {
    Light = 0,
    Dark = 1,
    RgbRotate = 2,
    RgbRotate2 = 3,
}
export declare function getImageEffect(spriteSheet: SpriteSheet, kind: ImageEffectKind): any;
export declare function createImageEffect_dark(image: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement;
export declare function createImageEffect_light(image: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement;
export declare function createImageEffect_rgbRotate(image: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement;
export declare function createImageEffect_rgbRotate2(image: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement;
