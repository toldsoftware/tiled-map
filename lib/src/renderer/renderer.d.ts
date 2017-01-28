import { SpriteInstance, Map, ViewPort } from '../tiled-map';
export declare abstract class Renderer {
    abstract drawItems(sprites: SpriteInstance[], viewPort: ViewPort): void;
    abstract drawLine(x1: number, y1: number, x2: number, y2: number, viewPort: ViewPort): void;
    draw(map: Map, viewPort: ViewPort): void;
}
