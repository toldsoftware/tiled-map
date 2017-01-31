"use strict";
var tslib_1 = require("tslib");
var xml2json_light_1 = require("xml2json-light");
var sprite_sheet_loader_1 = require("./sprite-sheet-loader");
var KenneyXmlLoader = (function (_super) {
    tslib_1.__extends(KenneyXmlLoader, _super);
    function KenneyXmlLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KenneyXmlLoader.prototype.load = function (imageUrl, image, tileWidth, tileHeight, xmlText) {
        var root = xml2json_light_1.xml2json(xmlText);
        var obj = root.TextureAtlas;
        var spriteSheet = {
            url: imageUrl,
            image: image,
            sprites: [],
            layoutMap: null
        };
        spriteSheet.sprites = obj.SubTexture.map(function (t) {
            // Convert to numbers
            t.x = t.x * 1;
            t.y = t.y * 1;
            t.width = t.width * 1;
            t.height = t.height * 1;
            var yBottomCenter_fromTopLeft = t.height + (tileWidth - t.width) * 0.5 * (tileHeight / tileWidth);
            var stackBottomKind = 'ground';
            var stackTopKind = 'top';
            var stackHeight = 32 + 2;
            return {
                spriteSheet: spriteSheet,
                xSheet: t.x,
                ySheet: t.y,
                width: t.width,
                height: t.height,
                xBottomCenter_fromTopLeft: t.width * 0.5,
                yBottomCenter_fromTopLeft: yBottomCenter_fromTopLeft,
                stackHeight: stackHeight,
                stackBottomKind: stackBottomKind,
                stackTopKind: stackTopKind,
            };
        });
        return spriteSheet;
    };
    return KenneyXmlLoader;
}(sprite_sheet_loader_1.SpriteSheetLoader));
exports.KenneyXmlLoader = KenneyXmlLoader;
//# sourceMappingURL=kenney-xml-loader.js.map