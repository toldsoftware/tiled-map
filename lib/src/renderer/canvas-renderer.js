"use strict";
var tslib_1 = require("tslib");
var renderer_1 = require("./renderer");
var CanvasRenderer = (function (_super) {
    tslib_1.__extends(CanvasRenderer, _super);
    function CanvasRenderer(host) {
        var _this = _super.call(this) || this;
        _this.canvas = document.createElement('canvas');
        _this.context = _this.canvas.getContext('2d');
        return _this;
    }
    CanvasRenderer.prototype.drawItems = function (sprites, viewPort) {
        // Draw on the canvas context
        var ctx = this.context;
        var cvs = this.canvas;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        var xScale = (viewPort.xRight - viewPort.xLeft) / cvs.width;
        var yScale = (viewPort.yBottom - viewPort.yTop) / cvs.height;
        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];
            var x = s.x - viewPort.xLeft;
            var y = s.y - viewPort.yTop;
            var w = cvs.width * xScale;
            var h = cvs.height * yScale;
            ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
        }
    };
    return CanvasRenderer;
}(renderer_1.Renderer));
exports.CanvasRenderer = CanvasRenderer;
//# sourceMappingURL=canvas-renderer.js.map