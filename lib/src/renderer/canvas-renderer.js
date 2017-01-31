"use strict";
var tslib_1 = require("tslib");
var renderer_1 = require("./renderer");
var user_input_1 = require("../user-input/user-input");
var canvas_image_effect_1 = require("./canvas-image-effect");
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
//# sourceMappingURL=canvas-renderer.js.map