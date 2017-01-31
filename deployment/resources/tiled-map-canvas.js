/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
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
                target = tslib_1.__assign({}, target);
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
            this.previewTileItem = tslib_1.__assign({}, target);
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
        if (!this.isDragging) {
            if (input.type !== UserInputType.Start) {
                return;
            }
            // Only valid if base tile
            var _a = getTilesAtInput(this.map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
            if (tileItemsUnder.some(function (x) { return x.tile.stack.length > 1; })) {
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function resolveUrlClient(url) {
    if (url.indexOf('./') !== 0) {
        return url;
    }
    var pathname = window.location.pathname;
    var prefix = '/';
    if (pathname.match(/^\/api\//)) {
        prefix = '/api/';
    }
    return resolveUrl_inner(url, prefix);
}
exports.resolveUrlClient = resolveUrlClient;
function resolveUrl(url, pathDepthFromApiRoot) {
    if (pathDepthFromApiRoot === void 0) { pathDepthFromApiRoot = 1; }
    if (url.indexOf('./') !== 0) {
        return url;
    }
    var depthPrefix = getPathDepthPrefix(pathDepthFromApiRoot);
    return resolveUrl_inner(url, depthPrefix);
}
exports.resolveUrl = resolveUrl;
function resolveUrl_inner(url, prefix) {
    url = url.substr(2);
    // If file extension, make file
    if (url.match(/[^/]\.[^/]+$/)) {
        return prefix + "resource/" + url + "/file";
    }
    else {
        return "" + prefix + url + "?q";
    }
}
function resolveAllUrls(content, pathDepthFromApiRoot) {
    return content
        .replace(/"(\.\/[^"]+)"/g, function (x) { return '"' + resolveUrl(x.substr(1, x.length - 2), pathDepthFromApiRoot) + '"'; })
        .replace(/'(\.\/[^']+)'/g, function (x) { return '\'' + resolveUrl(x.substr(1, x.length - 2), pathDepthFromApiRoot) + '\''; });
}
exports.resolveAllUrls = resolveAllUrls;
function getPathDepthPrefix(pathDepthFromApiRoot) {
    var depthPrefix = '';
    for (var i = 0; i < pathDepthFromApiRoot; i++) {
        depthPrefix += '../';
    }
    return depthPrefix;
}
exports.getPathDepthPrefix = getPathDepthPrefix;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Platform = (function () {
    function Platform() {
    }
    Platform.http = function () { return Platform.provider.http(); };
    return Platform;
}());
Platform.urlResolver = function (url) { return url; };
exports.Platform = Platform;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(6));
__export(__webpack_require__(22));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Platform = (function () {
    function Platform() {
    }
    Platform.http = function () { return Platform.provider.http(); };
    return Platform;
}());
Platform.urlResolver = function (url) { return url; };
exports.Platform = Platform;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.0.5
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(25);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(20)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var tiled_map_1 = __webpack_require__(1);
var kenney_xml_loader_1 = __webpack_require__(14);
var canvas_renderer_1 = __webpack_require__(12);
var loader_1 = __webpack_require__(10);
var user_input_1 = __webpack_require__(2);
// BUG: This is not working automatically 
// (it's loading a duplicate of the module and defeating the singleton)
var src_1 = __webpack_require__(5);
var resolve_url_1 = __webpack_require__(3);
src_1.setupBrowser();
src_1.Platform.urlResolver = resolve_url_1.resolveUrlClient;
function load_async() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var map, spriteSheet, r, viewPort, toolPanelViewPort, tileHighlighter, tileMover, tileCloner, viewportMover, viewportScroller, viewportResizer, viewportMultiTouchScroller, toolPanelViewportResizer, mode, animate;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('load_async START');
                    return [4 /*yield*/, loader_1.createMapWithSpriteSheetSamples('./kenney-isometric/landscapeTiles_sheet.png', './kenney-isometric/landscapeTiles_sheet.xml', 
                        // './kenney-isometric/cityTiles_sheet.png',
                        // './kenney-isometric/cityTiles_sheet.xml',
                        // './kenney-isometric/buildingTiles_sheet.png',
                        // './kenney-isometric/buildingTiles_sheet.xml',
                        // 67,
                        83, new kenney_xml_loader_1.KenneyXmlLoader(), tiled_map_1.MapShape.Isometric, 128 + 4, 64 + 2)];
                case 1:
                    map = _a.sent();
                    return [4 /*yield*/, loader_1.loadSpriteSheet('./kenney-isometric/landscapeTiles_sheet.png', './kenney-isometric/landscapeTiles_sheet.xml', map.defaultSprite, new kenney_xml_loader_1.KenneyXmlLoader(), tiled_map_1.MapShape.Isometric, 128 + 4, 64 + 2, './saves/landscape_layout.json')];
                case 2:
                    spriteSheet = _a.sent();
                    map = spriteSheet.layoutMap;
                    r = new canvas_renderer_1.CanvasRenderer(document.getElementById('host'));
                    viewPort = new tiled_map_1.ViewPort();
                    viewPort.xLeft = -1600;
                    viewPort.xRight = 1600;
                    viewPort.yTop = -900;
                    viewPort.yBottom = 900;
                    viewPort.clip_uLeft = 0;
                    viewPort.clip_uRight = 1;
                    viewPort.clip_vTop = 0;
                    // viewPort.clip_vBottom = 0.5;
                    // viewPort.clip_vBottom = 0.9;
                    viewPort.clip_vBottom = 1;
                    toolPanelViewPort = new tiled_map_1.ViewPort();
                    toolPanelViewPort.xLeft = -1600;
                    toolPanelViewPort.xRight = 1600;
                    toolPanelViewPort.yTop = -900;
                    toolPanelViewPort.yBottom = 900;
                    toolPanelViewPort.clip_uLeft = 0;
                    toolPanelViewPort.clip_uRight = 1;
                    toolPanelViewPort.clip_vTop = 0.5;
                    toolPanelViewPort.clip_vBottom = 1;
                    tileHighlighter = new user_input_1.TileHighlighter(map);
                    tileMover = new user_input_1.TileMover(map, false);
                    tileCloner = new user_input_1.TileMover(map, true);
                    viewportMover = new user_input_1.ViewportMover(map, viewPort);
                    viewportScroller = new user_input_1.ViewportScroller(map, viewPort);
                    viewportResizer = new user_input_1.ViewportResizer(viewPort, r);
                    viewportMultiTouchScroller = new user_input_1.ViewportMultiTouchScroller(map, viewPort, viewportResizer);
                    toolPanelViewportResizer = new user_input_1.ViewportResizer(toolPanelViewPort, r);
                    // Handle resize
                    r.onResize = function () {
                        viewportResizer.resize();
                        toolPanelViewportResizer.resize();
                    };
                    setTimeout(function () {
                        viewportResizer.resize();
                        toolPanelViewportResizer.resize();
                    });
                    r.onZoom = function (scaleRatio) {
                        viewportResizer.resize(scaleRatio);
                        toolPanelViewportResizer.resize(scaleRatio);
                    };
                    mode = 0;
                    r.onInput = function (input) {
                        // if (input.isMultiple) {
                        //     return;
                        // }
                        if (input.isMultiple) {
                            // console.log('Input Multiple type=', input.type, input);
                            if (input.type === user_input_1.UserInputType.ChangeToMultipleStart) {
                                // Cancel any actions started
                                viewportScroller.cancel();
                                viewportMover.cancel();
                                tileHighlighter.cancel();
                                tileMover.cancel();
                                tileCloner.cancel();
                            }
                            viewportMultiTouchScroller.handleInput(input);
                            return;
                        }
                        // console.log('Input Single', input.type, input);
                        viewportMover.handleInput(input);
                        if (viewportMover.isDragging) {
                            tileHighlighter.cancel();
                            viewportScroller.cancel();
                            tileMover.cancel();
                            tileCloner.cancel();
                            return;
                        }
                        tileHighlighter.handleInput(input);
                        if (!(input.u < 0.2 && input.v > 0.8)) {
                            viewportScroller.handleInput(input);
                        }
                        else {
                            viewportScroller.cancel();
                        }
                        if (input.type === user_input_1.UserInputType.End
                            && input.duration < 1000
                            && input.u < 0.2 && input.v > 0.8) {
                            mode++;
                        }
                        if (input.type === user_input_1.UserInputType.End
                            && input.duration < 1000
                            && input.u > 0.8 && input.v < 0.2) {
                            save(map);
                        }
                        switch (mode % 2) {
                            case 0:
                                tileMover.handleInput(input);
                                break;
                            case 1:
                                tileCloner.handleInput(input);
                                break;
                        }
                    };
                    animate = function () {
                        r.clear();
                        r.draw(map, viewPort);
                        // r.draw(map, toolPanelViewPort);
                        requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    console.log('load_async END');
                    return [2 /*return*/];
            }
        });
    });
}
function save(map) {
    var data = {
        tiles: []
    };
    for (var i = 0; i < map.tiles.length; i++) {
        var column = map.tiles[i];
        for (var j = 0; j < column.length; j++) {
            var tile = column[j];
            for (var k = 0; k < tile.stack.length; k++) {
                if (k > 0) {
                    var tileItem = tile.stack[k];
                    var sprite = tileItem.sprite;
                    data.tiles.push({
                        i: i, j: j, k: k,
                        type: {
                            sheetUrl: sprite.spriteSheet.url,
                            x: sprite.xSheet,
                            y: sprite.ySheet
                        }
                    });
                }
            }
        }
    }
    console.log(data);
    console.log(JSON.stringify(data));
}
function setup() {
    load_async().then().catch(function (err) { return console.error(err); });
}
exports.setup = setup;
setup();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _1 = __webpack_require__(16);
var resolve_url_1 = __webpack_require__(3);
_1.setupBrowser();
_1.Platform.urlResolver = resolve_url_1.resolveUrlClient;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var src_1 = __webpack_require__(5);
var tiled_map_1 = __webpack_require__(1);
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
                            tile.stack.push({
                                tile: tile,
                                sprite: s,
                                x: x,
                                y: y,
                                zIndex: zIndex,
                                opacity: 1,
                                shouldHighlight: false,
                                shouldBringToFront: false
                            });
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
                        tile.stack[k] = {
                            tile: tile,
                            sprite: s,
                            x: x,
                            y: y - defaultSprite.stackHeight,
                            zIndex: zIndex + 0.1,
                            opacity: 1,
                            shouldHighlight: false,
                            shouldBringToFront: false
                        };
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
                            tile.stack.push({
                                tile: tile,
                                sprite: s,
                                x: x,
                                y: y,
                                zIndex: zIndex,
                                opacity: 1,
                                shouldHighlight: false,
                                shouldBringToFront: false
                            });
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
                            tile.stack.push({
                                tile: tile,
                                sprite: s,
                                x: x,
                                y: y - defaultSprite.stackHeight,
                                zIndex: zIndex + 0.1,
                                opacity: 1,
                                shouldHighlight: false,
                                shouldBringToFront: false
                            });
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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var DEBUG = false;
var ImageEffectKind;
(function (ImageEffectKind) {
    ImageEffectKind[ImageEffectKind["Light"] = 0] = "Light";
    ImageEffectKind[ImageEffectKind["Dark"] = 1] = "Dark";
    ImageEffectKind[ImageEffectKind["RgbRotate"] = 2] = "RgbRotate";
    ImageEffectKind[ImageEffectKind["RgbRotate2"] = 3] = "RgbRotate2";
})(ImageEffectKind = exports.ImageEffectKind || (exports.ImageEffectKind = {}));
function getImageEffect(spriteSheet, kind) {
    var _this = this;
    if (spriteSheet.image == null || spriteSheet.image.width <= 0) {
        return null;
    }
    spriteSheet.imageEffects = spriteSheet.imageEffects || [];
    var resultImage = spriteSheet.imageEffects[kind];
    if (resultImage == null) {
        // Placeholder
        spriteSheet.imageEffects[kind] = 0;
        setTimeout(function () {
            (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log('Create Image Effect START kind=', kind);
                            _a = kind;
                            switch (_a) {
                                case ImageEffectKind.Dark: return [3 /*break*/, 1];
                                case ImageEffectKind.RgbRotate: return [3 /*break*/, 3];
                                case ImageEffectKind.RgbRotate2: return [3 /*break*/, 5];
                                case ImageEffectKind.Light: return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, createImageEffect_dark(spriteSheet.image)];
                        case 2:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 3: return [4 /*yield*/, createImageEffect_rgbRotate(spriteSheet.image)];
                        case 4:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 5: return [4 /*yield*/, createImageEffect_rgbRotate2(spriteSheet.image)];
                        case 6:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, createImageEffect_light(spriteSheet.image)];
                        case 8:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 9:
                            spriteSheet.imageEffects[kind] = resultImage;
                            console.log('Create Image Effect END kind=', kind);
                            return [2 /*return*/];
                    }
                });
            }); })().then();
        });
    }
    return resultImage || spriteSheet.image;
}
exports.getImageEffect = getImageEffect;
var CHUNK_SIZE = 100 * 1000;
var pauseCount = 0;
function pause() {
    var p = pauseCount++;
    // console.log('pause SETUP', p);
    return new Promise(function (resolve) {
        // console.log('pause START', p);
        setTimeout(function () {
            resolve();
            // console.log('pause END', p);
        });
    });
}
exports.pause = pause;
function createImageEffect_dark(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            data[i + 0] = r * 0.7;
                            data[i + 1] = g * 0.7;
                            data[i + 2] = b * 0.8;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_dark = createImageEffect_dark;
function createImageEffect_light(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            // data[i + 0] = r * 0.6 + 225 * 0.4;
                            // data[i + 1] = g * 0.6 + 225 * 0.4;
                            // data[i + 2] = b * 0.4 + 225 * 0.6;
                            data[i + 0] = r * 0.7 + 225 * 0.3;
                            data[i + 1] = g * 0.7 + 225 * 0.3;
                            data[i + 2] = b * 0.6 + 225 * 0.4;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_light = createImageEffect_light;
function createImageEffect_rgbRotate(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            data[i + 0] = g;
                            data[i + 1] = b;
                            data[i + 2] = r;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_rgbRotate = createImageEffect_rgbRotate;
function createImageEffect_rgbRotate2(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            data[i + 0] = b;
                            data[i + 1] = r;
                            data[i + 2] = g;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_rgbRotate2 = createImageEffect_rgbRotate2;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var renderer_1 = __webpack_require__(13);
var user_input_1 = __webpack_require__(2);
var canvas_image_effect_1 = __webpack_require__(11);
var DEBUG = true;
var CanvasRenderer = (function (_super) {
    tslib_1.__extends(CanvasRenderer, _super);
    function CanvasRenderer(host) {
        var _this = _super.call(this) || this;
        _this.isInputDown = false;
        _this.canvas = document.createElement('canvas');
        _this.context = _this.canvas.getContext('2d');
        host.appendChild(_this.canvas);
        var resize = function () {
            _this.width = _this.canvas.width = host.clientWidth;
            _this.height = _this.canvas.height = host.clientHeight;
            if (_this.onResize) {
                _this.onResize();
            }
        };
        resize();
        host.addEventListener('resize', function () { return resize(); });
        window.addEventListener('resize', function () { return resize(); });
        _this.canvas.addEventListener('mousedown', function (e) { return _this.getInput(e, user_input_1.UserInputType.Start); });
        _this.canvas.addEventListener('touchstart', function (e) { return _this.getInput(e, user_input_1.UserInputType.Start); });
        window.addEventListener('mousemove', function (e) { return _this.getInput(e, user_input_1.UserInputType.Move); });
        window.addEventListener('touchmove', function (e) { return _this.getInput(e, user_input_1.UserInputType.Move); });
        window.addEventListener('mouseup', function (e) { return _this.getInput(e, user_input_1.UserInputType.End); });
        window.addEventListener('touchend', function (e) { return _this.getInput(e, user_input_1.UserInputType.End); });
        window.addEventListener('mousewheel', function (e) {
            if (!_this.onZoom) {
                return;
            }
            var amount = e.deltaY;
            if (amount > 0) {
                _this.onZoom(1.1);
            }
            else if (amount < 0) {
                _this.onZoom(0.8888);
            }
            console.log(e);
        });
        return _this;
    }
    CanvasRenderer.prototype.getInput = function (e, type) {
        if (this.lastViewPort == null || this.onInput == null) {
            return;
        }
        // console.log('CanvasRenderer.getInput', e, this.onInput, this.lastViewPort);
        var origType = type;
        var xCanvas = this.xCanvasLast;
        var yCanvas = this.yCanvasLast;
        var rect = this.canvas.getBoundingClientRect();
        var me = e;
        var te = e;
        var isMultiple = false;
        var x2Canvas = this.x2CanvasLast;
        var y2Canvas = this.y2CanvasLast;
        var isAnyTouch = false;
        var inputCount = 0;
        if (me.clientX) {
            xCanvas = me.clientX - rect.left;
            yCanvas = me.clientY - rect.top;
            inputCount = 1;
        }
        else if (te.touches != null && te.touches.length > 0) {
            xCanvas = te.touches[0].clientX - rect.left;
            yCanvas = te.touches[0].clientY - rect.top;
            inputCount = 1;
            if (te.touches[1]) {
                if (DEBUG) {
                    console.log('2 FINGER');
                }
                x2Canvas = te.touches[1].clientX - rect.left;
                y2Canvas = te.touches[1].clientY - rect.top;
                isMultiple = true;
                inputCount = 2;
            }
            isAnyTouch = true;
        }
        var isMultipleStart = isMultiple && !this.isMultipleLast;
        var isMultipleEnd = !isMultiple && this.isMultipleLast;
        this.xCanvasLast = xCanvas;
        this.yCanvasLast = yCanvas;
        this.x2CanvasLast = x2Canvas;
        this.y2CanvasLast = y2Canvas;
        this.isMultipleLast = isMultiple;
        // Scale for viewPort
        var u = (xCanvas / this.canvas.width);
        var v = (yCanvas / this.canvas.height);
        var x = this.lastViewPort.xLeft + u * (this.lastViewPort.xRight - this.lastViewPort.xLeft);
        var y = this.lastViewPort.yTop + v * (this.lastViewPort.yBottom - this.lastViewPort.yTop);
        var u2 = (x2Canvas / this.canvas.width);
        var v2 = (y2Canvas / this.canvas.height);
        var x2 = this.lastViewPort.xLeft + u2 * (this.lastViewPort.xRight - this.lastViewPort.xLeft);
        var y2 = this.lastViewPort.yTop + v2 * (this.lastViewPort.yBottom - this.lastViewPort.yTop);
        if (type === user_input_1.UserInputType.Move && this.isInputDown) {
            type = user_input_1.UserInputType.Drag;
        }
        if (isMultipleStart) {
            type = user_input_1.UserInputType.ChangeToMultipleStart;
            this.hasBeenMultiple = true;
            this.inputDownStart = Date.now();
            isMultiple = true;
        }
        else if (isMultipleEnd) {
            type = user_input_1.UserInputType.MultipleEnd;
            isMultiple = true;
        }
        else if (!isMultiple && this.hasBeenMultiple) {
            type = user_input_1.UserInputType.MultipleEndAfter;
            isMultiple = true;
        }
        var duration = Date.now() - (this.inputDownStart || Date.now());
        this.onInput({ x: x, y: y, type: type, duration: duration, u: u, v: v, isMultiple: isMultiple, inputCount: inputCount, u2: u2, v2: v2, x2: x2, y2: y2 });
        if (origType === user_input_1.UserInputType.Start) {
            this.isInputDown = true;
            this.inputDownStart = Date.now();
        }
        else if (origType === user_input_1.UserInputType.End && !isAnyTouch) {
            this.isInputDown = false;
            this.inputDownStart = null;
            this.hasBeenMultiple = false;
        }
        e.preventDefault();
        return false;
    };
    CanvasRenderer.prototype.clear = function () {
        var cvs = this.canvas;
        var ctx = this.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
    };
    CanvasRenderer.prototype.drawItems = function (sprites, viewPort) {
        this.lastViewPort = viewPort;
        var OVER_SIZE = 4;
        var OVER_SIZE2 = 8;
        // Draw on the canvas context
        var cvs = this.canvas;
        var ctx = this.context;
        // Clip Half
        var wClip = cvs.width * (viewPort.clip_uRight - viewPort.clip_uLeft);
        var hClip = cvs.height * (viewPort.clip_vBottom - viewPort.clip_vTop);
        var xClip = cvs.width * viewPort.clip_uLeft;
        var yClip = cvs.height * viewPort.clip_vTop;
        ctx.beginPath();
        ctx.moveTo(xClip, yClip);
        ctx.lineTo(xClip + wClip, yClip);
        ctx.lineTo(xClip + wClip, yClip + hClip);
        ctx.lineTo(xClip, yClip + hClip);
        ctx.lineTo(xClip, yClip);
        ctx.clip();
        // ctx.clearRect(xClip, yClip, wClip, hClip);
        var xScale = wClip / (viewPort.xRight - viewPort.xLeft);
        var yScale = hClip / (viewPort.yBottom - viewPort.yTop);
        // TODO - Adjust
        var xLeft = viewPort.xLeft;
        var yTop = viewPort.yTop;
        // TODO: Is blocking highlight
        // let hasHighlight = sprites.some(s => s.shouldHighlight);
        // let zMaxHighlight = sprites.filter(s => s.shouldHighlight).reduce((out, s) => out > s.zIndex ? out : s.zIndex, -100000);
        // let zMinHighlight = sprites.filter(s => s.shouldHighlight).reduce((out, s) => out < s.zIndex ? out : s.zIndex, 100000);
        // console.log(hasHighlight, zMaxHighlight, zMinHighlight);
        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];
            var x = (s.x - xLeft) * xScale;
            var y = (s.y - yTop) * yScale;
            var w = s.sprite.width * xScale;
            var h = s.sprite.height * yScale;
            var overSize = 0; // s.zIndex > zMinHighlight ? -16 : 0;
            var overSize2 = 0; // overSize * 2;
            // if (s.shouldHighlight) {
            //     ctx.globalAlpha = 0.5;
            //     ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x + 2, y, w, h);
            //     ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y, w, h);
            //     ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y + 2, w, h);
            //     ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y - 2, w, h);
            //     ctx.globalAlpha = 1;
            // }
            ctx.globalAlpha = s.opacity;
            if (!s.shouldHighlight) {
                ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - overSize, y - overSize, w + overSize2, h + overSize2);
            }
            else {
                // if (s.shouldHighlight) {
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.RgbRotate2), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
                ctx.drawImage(canvas_image_effect_1.getImageEffect(s.sprite.spriteSheet, canvas_image_effect_1.ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
            }
            ctx.globalAlpha = 1;
        }
        // Draw Highlight above others
        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];
            var x = (s.x - xLeft) * xScale;
            var y = (s.y - yTop) * yScale;
            var w = s.sprite.width * xScale;
            var h = s.sprite.height * yScale;
            if (s.shouldBringToFront) {
                ctx.globalAlpha = 0.25 * s.opacity;
                ctx.drawImage(canvas_image_effect_1.getImageEffect(s.sprite.spriteSheet, canvas_image_effect_1.ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
                ctx.globalAlpha = 1;
            }
        }
    };
    return CanvasRenderer;
}(renderer_1.Renderer));
exports.CanvasRenderer = CanvasRenderer;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Renderer = (function () {
    function Renderer() {
    }
    // abstract drawLine(x1: number, y1: number, x2: number, y2: number, viewPort: ViewPort): void;
    Renderer.prototype.draw = function (map, viewPort) {
        // Filter the tiles that are in the viewPort
        var visibleItems = [];
        for (var iKey in map.tiles) {
            var i = iKey * 1;
            var column = map.tiles[i];
            for (var jKey in column) {
                var j = jKey * 1;
                var tile = column[j];
                var tileLeft = tile.x;
                var tileRight = tile.x + map.tileWidth;
                if (tileRight > viewPort.xLeft && tileLeft < viewPort.xRight) {
                    for (var k = 0; k < tile.stack.length; k++) {
                        var item = tile.stack[k];
                        var itemTop = item.y;
                        var itemBottom = item.y + item.sprite.height;
                        if (itemBottom > viewPort.yTop && itemTop < viewPort.yBottom) {
                            visibleItems.push(item);
                        }
                    }
                }
            }
        }
        visibleItems.push.apply(visibleItems, map.tileItems_floating);
        // for (let j = -10; j < 10; j++) {
        // }
        visibleItems.sort(function (a, b) { return a.zIndex - b.zIndex; });
        // // Tile Slots
        // let w = viewPort.xRight - viewPort.xLeft;
        // let slotCount = Math.floor(w / (map.tileWidth)) - 1;
        // for (let i = 0; i < slotCount; i++) {
        //     let s = map.toolSlots[i];
        //     if (s == null) {
        //         s = map.defaultSprite;
        //     }
        //     let wSlot = (w - map.tileWidth) / slotCount;
        //     let xSlotFirst = viewPort.xLeft + wSlot * 0.5;
        //     visibleItems.push({
        //         sprite: s,
        //         opacity: 1,
        //         shouldBringToFront: false,
        //         shouldHighlight: i === map.iToolSlot,
        //         x: xSlotFirst + wSlot * i,
        //         y: viewPort.yBottom - s.height - map.tileHeight * 0.5,
        //         zIndex: 100000,
        //     });
        // }
        this.drawItems(visibleItems, viewPort);
        // // DEBUG: Draw Grid
        // for (let i = -100; i < 100; i++) {
        //     let iSlope = map.shape === MapShape.Isometric ? 1 : 0;
        //     let jSlope = iSlope;
        //     // this.drawLine(i * map.tileWidth * 0.5 * iSlope * -10000, -10000 * map.tileHeight, i * map.tileWidth * 0.5 * iSlope * 10000, 10000 * map.tileHeight, viewPort);
        //     this.drawLine(i * map.tileWidth * 0.5, -10000 * map.tileHeight * 0.5, i * map.tileWidth * 0.5, 10000 * map.tileHeight * 0.5, viewPort);
        // }
        // for (let j = -100; j < 100; j++) {
        //     let iSlope = map.shape === MapShape.Isometric ? 1 : 0;
        //     let jSlope = iSlope;
        //     // this.drawLine(i * map.tileWidth * 0.5 * iSlope * -10000, -10000 * map.tileHeight, i * map.tileWidth * 0.5 * iSlope * 10000, 10000 * map.tileHeight, viewPort);
        //     this.drawLine(-10000 * map.tileWidth * 0.5, j * map.tileHeight * 0.5, 10000 * map.tileWidth * 0.5, j * map.tileHeight * 0.5, viewPort);
        // }
        // this.drawLine(viewPort.xLeft, -viewPort.yTop, 1000 + viewPort.xRight, -viewPort.yTop, viewPort);
        // this.drawLine(-viewPort.xLeft, viewPort.yTop, -viewPort.xLeft, 1000 + viewPort.yBottom, viewPort);
    };
    return Renderer;
}());
exports.Renderer = Renderer;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var xml2json_light_1 = __webpack_require__(24);
var sprite_sheet_loader_1 = __webpack_require__(15);
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


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var SpriteSheetLoader = (function () {
    function SpriteSheetLoader() {
    }
    return SpriteSheetLoader;
}());
exports.SpriteSheetLoader = SpriteSheetLoader;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(19));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Vanilla Ajax Requests
// From: http://stackoverflow.com/a/18078705/567524

var Ajax = (function () {
    function Ajax() {
    }
    Ajax.prototype.createXhr = function () {
        if (typeof XMLHttpRequest !== "undefined") {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];
        for (var i = 0; i < versions.length; i++) {
            try {
                return new ActiveXObject(versions[i]);
            }
            catch (e) {
            }
        }
    };
    // private send(url, callback, method, data, async = true) {
    //     var xhr = this.xhr;
    //     xhr.open(method, url, async);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4) {
    //             callback(xhr.responseText);
    //         }
    //     };
    //     if (method == 'POST') {
    //         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     }
    //     xhr.send(data);
    // };
    Ajax.prototype.get = function (url, onSuccess, onFail) {
        // var query = [];
        // for (var key in data) {
        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        // }
        // this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null);
        this.ajax({
            url: url,
            type: "GET",
            success: onSuccess,
            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ':' + information); }
        });
    };
    ;
    Ajax.prototype.post = function (url, data, onSuccess, onFail) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        var dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        this.ajax({
            url: url,
            data: dataString,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: onSuccess,
            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ':' + information); }
        });
    };
    ;
    Ajax.prototype.jsonp = function (url, data, onSuccess, onFail) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        var dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        var src = url
            + (url.indexOf('?') > 0 ? '&' : '?')
            + dataString;
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () { return onSuccess(); };
        script.onerror = function () { return onFail(); };
        document.head.appendChild(script);
    };
    ;
    Ajax.prototype.ajax = function (settings) {
        // settings.beforeSend
        // settings.complete
        // settings.contentType
        // settings.data
        // settings.dataType - No Processing Done Null or Text only
        // settings.error
        // settings.processData - Always false
        // settings.success
        // settings.type
        // settings.url
        if (settings.dataType != null && settings.dataType !== 'text') {
            throw 'Ajax Library does not process data - set to null or text';
        }
        settings.success = settings.success || (function () { });
        settings.error = settings.error || (function () { });
        settings.complete = settings.complete || (function () { });
        settings.beforeSend = settings.beforeSend || (function () { });
        var xhr = this.createXhr();
        var hasCompleted = false;
        setTimeout(function () {
            if (!hasCompleted) {
                settings.error(xhr, 'Timed Out', '');
            }
        }, 30 * 1000);
        var url = settings.url;
        var method = settings.type || 'GET';
        xhr.open(method, url, true);
        xhr.withCredentials = settings.withCredentials || false;
        xhr.onerror = function (ev) {
            settings.error(xhr, '' + xhr.status, '' + ev);
        };
        xhr.onreadystatechange = function () {
            // console.log("xhr.onreadystatechange",
            //     "settings.url", settings.url,
            //     "xhr.readyState", xhr.readyState,
            //     "xhr.status", xhr.status,
            //     "xhr.responseText", xhr.responseText.substr(0, 20),
            // );
            if (xhr.readyState === 4) {
                hasCompleted = true;
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        settings.success(xhr.responseText, '' + xhr.status, xhr);
                    }
                    catch (err) {
                        console.log('ERROR in success handler', err);
                    }
                }
                else {
                    try {
                        settings.error(xhr, '' + xhr.status, '');
                    }
                    catch (err) {
                        console.log('ERROR in error handler', err);
                    }
                }
                try {
                    settings.complete();
                }
                catch (err) {
                    console.log('ERROR in complete handler', err);
                }
            }
        };
        // if (method == 'POST') {
        //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // }
        if (settings.contentType != null) {
            xhr.setRequestHeader('Content-type', settings.contentType);
        }
        settings.beforeSend(xhr);
        xhr.send(settings.data);
    };
    return Ajax;
}());
exports.Ajax = Ajax;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var P = __webpack_require__(4);
var browser_ajax_1 = __webpack_require__(17);
function setupBrowser() {
    P.Platform.provider = new BrowserPlatformProvider();
    Promise = __webpack_require__(7).Promise;
}
exports.setupBrowser = setupBrowser;
var BrowserPlatformProvider = (function () {
    function BrowserPlatformProvider() {
    }
    BrowserPlatformProvider.prototype.http = function () {
        return new BrowserHttpClient();
    };
    return BrowserPlatformProvider;
}());
var BrowserHttpClient = (function () {
    function BrowserHttpClient() {
    }
    BrowserHttpClient.prototype.request = function (url, method, data, headers, withCredentials) {
        if (withCredentials === void 0) { withCredentials = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        method = method || 'GET';
                        if (typeof data === 'object' && data.constructor === Object) {
                            data = JSON.stringify(data);
                        }
                        new browser_ajax_1.Ajax().ajax({
                            url: _this.resolveUrl(url),
                            type: method,
                            data: data,
                            withCredentials: withCredentials,
                            beforeSend: function (xhr) {
                                if (headers != null) {
                                    for (var k in headers) {
                                        var v = headers[k];
                                        xhr.setRequestHeader(k, v);
                                    }
                                }
                            },
                            success: function (data, textStatus, response) {
                                var headersList = response.getAllResponseHeaders().split('\n').map(function (x) { return x.trim().split('='); });
                                var headers = {};
                                headersList.forEach(function (x) { return headers[x[0]] = x[1]; });
                                var dataObj = null;
                                try {
                                    dataObj = JSON.parse(data);
                                }
                                catch (err) {
                                }
                                resolve({ dataRaw: data, data: dataObj, headers: headers });
                            },
                            error: function (err) { return reject(err); }
                        });
                    })];
            });
        });
    };
    BrowserHttpClient.prototype.resolveUrl = function (url) { return P.Platform.urlResolver(url); };
    return BrowserHttpClient;
}());


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(4));
__export(__webpack_require__(18));


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Vanilla Ajax Requests
// From: http://stackoverflow.com/a/18078705/567524

var Ajax = (function () {
    function Ajax() {
    }
    Ajax.prototype.createXhr = function () {
        if (typeof XMLHttpRequest !== "undefined") {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];
        for (var i = 0; i < versions.length; i++) {
            try {
                return new ActiveXObject(versions[i]);
            }
            catch (e) {
            }
        }
    };
    // private send(url, callback, method, data, async = true) {
    //     var xhr = this.xhr;
    //     xhr.open(method, url, async);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4) {
    //             callback(xhr.responseText);
    //         }
    //     };
    //     if (method == 'POST') {
    //         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     }
    //     xhr.send(data);
    // };
    Ajax.prototype.get = function (url, onSuccess, onFail) {
        // var query = [];
        // for (var key in data) {
        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        // }
        // this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null);
        this.ajax({
            url: url,
            type: "GET",
            success: onSuccess,
            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ':' + information); }
        });
    };
    ;
    Ajax.prototype.post = function (url, data, onSuccess, onFail) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        var dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        this.ajax({
            url: url,
            data: dataString,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: onSuccess,
            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ':' + information); }
        });
    };
    ;
    Ajax.prototype.jsonp = function (url, data, onSuccess, onFail) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        var dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        var src = url
            + (url.indexOf('?') > 0 ? '&' : '?')
            + dataString;
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () { return onSuccess(); };
        script.onerror = function () { return onFail(); };
        document.head.appendChild(script);
    };
    ;
    Ajax.prototype.ajax = function (settings) {
        // settings.beforeSend
        // settings.complete
        // settings.contentType
        // settings.data
        // settings.dataType - No Processing Done Null or Text only
        // settings.error
        // settings.processData - Always false
        // settings.success
        // settings.type
        // settings.url
        if (settings.dataType != null && settings.dataType !== 'text') {
            throw 'Ajax Library does not process data - set to null or text';
        }
        settings.success = settings.success || (function () { });
        settings.error = settings.error || (function () { });
        settings.complete = settings.complete || (function () { });
        settings.beforeSend = settings.beforeSend || (function () { });
        var xhr = this.createXhr();
        var hasCompleted = false;
        setTimeout(function () {
            if (!hasCompleted) {
                settings.error(xhr, 'Timed Out', '');
            }
        }, 30 * 1000);
        var url = settings.url;
        var method = settings.type || 'GET';
        xhr.open(method, url, true);
        xhr.withCredentials = settings.withCredentials || false;
        xhr.onerror = function (ev) {
            settings.error(xhr, '' + xhr.status, '' + ev);
        };
        xhr.onreadystatechange = function () {
            // console.log("xhr.onreadystatechange",
            //     "settings.url", settings.url,
            //     "xhr.readyState", xhr.readyState,
            //     "xhr.status", xhr.status,
            //     "xhr.responseText", xhr.responseText.substr(0, 20),
            // );
            if (xhr.readyState === 4) {
                hasCompleted = true;
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        settings.success(xhr.responseText, '' + xhr.status, xhr);
                    }
                    catch (err) {
                        console.log('ERROR in success handler', err);
                    }
                }
                else {
                    try {
                        settings.error(xhr, '' + xhr.status, '');
                    }
                    catch (err) {
                        console.log('ERROR in error handler', err);
                    }
                }
                try {
                    settings.complete();
                }
                catch (err) {
                    console.log('ERROR in complete handler', err);
                }
            }
        };
        // if (method == 'POST') {
        //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // }
        if (settings.contentType != null) {
            xhr.setRequestHeader('Content-type', settings.contentType);
        }
        settings.beforeSend(xhr);
        xhr.send(settings.data);
    };
    return Ajax;
}());
exports.Ajax = Ajax;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var P = __webpack_require__(6);
var browser_ajax_1 = __webpack_require__(21);
function setupBrowser() {
    P.Platform.provider = new BrowserPlatformProvider();
    Promise = __webpack_require__(7).Promise;
}
exports.setupBrowser = setupBrowser;
var BrowserPlatformProvider = (function () {
    function BrowserPlatformProvider() {
    }
    BrowserPlatformProvider.prototype.http = function () {
        return new BrowserHttpClient();
    };
    return BrowserPlatformProvider;
}());
var BrowserHttpClient = (function () {
    function BrowserHttpClient() {
    }
    BrowserHttpClient.prototype.request = function (url, method, data, headers, withCredentials) {
        if (withCredentials === void 0) { withCredentials = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        method = method || 'GET';
                        if (typeof data === 'object' && data.constructor === Object) {
                            data = JSON.stringify(data);
                        }
                        new browser_ajax_1.Ajax().ajax({
                            url: _this.resolveUrl(url),
                            type: method,
                            data: data,
                            withCredentials: withCredentials,
                            beforeSend: function (xhr) {
                                if (headers != null) {
                                    for (var k in headers) {
                                        var v = headers[k];
                                        xhr.setRequestHeader(k, v);
                                    }
                                }
                            },
                            success: function (data, textStatus, response) {
                                var headersList = response.getAllResponseHeaders().split('\n').map(function (x) { return x.trim().split('='); });
                                var headers = {};
                                headersList.forEach(function (x) { return headers[x[0]] = x[1]; });
                                var dataObj = null;
                                try {
                                    dataObj = JSON.parse(data);
                                }
                                catch (err) {
                                }
                                resolve({ dataRaw: data, data: dataObj, headers: headers });
                            },
                            error: function (err) { return reject(err); }
                        });
                    })];
            });
        });
    };
    BrowserHttpClient.prototype.resolveUrl = function (url) { return P.Platform.urlResolver(url); };
    return BrowserHttpClient;
}());


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    xml2json: xml2json
};

//***********************************************************************
// Main function. Clears the given xml and then starts the recursion
//***********************************************************************
function xml2json(xmlStr){ 
    xmlStr = cleanXML(xmlStr);
    return xml2jsonRecurse(xmlStr,0); 
}

//***********************************************************************
// Recursive function that creates a JSON object with a given XML string.
//***********************************************************************
function xml2jsonRecurse(xmlStr) {
    var obj = {},
        tagName, indexClosingTag, inner_substring, tempVal, openingTag;

    while (xmlStr.match(/<[^\/][^>]*>/)) {
        openingTag = xmlStr.match(/<[^\/][^>]*>/)[0];
        tagName = openingTag.substring(1, openingTag.length - 1);
        indexClosingTag = xmlStr.indexOf(openingTag.replace('<', '</'));

        // account for case where additional information in the openning tag
        if (indexClosingTag == -1) {

            tagName = openingTag.match(/[^<][\w+$]*/)[0];
            indexClosingTag = xmlStr.indexOf('</' + tagName);
            if (indexClosingTag == -1) {
                indexClosingTag = xmlStr.indexOf('<\\/' + tagName);
            }
        }
        inner_substring = xmlStr.substring(openingTag.length, indexClosingTag);
        if (inner_substring.match(/<[^\/][^>]*>/)) {
            tempVal = xml2json(inner_substring);
        }
        else {
            tempVal = inner_substring;
        }
        // account for array or obj //
        if (obj[tagName] === undefined) {
            obj[tagName] = tempVal;
        }
        else if (Array.isArray(obj[tagName])) {
            obj[tagName].push(tempVal);
        }
        else {
            obj[tagName] = [obj[tagName], tempVal];
        }

        xmlStr = xmlStr.substring(openingTag.length * 2 + 1 + inner_substring.length);
    }

    return obj;
}

//*****************************************************************
// Removes some characters that would break the recursive function.
//*****************************************************************
function cleanXML(xmlStr) {
    
    xmlStr = xmlStr.replace( /<!--[\s\S]*?-->/g, '' ); //remove commented lines
    xmlStr = xmlStr.replace(/\n|\t|\r/g, ''); //replace special characters
    xmlStr = xmlStr.replace(/ {1,}<|\t{1,}</g, '<'); //replace leading spaces and tabs
    xmlStr = xmlStr.replace(/> {1,}|>\t{1,}/g, '>'); //replace trailing spaces and tabs
    xmlStr = xmlStr.replace(/<\?[^>]*\?>/g, ''); //delete docType tags

    xmlStr = replaceSelfClosingTags(xmlStr); //replace self closing tags
    xmlStr = replaceAloneValues(xmlStr); //replace the alone tags values
    xmlStr = replaceAttributes(xmlStr); //replace attributes

    return xmlStr;
}

//************************************************************************************************************
// Replaces all the self closing tags with attributes with another tag containing its attribute as a property.
// The function works if the tag contains multiple attributes. 
//
// Example : '<tagName attrName="attrValue" />' becomes 
//           '<tagName><attrName>attrValue</attrName></tagName>'
//************************************************************************************************************
function replaceSelfClosingTags(xmlStr) {

    var selfClosingTags = xmlStr.match(/<[^/][^>]*\/>/g);

    if (selfClosingTags) {
        for (var i = 0; i < selfClosingTags.length; i++) {

            var oldTag = selfClosingTags[i];
            var tempTag = oldTag.substring(0, oldTag.length - 2);
            tempTag += ">";

            var tagName = oldTag.match(/[^<][\w+$]*/)[0];
            var closingTag = "</" + tagName + ">";
            var newTag = "<" + tagName + ">";

            var attrs = tempTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);

            if (attrs) {
                for(var j = 0; j < attrs.length; j++) {
                    var attr = attrs[j];
                    var attrName = attr.substring(0, attr.indexOf('='));
                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
                    
                    newTag += "<" + attrName + ">" + attrValue + "</" + attrName + ">";
                }
            }

            newTag += closingTag;

            xmlStr = xmlStr.replace(oldTag, newTag);
        }
    }

    return xmlStr;
}

//*************************************************************************************************
// Replaces all the tags with attributes and a value with a new tag.
// 
// Example : '<tagName attrName="attrValue">tagValue</tagName>' becomes 
//           '<tagName><attrName>attrValue</attrName><_@attribute>tagValue</_@attribute></tagName>'
//*************************************************************************************************
function replaceAloneValues(xmlStr) {
 
    var tagsWithAttributesAndValue = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>{1}([^<]+)/g);
    
    if (tagsWithAttributesAndValue) {
        for(var i = 0; i < tagsWithAttributesAndValue.length; i++) {

            var oldTag = tagsWithAttributesAndValue[i];
            var oldTagName = oldTag.substring(0, oldTag.indexOf(">") + 1);
            var oldTagValue = oldTag.substring(oldTag.indexOf(">") + 1);
            
            var newTag = oldTagName + "<_@ttribute>" + oldTagValue + "</_@ttribute>";
            
            xmlStr = xmlStr.replace(oldTag, newTag);
        }    
    }
    
    return xmlStr;
}

//*****************************************************************************************************************
// Replaces all the tags with attributes with another tag containing its attribute as a property.
// The function works if the tag contains multiple attributes.
//
// Example : '<tagName attrName="attrValue"></tagName>' becomes '<tagName><attrName>attrValue</attrName></tagName>'
//*****************************************************************************************************************
function replaceAttributes(xmlStr) {

    var tagsWithAttributes = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>/g);

    if (tagsWithAttributes) {
        for (var i = 0; i < tagsWithAttributes.length; i++) {
           
            var oldTag = tagsWithAttributes[i];
            var tagName = oldTag.match(/[^<][\w+$]*/)[0];
            var newTag = "<" + tagName + ">";
            var attrs = oldTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);

            if (attrs) {
                for(var j = 0; j < attrs.length; j++) {
                    
                    var attr = attrs[j];
                    var attrName = attr.substring(0, attr.indexOf('='));
                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
                    
                    newTag += "<" + attrName + ">" + attrValue + "</" + attrName + ">";
                }
            }

            xmlStr = xmlStr.replace(oldTag, newTag);
        }
    }

    return xmlStr;
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
__webpack_require__(8);


/***/ })
/******/ ]);
//# sourceMappingURL=tiled-map-canvas.js.map