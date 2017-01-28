import { SpriteSheetLoader } from './sprite-sheet-loader';
import { SpriteSheet } from '../tiled-map';
export declare class KenneyXmlLoader extends SpriteSheetLoader {
    load(imageUrl: string, image: any, tileWidth: number, tileHeight: number, xmlText: string): SpriteSheet;
}
