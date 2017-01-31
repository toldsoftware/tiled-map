import { SpriteInstance, Map, ViewPort } from '../tiled-map';
export declare abstract class Renderer {
    abstract drawItems(sprites: SpriteInstance[], viewPort: ViewPort): void;
    draw(map: Map, viewPort: ViewPort): void;
}
