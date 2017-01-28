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
var StackKind;
(function (StackKind) {
    StackKind[StackKind["Base"] = 0] = "Base";
    StackKind[StackKind["Middle"] = 1] = "Middle";
    StackKind[StackKind["Top"] = 2] = "Top";
})(StackKind = exports.StackKind || (exports.StackKind = {}));
var SpriteSheet = (function () {
    function SpriteSheet() {
    }
    return SpriteSheet;
}());
exports.SpriteSheet = SpriteSheet;
//# sourceMappingURL=tiled-map.js.map