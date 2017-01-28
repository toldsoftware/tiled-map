"use strict";
var tslib_1 = require("tslib");
var src_1 = require("@told/platform/lib/src");
var tiled_map_1 = require("./tiled-map");
src_1.setupBrowser();
var http = src_1.Platform.http();
function createMapWithSpriteSheetSamples(spriteSheetImageUrl, spriteSheetMetaDataUrl, spriteSheetLoader, shape, tileWidth, tileHeight) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var map, iZero, jZero, image, metaDataText, spriteSheet, spriteCount, columns, rows, iCount, iSprite, s, i, j, _a, x, y, zIndex, tile;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    map = {
                        iZero: 100,
                        jZero: 100,
                        shape: shape,
                        tileWidth: tileWidth,
                        tileHeight: tileHeight,
                        tiles: []
                    };
                    iZero = map.iZero;
                    jZero = map.jZero;
                    image = new Image();
                    image.src = spriteSheetImageUrl;
                    return [4 /*yield*/, http.request(spriteSheetMetaDataUrl)];
                case 1:
                    metaDataText = (_b.sent()).data;
                    spriteSheet = spriteSheetLoader.load(spriteSheetImageUrl, image, tileWidth, tileHeight, metaDataText);
                    spriteCount = spriteSheet.sprites.length;
                    columns = Math.ceil(Math.sqrt(spriteCount));
                    rows = columns;
                    iCount = 0;
                    for (iSprite = 0; iSprite < spriteCount; iSprite++) {
                        s = spriteSheet.sprites[iSprite];
                        for (i = iZero; i < columns + iZero; i++) {
                            for (j = jZero; j < rows + jZero; j++) {
                                _a = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), x = _a.x, y = _a.y, zIndex = _a.zIndex;
                                map.tiles[i] = map.tiles[i] || [];
                                tile = map.tiles[i][j] = map.tiles[i][j] || {
                                    stack: [],
                                    x: x,
                                    y: y,
                                    zIndex: zIndex
                                };
                                tile.stack.push({
                                    sprite: s,
                                    x: x,
                                    y: y,
                                    zIndex: zIndex
                                });
                                iCount++;
                                if (iCount >= spriteCount) {
                                    break;
                                }
                            }
                            if (iCount >= spriteCount) {
                                break;
                            }
                        }
                    }
                    return [2 /*return*/, map];
            }
        });
    });
}
exports.createMapWithSpriteSheetSamples = createMapWithSpriteSheetSamples;
function getTilePosition(i, j, shape, tileWidth, tileHeight, iZero, jZero) {
    var xPerI = tileWidth;
    var xPerJ = 0;
    var yPerI = 0;
    var yPerJ = tileHeight;
    var zIndexPerI = 0;
    var zIndexPerJ = 1;
    if (shape === tiled_map_1.MapShape.Isometric) {
        xPerI = tileWidth * 0.5;
        xPerJ = tileWidth * 0.5;
        yPerI = -tileHeight * 0.5;
        yPerJ = tileHeight;
        zIndexPerI = -1;
        zIndexPerJ = 1;
    }
    return {
        x: (i - iZero) * xPerI + (j - jZero) * xPerJ,
        y: (i - iZero) * yPerI + (j - jZero) * yPerJ,
        zIndex: (i - iZero) * zIndexPerI + (j - jZero) * zIndexPerJ,
    };
}
//# sourceMappingURL=loader.js.map