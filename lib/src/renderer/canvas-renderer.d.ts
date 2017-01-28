import { Renderer } from './renderer';
import { SpriteInstance, ViewPort } from '../tiled-map';
export declare class CanvasRenderer extends Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(host: HTMLElement);
    drawItems(sprites: SpriteInstance[], viewPort: ViewPort): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, viewPort: ViewPort): void;
}
