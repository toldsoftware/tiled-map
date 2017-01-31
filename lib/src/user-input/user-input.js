"use strict";
var tslib_1 = require("tslib");
var tiled_map_1 = require("../tiled-map");
var UserInputType;
(function (UserInputType) {
    UserInputType[UserInputType["Move"] = 0] = "Move";
    UserInputType[UserInputType["Start"] = 1] = "Start";
    UserInputType[UserInputType["Drag"] = 2] = "Drag";
    UserInputType[UserInputType["End"] = 3] = "End";
    UserInputType[UserInputType["ChangeToMultipleStart"] = 4] = "ChangeToMultipleStart";
    UserInputType[UserInputType["MultipleEnd"] = 5] = "MultipleEnd";
    UserInputType[UserInputType["MultipleEndAfter"] = 6] = "MultipleEndAfter";
})(UserInputType = exports.UserInputType || (exports.UserInputType = {}));
var TILE_Y_OFFSET = 0.3;
function getTilesAtInput(map, input) {
    if (input.tilesUnder) {
        return { tilesUnder: input.tilesUnder, tileItemsUnder: input.tileItemsUnder };
    }
    var tilesUnder = [];
    var tileItemsUnder = [];
    var x = input.x;
    var y = input.y;
    var tw = map.tileWidth;
    var th = map.tileHeight;
    var tyo = TILE_Y_OFFSET * th;
    for (var i = 0; i < map.tiles.length; i++) {
        var column = map.tiles[i];
        for (var j = 0; j < column.length; j++) {
            var tile = column[j];
            var isTileUnder = false;
            if (tile.x <= x && tile.x + tw >= x
                && tile.y - tyo <= y && tile.y - tyo + th >= y) {
                tilesUnder.push(tile);
                isTileUnder = true;
            }
            for (var k = 0; k < tile.stack.length; k++) {
                var tileItem = tile.stack[k];
                if (tileItem.x <= x && tileItem.x + tileItem.sprite.width >= x
                    && tileItem.y <= y && tileItem.y + tileItem.sprite.height >= y) {
                    tileItemsUnder.push(tileItem);
                }
            }
        }
    }
    // console.log('getTilesAtInput', tilesUnder, tileItemsUnder);
    input.tilesUnder = tilesUnder;
    input.tileItemsUnder = tileItemsUnder;
    return { tilesUnder: tilesUnder, tileItemsUnder: tileItemsUnder };
}
exports.getTilesAtInput = getTilesAtInput;
function getNearestTile(map, tilesUnder, input) {
    if (tilesUnder.length === 0) {
        return null;
    }
    return tilesUnder.map(function (t) { return ({
        t: t,
        dx: t.x + map.tileWidth * 0.5 - input.x,
        dy: t.y + map.tileHeight * (0.5 - TILE_Y_OFFSET) - input.y
    }); }).map(function (t) { return (tslib_1.__assign({ distSqr: t.dx * t.dx + t.dy * t.dy }, t)); })
        .reduce(function (out, t) { return out.distSqr < t.distSqr ? out : t; })
        .t;
}
exports.getNearestTile = getNearestTile;
var NearestTileMode;
(function (NearestTileMode) {
    NearestTileMode[NearestTileMode["AnyTop"] = 0] = "AnyTop";
    NearestTileMode[NearestTileMode["TopExceptBottom"] = 1] = "TopExceptBottom";
    NearestTileMode[NearestTileMode["TopIsBottom"] = 2] = "TopIsBottom";
    NearestTileMode[NearestTileMode["Any"] = 3] = "Any";
})(NearestTileMode = exports.NearestTileMode || (exports.NearestTileMode = {}));
function getNearestTileItem(tileItemsUnder, input, mode) {
    if (mode === void 0) { mode = NearestTileMode.AnyTop; }
    var items = tileItemsUnder;
    if (mode !== NearestTileMode.Any) {
        items = items
            .filter(function (t) { return t.tile.stack[t.tile.stack.length - 1] === t; });
    }
    switch (mode) {
        case NearestTileMode.TopExceptBottom:
            items = items.filter(function (t) { return t.tile.stack.length > 1; });
            break;
        case NearestTileMode.TopIsBottom:
            items = items.filter(function (t) { return t.tile.stack.length === 1; });
            break;
    }
    if (items.length === 0) {
        return null;
    }
    return items
        .map(function (t) { return ({
        t: t,
        dx: t.x + t.sprite.xBottomCenter_fromTopLeft - input.x,
        dy: t.y + t.sprite.yBottomCenter_fromTopLeft - t.sprite.height * 0.5 - input.y
    }); }).map(function (t) { return (tslib_1.__assign({ distSqr: t.dx * t.dx + t.dy * t.dy }, t)); })
        .reduce(function (out, t) { return out.distSqr < t.distSqr ? out : t; })
        .t;
}
exports.getNearestTileItem = getNearestTileItem;
var TargetTileItemMode;
(function (TargetTileItemMode) {
    TargetTileItemMode[TargetTileItemMode["SelectByBase"] = 0] = "SelectByBase";
    TargetTileItemMode[TargetTileItemMode["SelectByTop"] = 1] = "SelectByTop";
    TargetTileItemMode[TargetTileItemMode["SelectByBaseOrTop"] = 2] = "SelectByBaseOrTop";
})(TargetTileItemMode = exports.TargetTileItemMode || (exports.TargetTileItemMode = {}));
function getTargetTileItem(map, input, mode) {
    var _a = getTilesAtInput(map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
    var nearestTile = getNearestTile(map, tilesUnder, input);
    var exceptMoving = tileItemsUnder.filter(function (t) { return t !== movingTileItem; });
    var nearestTileItem = getNearestTileItem(exceptMoving, input);
    var n = [];
    if (mode !== TargetTileItemMode.SelectByTop && nearestTile) {
        n.push.apply(n, nearestTile.stack);
    }
    if (mode !== TargetTileItemMode.SelectByBase && nearestTileItem) {
        n.push(nearestTileItem);
    }
    var nearestOfAll = getNearestTileItem(n, input, NearestTileMode.Any);
    return nearestOfAll;
}
exports.getTargetTileItem = getTargetTileItem;
var highlightedTileItems;
var TileHighlighter = (function () {
    function TileHighlighter(map) {
        this.map = map;
        this.oldTilesUnder = [];
        this.oldTileItemsUnder = [];
    }
    TileHighlighter.prototype.cancel = function () {
        this.unhighlight();
        highlightedTileItems = [];
        this.oldTilesUnder = [];
        this.oldTileItemsUnder = [];
    };
    TileHighlighter.prototype.unhighlight = function () {
        for (var _i = 0, _a = this.oldTileItemsUnder; _i < _a.length; _i++) {
            var t = _a[_i];
            t.shouldHighlight = false;
            t.shouldBringToFront = false;
        }
        for (var _b = 0, _c = this.oldTilesUnder; _b < _c.length; _b++) {
            var tile = _c[_b];
            for (var _d = 0, _e = tile.stack; _d < _e.length; _d++) {
                var t = _e[_d];
                t.shouldHighlight = false;
                t.shouldBringToFront = false;
            }
        }
    };
    TileHighlighter.prototype.handleInput = function (input) {
        // if (input.type === UserInputType.Move) { return; }
        // console.log('TileMover.handleInput input=', input);
        var _this = this;
        var _a = getTilesAtInput(this.map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
        this.unhighlight();
        clearTimeout(this.unhighlightTimeoutId);
        this.unhighlightTimeoutId = setTimeout((function () {
            _this.unhighlight();
        }), 1000);
        this.oldTilesUnder = [];
        this.oldTileItemsUnder = [];
        highlightedTileItems = [];
        var selectedItem = getTargetTileItem(this.map, input, movingTileItem === null ? TargetTileItemMode.SelectByTop : TargetTileItemMode.SelectByTop);
        if (selectedItem == null) {
            return;
        }
        var stack = selectedItem.tile.stack;
        var k = 0;
        for (var _i = 0, stack_1 = stack; _i < stack_1.length; _i++) {
            var t = stack_1[_i];
            t.shouldHighlight = true;
            // t.shouldBringToFront = k > 0 && movingTileItem != null;
            // t.shouldBringToFront = movingTileItem != null ? k > 0 : true;
            t.shouldBringToFront = k > 0;
            this.oldTileItemsUnder.push(t);
            highlightedTileItems.push(t);
            k++;
        }
    };
    return TileHighlighter;
}());
exports.TileHighlighter = TileHighlighter;
var movingTileItem;
var TileMover = (function () {
    function TileMover(map, shouldClone) {
        this.map = map;
        this.shouldClone = shouldClone;
    }
    TileMover.prototype.removeFromFloating = function (tileItem) {
        // let i = this.map.tileItems_floating.indexOf(tileItem);
        // if (i >= 0) {
        //     this.map.tileItems_floating.splice(i, 1);
        // }
        // TEMP
        this.map.tileItems_floating = [];
    };
    TileMover.prototype.cancel = function () {
        if (!this.activeTileItem) {
            return;
        }
        // Return to old position
        this.activeTileItem.x = this.xStart;
        this.activeTileItem.y = this.yStart;
        this.activeTileItem.zIndex = this.zStart;
        this.activeTileItem.opacity = 1;
        this.activeTileItem.shouldHighlight = false;
        // Remove floating item
        this.removeFromFloating(this.activeTileItem);
        this.removeFromFloating(this.previewTileItem);
        this.activeTileItem = null;
        this.previewTileItem = null;
        movingTileItem = null;
    };
    TileMover.prototype.handleInput = function (input) {
        var _this = this;
        if (input.type === UserInputType.Move) {
            return;
        }
        // console.log('TileMover.handleInput input=', input);
        if (!this.activeTileItem) {
            if (input.type !== UserInputType.Start) {
                return;
            }
            // let { tilesUnder, tileItemsUnder } = getTilesAtInput(this.map, input);
            // let target = getNearestTileItem(tileItemsUnder, input, NearestTileMode.TopExceptBottom);
            // if (!target) { return; }
            var target = getTargetTileItem(this.map, input, TargetTileItemMode.SelectByTop);
            if (!target || target.tile.stack.length === 1) {
                return;
            }
            if (this.shouldClone) {
                target = new tiled_map_1.TileItem(target);
                // nearestTileItem.tile.stack.push(nearestTileItem);
                this.map.tileItems_floating.push(target);
                target.tile = null;
            }
            this.activeTileItem = target;
            this.dxStart = this.activeTileItem.x - input.x;
            this.dyStart = this.activeTileItem.y - input.y;
            this.xStart = this.activeTileItem.x;
            this.yStart = this.activeTileItem.y;
            this.zStart = this.activeTileItem.zIndex;
            this.previewTileItem = new tiled_map_1.TileItem(target);
            this.previewTileItem.tile = null;
            this.previewTileItem.opacity = 0.75;
            this.previewTileItem.shouldHighlight = true;
            this.previewTileItem.shouldBringToFront = true;
            this.map.tileItems_floating.push(this.previewTileItem);
        }
        // Move Tile
        this.activeTileItem.x = input.x + this.dxStart;
        this.activeTileItem.y = input.y + this.dyStart;
        this.activeTileItem.shouldHighlight = true;
        this.activeTileItem.shouldBringToFront = true;
        this.activeTileItem.zIndex = 10000;
        // this.activeTileItem.opacity = 0.5;
        this.activeTileItem.opacity = 0.0;
        // Show Preview
        var oldTile = this.activeTileItem.tile;
        var _a = getTilesAtInput(this.map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
        if (oldTile && tilesUnder.some(function (t) { return t === oldTile; })) {
            // this.removeFromFloating(this.previewTileItem);
            this.previewTileItem.x = this.xStart;
            this.previewTileItem.y = this.yStart;
            this.previewTileItem.zIndex = this.zStart;
        }
        else {
            var newTileItem = getNearestTileItem(highlightedTileItems.filter(function (x) { return x !== _this.activeTileItem; }), input);
            if (newTileItem == null) {
                return;
            }
            var newTile = newTileItem.tile;
            this.setPositionFromTileTop(this.previewTileItem, newTile);
        }
        // Drop
        if (input.type === UserInputType.End) {
            // Move Stack
            console.log('Move Stack', oldTile, this.activeTileItem, tilesUnder);
            if (oldTile && tilesUnder.some(function (t) { return t === oldTile; })) {
                // Return to old position
                this.activeTileItem.x = this.xStart;
                this.activeTileItem.y = this.yStart;
                this.activeTileItem.zIndex = this.zStart;
            }
            else {
                // Move to new stack
                // let newTile = getNearestTile(this.map, tilesUnder, input);
                var newTileItem = getNearestTileItem(highlightedTileItems.filter(function (x) { return x !== _this.activeTileItem; }), input);
                if (newTileItem == null) {
                    return;
                }
                var newTile = newTileItem.tile;
                // Calculate New position          
                this.setPositionFromTileTop(this.activeTileItem, newTile);
                // Change stack
                if (oldTile) {
                    oldTile.stack.splice(oldTile.stack.indexOf(this.activeTileItem), 1);
                }
                newTile.stack.push(this.activeTileItem);
                this.activeTileItem.tile = newTile;
            }
            this.removeFromFloating(this.activeTileItem);
            this.removeFromFloating(this.previewTileItem);
            var a_1 = this.activeTileItem;
            setTimeout((function () {
                a_1.shouldHighlight = false;
                a_1.shouldBringToFront = false;
            }), 200);
            this.activeTileItem.opacity = 1;
            this.activeTileItem = null;
            this.previewTileItem = null;
        }
        movingTileItem = this.activeTileItem;
    };
    TileMover.prototype.setPositionFromTileTop = function (tileItem, newTile) {
        tileItem.x = newTile.x + this.map.tileWidth * 0.5 - tileItem.sprite.xBottomCenter_fromTopLeft;
        tileItem.y = newTile.y + this.map.tileHeight - tileItem.sprite.yBottomCenter_fromTopLeft;
        tileItem.y -= newTile.stack.reduce(function (out, t) { return out += t.sprite.stackHeight; }, 0);
        tileItem.zIndex = newTile.zIndex + newTile.stack.length * 0.1;
    };
    return TileMover;
}());
exports.TileMover = TileMover;
var MAX_DURATION_START_MOVE = 250;
var MIN_DISTANCE_START_MOVE_SQ = 0.02 * 0.02;
var ViewportMover = (function () {
    function ViewportMover(map, viewPort) {
        this.map = map;
        this.viewPort = viewPort;
    }
    ViewportMover.prototype.cancel = function () {
        this.isDragging = false;
    };
    ViewportMover.prototype.handleInput = function (input) {
        if (input.type === UserInputType.Move) {
            return;
        }
        // console.log('TileMover.handleInput input=', input);
        if (this.mightDrag) {
            if (input.type === UserInputType.Drag && input.duration < MAX_DURATION_START_MOVE) {
                var distanceSq = (this.uStart - input.u) * (this.uStart - input.u)
                    + (this.vStart - input.v) * (this.vStart - input.v);
                if (distanceSq > MIN_DISTANCE_START_MOVE_SQ) {
                    // Start Moving
                    console.log('Start Move');
                    this.isDragging = true;
                    this.mightDrag = false;
                }
            }
        }
        if (!this.isDragging) {
            if (input.type !== UserInputType.Start) {
                return;
            }
            // Only immediate drag if base tile
            var _a = getTilesAtInput(this.map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
            if (tileItemsUnder.some(function (x) { return x.tile.stack.length > 1; })) {
                console.log('Might Move');
                this.mightDrag = true;
                this.uStart = input.u;
                this.vStart = input.v;
                return;
            }
            this.isDragging = true;
            this.uStart = input.u;
            this.vStart = input.v;
        }
        var du = input.u - this.uStart;
        var dv = input.v - this.vStart;
        var w = this.viewPort.xRight - this.viewPort.xLeft;
        var h = this.viewPort.yBottom - this.viewPort.yTop;
        var dx = du * w;
        var dy = dv * h;
        this.viewPort.xLeft -= dx;
        this.viewPort.yTop -= dy;
        this.viewPort.xRight = this.viewPort.xLeft + w;
        this.viewPort.yBottom = this.viewPort.yTop + h;
        this.uStart = input.u;
        this.vStart = input.v;
        if (input.type === UserInputType.End) {
            this.isDragging = false;
        }
    };
    return ViewportMover;
}());
exports.ViewportMover = ViewportMover;
function scaleToViewport(uv, viewPort) {
    var u = uv.u;
    var v = uv.v;
    // Scale to clip
    u = (u - viewPort.clip_uLeft) / (viewPort.clip_uRight - viewPort.clip_uLeft);
    v = (v - viewPort.clip_vTop) / (viewPort.clip_vBottom - viewPort.clip_vTop);
    return { u: u, v: v };
}
exports.scaleToViewport = scaleToViewport;
var ViewportScroller = (function () {
    function ViewportScroller(map, viewPort) {
        this.map = map;
        this.viewPort = viewPort;
        this.speed = 20;
    }
    ViewportScroller.prototype.cancel = function () {
        this.stop();
    };
    ViewportScroller.prototype.handleInput = function (input) {
        var _this = this;
        var r = 0.1;
        var dx = 0;
        var dy = 0;
        var _a = scaleToViewport(input, this.viewPort), u = _a.u, v = _a.v;
        if (u < r && u >= 0) {
            dx = -1 * Math.pow(1 - (u / r), 2);
        }
        if (u > 1 - r && u <= 1) {
            dx = 1 * Math.pow(1 - ((1 - u) / r), 2);
        }
        if (v < r && v >= 0) {
            dy = -1 * Math.pow(1 - (v / r), 2);
        }
        if (v > 1 - r && v <= 1) {
            dy = 1 * Math.pow(1 - ((1 - v) / r), 2);
        }
        this.dx = dx;
        this.dy = dy;
        // console.log(dx, dy);
        if (dx === 0 && dy === 0) {
            return;
        }
        cancelAnimationFrame(this.animationId);
        this.animationId = requestAnimationFrame(function () { return _this.animate(); });
        clearTimeout(this.stopTimeoutId);
        this.stopTimeoutId = setTimeout(function () { return _this.stop(); }, 3000);
    };
    ViewportScroller.prototype.stop = function () {
        this.dx = 0;
        this.dy = 0;
    };
    ViewportScroller.prototype.animate = function () {
        var _this = this;
        if (this.dx === 0 && this.dy === 0) {
            return;
        }
        var w = this.viewPort.xRight - this.viewPort.xLeft;
        var h = this.viewPort.yBottom - this.viewPort.yTop;
        var scale = w / 1600;
        this.viewPort.xLeft += this.dx * this.speed * scale;
        this.viewPort.yTop += this.dy * this.speed * scale;
        this.viewPort.xRight = this.viewPort.xLeft + w;
        this.viewPort.yBottom = this.viewPort.yTop + h;
        cancelAnimationFrame(this.animationId);
        this.animationId = requestAnimationFrame(function () { return _this.animate(); });
    };
    return ViewportScroller;
}());
exports.ViewportScroller = ViewportScroller;
var ViewportResizer = (function () {
    function ViewportResizer(viewPort, host) {
        this.viewPort = viewPort;
        this.host = host;
    }
    ViewportResizer.prototype.resize = function (scaleRatio, uOrigin, vOrigin) {
        if (scaleRatio === void 0) { scaleRatio = 1; }
        if (uOrigin === void 0) { uOrigin = 0.5; }
        if (vOrigin === void 0) { vOrigin = 0.5; }
        var hw = this.host.width * (this.viewPort.clip_uRight - this.viewPort.clip_uLeft);
        var hh = this.host.height * (this.viewPort.clip_vBottom - this.viewPort.clip_vTop);
        var w = this.viewPort.xRight - this.viewPort.xLeft;
        var scale = w / hw;
        var h = hh * scale;
        if (scaleRatio !== 1) {
            scale *= scaleRatio;
            w = hw * scale;
            h = hh * scale;
        }
        var wDiff = w - (this.viewPort.xRight - this.viewPort.xLeft);
        var hDiff = h - (this.viewPort.yBottom - this.viewPort.yTop);
        this.viewPort.xLeft -= wDiff * uOrigin;
        this.viewPort.yTop -= hDiff * vOrigin;
        this.viewPort.xRight += wDiff * (1 - uOrigin);
        this.viewPort.yBottom += hDiff * (1 - vOrigin);
    };
    return ViewportResizer;
}());
exports.ViewportResizer = ViewportResizer;
var ViewportMultiTouchScroller = (function () {
    function ViewportMultiTouchScroller(map, viewPort, resizer) {
        this.map = map;
        this.viewPort = viewPort;
        this.resizer = resizer;
    }
    ViewportMultiTouchScroller.prototype.handleInput = function (input) {
        if (input.type === UserInputType.ChangeToMultipleStart) {
            // Start Multiple
            this.multipleDistanceStart = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
            this.multipleUStart = input.u;
            this.multipleVStart = input.v;
            this.multipleU2Start = input.u2;
            this.multipleV2Start = input.v2;
        }
        else if (input.type === UserInputType.Drag || input.type === UserInputType.MultipleEndAfter || input.type === UserInputType.MultipleEnd) {
            // Move (1 Nearest Finger)
            var du = input.u - this.multipleUStart;
            var dv = input.v - this.multipleVStart;
            var du2 = input.u - this.multipleU2Start;
            var dv2 = input.v - this.multipleV2Start;
            du = Math.abs(du) < Math.abs(du2) ? du : du2;
            dv = Math.abs(dv) < Math.abs(dv2) ? dv : dv2;
            var dx = (this.viewPort.xRight - this.viewPort.xLeft) * du;
            var dy = (this.viewPort.yBottom - this.viewPort.yTop) * dv;
            this.viewPort.xLeft -= dx;
            this.viewPort.yTop -= dy;
            this.viewPort.xRight -= dx;
            this.viewPort.yBottom -= dy;
            this.multipleUStart = input.u;
            this.multipleVStart = input.v;
            this.multipleU2Start = input.u2;
            this.multipleV2Start = input.v2;
            // Scale (2 Finger)
            if (input.inputCount > 1) {
                var dist = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
                var scale = this.multipleDistanceStart / dist;
                this.resizer.resize(scale, (input.u + input.u2) * 0.5, (input.v + input.v2) * 0.5);
                this.multipleDistanceStart = Math.sqrt((input.u2 - input.u) * (input.u2 - input.u) + (input.v2 - input.v) * (input.v2 - input.v));
            }
        }
    };
    return ViewportMultiTouchScroller;
}());
exports.ViewportMultiTouchScroller = ViewportMultiTouchScroller;
//# sourceMappingURL=user-input.js.map