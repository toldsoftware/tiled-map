"use strict";
var ViewPort = (function () {
    function ViewPort() {
    }
    return ViewPort;
}());
exports.ViewPort = ViewPort;
var Map = (function () {
    function Map() {
    }
    return Map;
}());
exports.Map = Map;
var MapShape;
(function (MapShape) {
    MapShape[MapShape["Rectangular"] = 0] = "Rectangular";
    // Rows run from left to top
    MapShape[MapShape["Isometric"] = 1] = "Isometric";
})(MapShape = exports.MapShape || (exports.MapShape = {}));
var Tile = (function () {
    function Tile() {
    }
    return Tile;
}());
exports.Tile = Tile;
var TileItem = (function () {
    function TileItem() {
    }
    return TileItem;
}());
exports.TileItem = TileItem;
var Sprite = (function () {
    function Sprite() {
    }
    return Sprite;
}());
exports.Sprite = Sprite;
var SpriteSheet = (function () {
    function SpriteSheet() {
    }
    return SpriteSheet;
}());
exports.SpriteSheet = SpriteSheet;
//# sourceMappingURL=tiled-map.js.map