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
    function TileItem(values) {
        this.tile = values.tile;
        this.sprite = values.sprite;
        this.x = values.x;
        this.y = values.y;
        this.zIndex = values.zIndex;
        this.shouldHighlight = values.shouldHighlight;
        this.shouldBringToFront = values.shouldBringToFront;
    }
    Object.defineProperty(TileItem.prototype, "sprite", {
        get: function () { return this._sprite; },
        set: function (value) { this._sprite = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "zIndex", {
        get: function () { return this._zIndex; },
        set: function (value) { this._zIndex = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "shouldHighlight", {
        get: function () { return this._shouldHighlight; },
        set: function (value) { this._shouldHighlight = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "opacity", {
        get: function () { return this._opacity; },
        set: function (value) { this._opacity = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "shouldBringToFront", {
        get: function () { return this._shouldBringToFront; },
        set: function (value) { this._shouldBringToFront = value; this._isDirty = true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileItem.prototype, "isDirty", {
        get: function () { return this._isDirty; },
        set: function (value) { this._isDirty = value; },
        enumerable: true,
        configurable: true
    });
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