import { SpriteSheetLoader } from './sprite-sheet/sprite-sheet-loader';
import { Map, MapShape } from './tiled-map';
export declare function createMapWithSpriteSheetSamples(spriteSheetImageUrl: string, spriteSheetMetaDataUrl: string, defaultSpriteIndex: number, spriteSheetLoader: SpriteSheetLoader, shape: MapShape, tileWidth: number, tileHeight: number): Promise<Map>;
