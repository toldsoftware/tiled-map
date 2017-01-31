"use strict";
var tslib_1 = require("tslib");
var renderer_1 = require("./renderer");
var user_input_1 = require("../user-input/user-input");
var canvas_image_effect_1 = require("./canvas-image-effect");
var DEBUG = true;
function createBuffer() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    return { canvas: canvas, context: context };
}
var CanvasRenderer = (function (_super) {
    tslib_1.__extends(CanvasRenderer, _super);
    function CanvasRenderer(host) {
        var _this = _super.call(this) || this;
        _this.isInputDown = false;
        _this.finalBuffer = createBuffer();
        host.appendChild(_this.finalBuffer.canvas);
        _this.mainBuffer = _this.finalBuffer;
        _this.highlightBuffer = createBuffer();
        var resize = function () {
            _this.width = _this.finalBuffer.canvas.width = host.clientWidth;
            _this.height = _this.finalBuffer.canvas.height = host.clientHeight;
            // Trigger redraw all
            _this.lastViewportValues = null;
            if (_this.onResize) {
                _this.onResize();
            }
        };
        resize();
        host.addEventListener('resize', function () { return resize(); });
        window.addEventListener('resize', function () { return resize(); });
        _this.finalBuffer.canvas.addEventListener('mousedown', function (e) { return _this.getInput(e, user_input_1.UserInputType.Start); });
        _this.finalBuffer.canvas.addEventListener('touchstart', function (e) { return _this.getInput(e, user_input_1.UserInputType.Start, true); });
        window.addEventListener('mousemove', function (e) { return _this.getInput(e, user_input_1.UserInputType.Move); });
        window.addEventListener('touchmove', function (e) { return _this.getInput(e, user_input_1.UserInputType.Move, true); });
        window.addEventListener('mouseup', function (e) { return _this.getInput(e, user_input_1.UserInputType.End); });
        window.addEventListener('touchend', function (e) { return _this.getInput(e, user_input_1.UserInputType.End, true); });
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
    CanvasRenderer.prototype.getInput = function (e, type, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        if (this.lastViewport == null || this.onInput == null) {
            return;
        }
        // console.log('CanvasRenderer.getInput', e, this.onInput, this.lastViewPort);
        var origType = type;
        var xCanvas = this.xCanvasLast;
        var yCanvas = this.yCanvasLast;
        var cvs = this.finalBuffer.canvas;
        var rect = cvs.getBoundingClientRect();
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
        var u = (xCanvas / cvs.width);
        var v = (yCanvas / cvs.height);
        var x = this.lastViewport.xLeft + u * (this.lastViewport.xRight - this.lastViewport.xLeft);
        var y = this.lastViewport.yTop + v * (this.lastViewport.yBottom - this.lastViewport.yTop);
        var u2 = (x2Canvas / cvs.width);
        var v2 = (y2Canvas / cvs.height);
        var x2 = this.lastViewport.xLeft + u2 * (this.lastViewport.xRight - this.lastViewport.xLeft);
        var y2 = this.lastViewport.yTop + v2 * (this.lastViewport.yBottom - this.lastViewport.yTop);
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
        this.onInput({ x: x, y: y, type: type, duration: duration, u: u, v: v, isMultiple: isMultiple, inputCount: inputCount, u2: u2, v2: v2, x2: x2, y2: y2, isTouch: isTouch });
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
        var cvs = this.finalBuffer.canvas;
        var ctx = this.finalBuffer.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        if (this.finalBuffer !== this.mainBuffer) {
            cvs = this.mainBuffer.canvas;
            ctx = this.mainBuffer.context;
            ctx.clearRect(0, 0, cvs.width, cvs.height);
        }
    };
    CanvasRenderer.prototype.drawItems = function (sprites, viewport, tileWidth, tileHeight) {
        this.lastViewport = viewport;
        var shouldDrawOnlyDirty = true;
        if (!this.lastViewportValues
            || this.lastViewportValues.xLeft !== viewport.xLeft
            || this.lastViewportValues.xRight !== viewport.xRight
            || this.lastViewportValues.yBottom !== viewport.yBottom
            || this.lastViewportValues.yTop !== viewport.yTop
            || this.lastViewportValues.clip_uLeft !== viewport.clip_uLeft
            || this.lastViewportValues.clip_uRight !== viewport.clip_uRight
            || this.lastViewportValues.clip_vBottom !== viewport.clip_vBottom
            || this.lastViewportValues.clip_vTop !== viewport.clip_vTop) {
            shouldDrawOnlyDirty = false;
        }
        this.lastViewportValues = tslib_1.__assign({}, viewport);
        var OVER_SIZE = 4;
        var OVER_SIZE2 = 8;
        // Draw on the canvas context
        var cvs = this.mainBuffer.canvas;
        var ctx = this.mainBuffer.context;
        // TEST iOS
        var roundToPixels = false;
        // Clip
        var wClip = cvs.width * (viewport.clip_uRight - viewport.clip_uLeft);
        var hClip = cvs.height * (viewport.clip_vBottom - viewport.clip_vTop);
        var xClip = cvs.width * viewport.clip_uLeft;
        var yClip = cvs.height * viewport.clip_vTop;
        var viewportWidth = (viewport.xRight - viewport.xLeft);
        var viewportHeight = (viewport.yBottom - viewport.yTop);
        var xScale = wClip / viewportWidth;
        var yScale = hClip / viewportHeight;
        var xLeft = viewport.xLeft;
        var yTop = viewport.yTop;
        // TODO: Use pixel sensitive size
        // let minScale = Math.min(xScale, yScale);
        // let targetScale = 1;
        // let nextTargetScale = 1;
        // let f = 1;
        // while (minScale < nextTargetScale) {
        //     if (tileWidth * nextTargetScale === Math.round(tileWidth * nextTargetScale)
        //         && tileHeight * nextTargetScale === Math.round(tileHeight * nextTargetScale)
        //     ) {
        //         targetScale = nextTargetScale;
        //         console.log('f=', f, tileWidth * nextTargetScale, tileHeight * nextTargetScale);
        //     }
        //     f++;
        //     nextTargetScale = 1.0 / f;
        // }
        // let targetViewportWidth = Math.ceil(viewportWidth * targetScale);
        // let targetViewportHeight = Math.ceil(viewportHeight * targetScale);
        // // TEST
        // xScale = targetScale;
        // yScale = targetScale;
        // xLeft = Math.round(xLeft);
        // yTop = Math.round(yTop);
        // console.log('targetScale=', targetScale, minScale, sprites[0].sprite.width * targetScale, sprites[0].sprite.height * targetScale, targetViewportWidth, targetViewportHeight, viewportWidth, viewportHeight);
        if (this.finalBuffer !== this.mainBuffer) {
        }
        if (this.highlightBuffer.canvas.width !== cvs.width
            || this.highlightBuffer.canvas.width !== cvs.height) {
            this.highlightBuffer.canvas.width = cvs.width;
            this.highlightBuffer.canvas.height = cvs.height;
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xClip, yClip);
        ctx.lineTo(xClip + wClip, yClip);
        ctx.lineTo(xClip + wClip, yClip + hClip);
        ctx.lineTo(xClip, yClip + hClip);
        ctx.lineTo(xClip, yClip);
        ctx.clip();
        var clipBorder = 10;
        var sAreas = sprites.map(function (s) { return ({
            sprite: s,
            overlap: [s],
            x: (s.x - xLeft) * xScale,
            y: (s.y - yTop) * yScale,
            w: s.sprite.width * xScale,
            h: s.sprite.height * yScale,
        }); }).map(function (s) { return (tslib_1.__assign({}, s, { xMinClip_new: Math.floor(s.x - clipBorder), yMinClip_new: Math.floor(s.y - clipBorder), xMaxClip_new: Math.ceil(s.x + s.w + clipBorder), yMaxClip_new: Math.ceil(s.y + s.h + clipBorder) })); }).map(function (s) { return (tslib_1.__assign({}, s, { xMinClip: Math.min(s.xMinClip_new, s.sprite.xMinClip_last), yMinClip: Math.min(s.yMinClip_new, s.sprite.yMinClip_last), xMaxClip: Math.max(s.xMaxClip_new, s.sprite.xMaxClip_last), yMaxClip: Math.max(s.yMaxClip_new, s.sprite.yMaxClip_last) })); });
        var dirty = sAreas.filter(function (s) { return s.sprite.isDirty; });
        if (shouldDrawOnlyDirty) {
            for (var i = 0; i < sAreas.length; i++) {
                var s = sAreas[i];
                for (var j = 0; j < dirty.length; j++) {
                    var d = dirty[j];
                    if (s.xMinClip <= d.xMaxClip && s.xMaxClip >= d.xMinClip
                        && s.yMinClip <= d.yMaxClip && s.yMaxClip >= d.yMinClip) {
                        d.overlap.push(s.sprite);
                    }
                }
            }
            for (var i = 0; i < dirty.length; i++) {
                var d = dirty[i];
                d.overlap.sort(function (a, b) { return a.zIndex - b.zIndex; });
            }
        }
        else {
            dirty = sAreas;
        }
        // console.log('dirty.length', dirty.length);
        for (var i = 0; i < dirty.length; i++) {
            var d = dirty[i];
            ctx.save();
            ctx.beginPath();
            ctx.rect(d.xMinClip, d.yMinClip, d.xMaxClip - d.xMinClip, d.yMaxClip - d.yMinClip);
            // ctx.stroke();
            ctx.clip();
            for (var j = 0; j < d.overlap.length; j++) {
                var s = d.overlap[j];
                var x = (s.x - xLeft) * xScale;
                var y = (s.y - yTop) * yScale;
                var w = s.sprite.width * xScale;
                var h = s.sprite.height * yScale;
                // ctx.rect(x, y, w, h);
                // ctx.fillStyle = 'rgba(0,0,0,0.1)';
                // ctx.fill();
                // Round to Pixel (Creates Artifacts)
                if (roundToPixels) {
                    x = Math.round(x);
                    y = Math.round(y);
                    w = Math.round(w);
                    h = Math.round(h);
                }
                var overSize = 0; // s.zIndex > zMinHighlight ? -16 : 0;
                var overSize2 = 0; // overSize * 2;
                ctx.globalAlpha = s.opacity;
                if (!s.shouldHighlight) {
                    ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - overSize, y - overSize, w + overSize2, h + overSize2);
                }
                else {
                    ctx.drawImage(canvas_image_effect_1.getImageEffect(s.sprite.spriteSheet, canvas_image_effect_1.ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
                }
                ctx.globalAlpha = 1;
            }
            ctx.restore();
        }
        // Draw Highlight above others
        cvs = this.highlightBuffer.canvas;
        ctx = this.highlightBuffer.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        for (var i = 0; i < dirty.length; i++) {
            var d = dirty[i];
            ctx.save();
            ctx.beginPath();
            ctx.rect(d.xMinClip, d.yMinClip, d.xMaxClip - d.xMinClip, d.yMaxClip - d.yMinClip);
            ctx.clip();
            for (var j = 0; j < d.overlap.length; j++) {
                var s = d.overlap[j];
                var x = (s.x - xLeft) * xScale;
                var y = (s.y - yTop) * yScale;
                var w = s.sprite.width * xScale;
                var h = s.sprite.height * yScale;
                // Round to Pixel
                if (roundToPixels) {
                    x = Math.round(x);
                    y = Math.round(y);
                    w = Math.round(w);
                    h = Math.round(h);
                }
                if (s.shouldBringToFront) {
                    ctx.globalAlpha = s.opacity;
                    ctx.drawImage(canvas_image_effect_1.getImageEffect(s.sprite.spriteSheet, canvas_image_effect_1.ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
                    ctx.globalAlpha = 1;
                }
            }
            ctx.restore();
        }
        // Draw the highlight buffer onto the main canvas
        cvs = this.mainBuffer.canvas;
        ctx = this.mainBuffer.context;
        ctx.globalAlpha = 0.25;
        ctx.drawImage(this.highlightBuffer.canvas, 0, 0, cvs.width, cvs.height);
        ctx.globalAlpha = 1;
        // Reset is dirty
        for (var i = 0; i < dirty.length; i++) {
            var d = dirty[i];
            var s = d.sprite;
            s.isDirty = false;
            s.xMinClip_last = d.xMinClip_new;
            s.yMinClip_last = d.yMinClip_new;
            s.xMaxClip_last = d.xMaxClip_new;
            s.yMaxClip_last = d.yMaxClip_new;
        }
        ctx.restore();
        // TODO: Draw to final buffer
        if (this.finalBuffer !== this.mainBuffer) {
        }
    };
    return CanvasRenderer;
}(renderer_1.Renderer));
exports.CanvasRenderer = CanvasRenderer;
//# sourceMappingURL=canvas-renderer.js.map