import { xml2json } from 'xml2json-light';

import { SpriteSheetLoader } from './sprite-sheet-loader';
import { SpriteSheet, Sprite } from '../tiled-map';

interface KenneySpriteSheet {
    imagePath: string;
    SubTexture: SubTexture[];
}

interface SubTexture {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class KenneyXmlLoader extends SpriteSheetLoader {
    load(imageUrl: string, image: any, tileWidth: number, tileHeight: number, xmlText: string): SpriteSheet {
        let root = xml2json(xmlText) as { TextureAtlas: KenneySpriteSheet };
        let obj = root.TextureAtlas;

        let spriteSheet: SpriteSheet = {
            url: imageUrl,
            image: image,
            sprites: []
        };

        spriteSheet.sprites = obj.SubTexture.map(t => {

            // Conver to numbers
            t.x = t.x * 1;
            t.y = t.y * 1;
            t.width = t.width * 1;
            t.height = t.height * 1;

            let yBottomCenter_fromTopLeft = t.height + (tileWidth - t.width) * 0.5 * (tileHeight / tileWidth);
            let stackBottomKind = 'ground';
            let stackTopKind = 'top';
            let stackHeight = 32 + 2;

            return {
                spriteSheet,
                xSheet: t.x,
                ySheet: t.y,
                width: t.width,
                height: t.height,

                xBottomCenter_fromTopLeft: t.width * 0.5,
                yBottomCenter_fromTopLeft: yBottomCenter_fromTopLeft,
                stackHeight: stackHeight,
                stackBottomKind: stackBottomKind,
                stackTopKind: stackTopKind,

            } as Sprite;
        });

        return spriteSheet;
    }
}