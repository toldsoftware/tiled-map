import { SpriteSheetLoader } from './sprite-sheet/sprite-sheet-loader';
import { Map, MapShape, Sprite, SpriteSheet } from './tiled-map';
export declare function loadSpriteSheet(spriteSheetImageUrl: string, spriteSheetMetaDataUrl: string, defaultSprite: Sprite, spriteSheetLoader: SpriteSheetLoader, shape: MapShape, tileWidth: number, tileHeight: number, spriteSheetLayoutJsonUrl?: string): Promise<SpriteSheet>;
export declare function createMapWithSpriteSheetSamples(spriteSheetImageUrl: string, spriteSheetMetaDataUrl: string, defaultSpriteIndex: number, spriteSheetLoader: SpriteSheetLoader, shape: MapShape, tileWidth: number, tileHeight: number): Promise<Map>;
