"use strict";
var tslib_1 = require("tslib");
var src_1 = require("@told/platform/lib/src");
var tiled_map_1 = require("./tiled-map");
src_1.setupBrowser();
var http = src_1.Platform.http();
function loadSpriteSheet(spriteSheetImageUrl, spriteSheetMetaDataUrl, defaultSprite, spriteSheetLoader, shape, tileWidth, tileHeight, spriteSheetLayoutJsonUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var image, metaDataText, spriteSheet, mapData, iMin, iMax, jMin, jMax, iRange, jRange, map, i, j, s, _a, xBottomCenter, yBottomCenter, zIndex, x, y, tile, tiles, _loop_1, _i, _b, t;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    image = new Image();
                    image.src = http.resolveUrl(spriteSheetImageUrl);
                    return [4 /*yield*/, http.request(spriteSheetMetaDataUrl)];
                case 1:
                    metaDataText = (_c.sent()).dataRaw;
                    spriteSheet = spriteSheetLoader.load(spriteSheetImageUrl, image, tileWidth, tileHeight, metaDataText);
                    if (!spriteSheetLayoutJsonUrl) return [3 /*break*/, 3];
                    return [4 /*yield*/, http.request(spriteSheetLayoutJsonUrl)];
                case 2:
                    mapData = (_c.sent()).data;
                    iMin = mapData.tiles.reduce(function (out, t) { return out < t.i ? out : t.i; }, mapData.tiles[0].i);
                    iMax = mapData.tiles.reduce(function (out, t) { return out > t.i ? out : t.i; }, mapData.tiles[0].i);
                    jMin = mapData.tiles.reduce(function (out, t) { return out < t.j ? out : t.j; }, mapData.tiles[0].j);
                    jMax = mapData.tiles.reduce(function (out, t) { return out > t.j ? out : t.j; }, mapData.tiles[0].j);
                    // Add border
                    iMin -= 20;
                    jMin -= 20;
                    iMax += 20;
                    jMax += 20;
                    iRange = iMax - iMin + 1;
                    jRange = jMax - jMin + 1;
                    map = {
                        iZero: Math.round(iRange * 0.5),
                        jZero: Math.round(jRange * 0.5),
                        shape: shape,
                        tileWidth: tileWidth,
                        tileHeight: tileHeight,
                        tiles: [],
                        tileItems_floating: [],
                        toolSlots: [],
                        iToolSlot: 0,
                        defaultSprite: defaultSprite
                    };
                    // Add Default Sprites
                    for (i = 0; i < iRange; i++) {
                        for (j = 0; j < jRange; j++) {
                            s = defaultSprite;
                            _a = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), xBottomCenter = _a.xBottomCenter, yBottomCenter = _a.yBottomCenter, zIndex = _a.zIndex;
                            x = xBottomCenter - s.width * 0.5;
                            y = yBottomCenter - s.height;
                            map.tiles[i] = map.tiles[i] || [];
                            tile = map.tiles[i][j] = map.tiles[i][j] || {
                                stack: [],
                                x: xBottomCenter - tileWidth * 0.5,
                                y: yBottomCenter - tileHeight,
                                zIndex: zIndex
                            };
                            tile.stack.push(new tiled_map_1.TileItem({
                                tile: tile,
                                sprite: s,
                                x: x,
                                y: y,
                                zIndex: zIndex,
                                opacity: 1,
                                shouldHighlight: false,
                                shouldBringToFront: false,
                                isDirty: true
                            }));
                        }
                    }
                    tiles = mapData.tiles;
                    tiles.sort(function (a, b) { return a.k - b.k; });
                    _loop_1 = function (t) {
                        var i = t.i - iMin;
                        var j = t.j - jMin;
                        var k = t.k;
                        var s = spriteSheet.sprites.filter(function (s) { return s.xSheet === t.type.x && s.ySheet === t.type.y; })[0];
                        var _a = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), xBottomCenter = _a.xBottomCenter, yBottomCenter = _a.yBottomCenter, zIndex = _a.zIndex;
                        var x = xBottomCenter - s.width * 0.5;
                        var y = yBottomCenter - s.height;
                        var tile = map.tiles[i][j];
                        tile.stack[k] = new tiled_map_1.TileItem({
                            tile: tile,
                            sprite: s,
                            x: x,
                            y: y - defaultSprite.stackHeight,
                            zIndex: zIndex + 0.1,
                            opacity: 1,
                            shouldHighlight: false,
                            shouldBringToFront: false,
                            isDirty: true
                        });
                    };
                    for (_i = 0, _b = mapData.tiles; _i < _b.length; _i++) {
                        t = _b[_i];
                        _loop_1(t);
                    }
                    // TODO: Fix the y position for the stacks
                    spriteSheet.layoutMap = map;
                    _c.label = 3;
                case 3: return [2 /*return*/, spriteSheet];
            }
        });
    });
}
exports.loadSpriteSheet = loadSpriteSheet;
function createMapWithSpriteSheetSamples(spriteSheetImageUrl, spriteSheetMetaDataUrl, defaultSpriteIndex, spriteSheetLoader, shape, tileWidth, tileHeight) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var map, iZero, jZero, image, metaDataText, spriteSheet, defaultSprite, i, j, s, _a, xBottomCenter, yBottomCenter, zIndex, x, y, tile, spriteCount, columns, rows, iSprite, i, j, s, _b, xBottomCenter, yBottomCenter, zIndex, x, y, tile;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    map = {
                        iZero: 100,
                        jZero: 100,
                        shape: shape,
                        tileWidth: tileWidth,
                        tileHeight: tileHeight,
                        tiles: [],
                        tileItems_floating: [],
                        toolSlots: [],
                        iToolSlot: 0,
                        defaultSprite: null
                    };
                    iZero = map.iZero;
                    jZero = map.jZero;
                    image = new Image();
                    image.src = http.resolveUrl(spriteSheetImageUrl);
                    return [4 /*yield*/, http.request(spriteSheetMetaDataUrl)];
                case 1:
                    metaDataText = (_c.sent()).dataRaw;
                    spriteSheet = spriteSheetLoader.load(spriteSheetImageUrl, image, tileWidth, tileHeight, metaDataText);
                    defaultSprite = map.defaultSprite = spriteSheet.sprites[defaultSpriteIndex];
                    for (i = 0; i < iZero * 2; i++) {
                        for (j = 0; j < jZero * 2; j++) {
                            s = defaultSprite;
                            _a = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), xBottomCenter = _a.xBottomCenter, yBottomCenter = _a.yBottomCenter, zIndex = _a.zIndex;
                            x = xBottomCenter - s.width * 0.5;
                            y = yBottomCenter - s.height;
                            map.tiles[i] = map.tiles[i] || [];
                            tile = map.tiles[i][j] = map.tiles[i][j] || {
                                stack: [],
                                x: xBottomCenter - tileWidth * 0.5,
                                y: yBottomCenter - tileHeight,
                                zIndex: zIndex
                            };
                            tile.stack.push(new tiled_map_1.TileItem({
                                tile: tile,
                                sprite: s,
                                x: x,
                                y: y,
                                zIndex: zIndex,
                                opacity: 1,
                                shouldHighlight: false,
                                shouldBringToFront: false,
                                isDirty: true
                            }));
                        }
                    }
                    spriteCount = spriteSheet.sprites.length;
                    columns = Math.ceil(Math.sqrt(spriteCount));
                    rows = columns;
                    iSprite = 0;
                    for (i = iZero; i < columns + iZero; i++) {
                        for (j = jZero; j < rows + jZero; j++) {
                            s = spriteSheet.sprites[iSprite];
                            _b = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), xBottomCenter = _b.xBottomCenter, yBottomCenter = _b.yBottomCenter, zIndex = _b.zIndex;
                            x = xBottomCenter - s.width * 0.5;
                            y = yBottomCenter - s.height;
                            map.tiles[i] = map.tiles[i] || [];
                            tile = map.tiles[i][j] = map.tiles[i][j] || {
                                stack: [],
                                x: x,
                                y: y,
                                zIndex: zIndex
                            };
                            tile.stack.push(new tiled_map_1.TileItem({
                                tile: tile,
                                sprite: s,
                                x: x,
                                y: y - defaultSprite.stackHeight,
                                zIndex: zIndex + 0.1,
                                opacity: 1,
                                shouldHighlight: false,
                                shouldBringToFront: false,
                                isDirty: true
                            }));
                            iSprite++;
                            if (iSprite >= spriteCount) {
                                break;
                            }
                        }
                        if (iSprite >= spriteCount) {
                            break;
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
        yPerJ = tileHeight * 0.5;
        zIndexPerI = -1;
        zIndexPerJ = 1;
    }
    return {
        xBottomCenter: (i - iZero) * xPerI + (j - jZero) * xPerJ,
        yBottomCenter: (i - iZero) * yPerI + (j - jZero) * yPerJ,
        zIndex: (i - iZero) * zIndexPerI + (j - jZero) * zIndexPerJ,
    };
}
//# sourceMappingURL=loader.js.map