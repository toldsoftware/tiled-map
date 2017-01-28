import { Sprite, SpriteSheet } from '../tiled-map';


export abstract class SpriteSheetLoader {
    abstract load(imageUrl: string, image: any, tileWidth: number, tileHeight: number, metadataText: string): SpriteSheet
}