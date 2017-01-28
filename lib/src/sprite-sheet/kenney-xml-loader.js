"use strict";
var tslib_1 = require("tslib");
var xml2json_light_1 = require("xml2json-light");
var sprite_sheet_loader_1 = require("./sprite-sheet-loader");
var tiled_map_1 = require("../tiled-map");
var KenneyXmlLoader = (function (_super) {
    tslib_1.__extends(KenneyXmlLoader, _super);
    function KenneyXmlLoader() {
        return _super.apply(this, arguments) || this;
    }
    KenneyXmlLoader.prototype.load = function (imageUrl, image, tileWidth, tileHeight, xmlText) {
        var json = xml2json_light_1.xml2json(xmlText);
        var obj = JSON.parse(json);
        var spriteSheet = {
            url: imageUrl,
            image: image,
            sprites: []
        };
        spriteSheet.sprites = obj.SubTexture.map(function (t) {
            var yBottomCenter_fromTopLeft = t.height + (tileWidth - t.width) * 0.5 * (tileHeight / tileWidth);
            var stackKind = yBottomCenter_fromTopLeft > t.height ? tiled_map_1.StackKind.Top : tiled_map_1.StackKind.Base;
            var stackHeight = stackKind === tiled_map_1.StackKind.Base ? 50 : 0;
            return {
                spriteSheet: spriteSheet,
                xSheet: t.x,
                ySheet: t.y,
                width: t.width,
                height: t.height,
                xBottomCenter_fromTopLeft: t.width * 0.5,
                yBottomCenter_fromTopLeft: yBottomCenter_fromTopLeft,
                stackKind: stackKind,
                stackHeight: stackHeight,
            };
        });
        return spriteSheet;
    };
    return KenneyXmlLoader;
}(sprite_sheet_loader_1.SpriteSheetLoader));
exports.KenneyXmlLoader = KenneyXmlLoader;
//# sourceMappingURL=kenney-xml-loader.js.map