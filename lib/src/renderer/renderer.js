"use strict";
var Renderer = (function () {
    function Renderer() {
    }
    Renderer.prototype.draw = function (map, viewPort) {
        // Filter the tiles that are in the viewPort
        var visibleItems = [];
        for (var i = 0; i < map.tiles.length; i++) {
            var column = map.tiles[i];
            for (var j = 0; j < column.length; j++) {
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
        visibleItems.sort(function (a, b) { return b.zIndex - a.zIndex; });
        this.drawItems(visibleItems, viewPort);
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map