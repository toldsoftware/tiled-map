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
        this.drawItems(visibleItems, viewPort, map.tileWidth, map.tileHeight);
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
//# sourceMappingURL=renderer.js.map