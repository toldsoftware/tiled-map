import { Renderer } from './renderer';
import { UserInput, UserInputType } from '../user-input/user-input';
import { SpriteInstance, ViewPort } from '../tiled-map';
import { getImageEffect, ImageEffectKind } from './canvas-image-effect';

const DEBUG = true;

export interface CanvasBuffer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}

function createBuffer() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    return { canvas, context };
}

export class CanvasRenderer extends Renderer {

    finalBuffer: CanvasBuffer;
    mainBuffer: CanvasBuffer;
    highlightBuffer: CanvasBuffer;

    onInput: (input: UserInput) => void;
    isInputDown = false;
    inputDownStart: number;

    lastViewport: ViewPort;
    lastViewportValues: ViewPort;

    xCanvasLast: number;
    yCanvasLast: number;

    isMultipleLast: boolean;
    hasBeenMultiple: boolean;
    x2CanvasLast: number;
    y2CanvasLast: number;

    width: number;
    height: number;
    onResize: () => void;
    onZoom: (scaleRatio: number) => void;

    constructor(host: HTMLElement) {
        super();
        this.finalBuffer = createBuffer();
        host.appendChild(this.finalBuffer.canvas);

        this.mainBuffer = this.finalBuffer;
        this.highlightBuffer = createBuffer();

        let resize = () => {
            this.width = this.finalBuffer.canvas.width = host.clientWidth;
            this.height = this.finalBuffer.canvas.height = host.clientHeight;

            // Trigger redraw all
            this.lastViewportValues = null;

            if (this.onResize) { this.onResize(); }
        };

        resize();
        host.addEventListener('resize', () => resize());
        window.addEventListener('resize', () => resize());

        this.finalBuffer.canvas.addEventListener('mousedown', (e) => this.getInput(e, UserInputType.Start));
        this.finalBuffer.canvas.addEventListener('touchstart', (e) => this.getInput(e, UserInputType.Start, true));
        window.addEventListener('mousemove', (e) => this.getInput(e, UserInputType.Move));
        window.addEventListener('touchmove', (e) => this.getInput(e, UserInputType.Move, true));
        window.addEventListener('mouseup', (e) => this.getInput(e, UserInputType.End));
        window.addEventListener('touchend', (e) => this.getInput(e, UserInputType.End, true));

        window.addEventListener('mousewheel', (e) => {
            if (!this.onZoom) { return; }

            let amount = e.deltaY;

            if (amount > 0) {
                this.onZoom(1.1);
            } else if (amount < 0) {
                this.onZoom(0.8888);
            }
            console.log(e);
        });
    }

    getInput(e: Event, type: UserInputType, isTouch = false): false {
        if (this.lastViewport == null || this.onInput == null) { return; }
        // console.log('CanvasRenderer.getInput', e, this.onInput, this.lastViewPort);

        let origType = type;

        let xCanvas = this.xCanvasLast;
        let yCanvas = this.yCanvasLast;

        let cvs = this.finalBuffer.canvas;

        let rect = cvs.getBoundingClientRect();

        let me = e as MouseEvent;
        let te = e as TouchEvent;

        let isMultiple = false;
        let x2Canvas = this.x2CanvasLast;
        let y2Canvas = this.y2CanvasLast;

        let isAnyTouch = false;
        let inputCount = 0;

        if (me.clientX) {
            xCanvas = me.clientX - rect.left;
            yCanvas = me.clientY - rect.top;
            inputCount = 1;
        } else if (te.touches != null && te.touches.length > 0) {
            xCanvas = te.touches[0].clientX - rect.left;
            yCanvas = te.touches[0].clientY - rect.top;
            inputCount = 1;

            if (te.touches[1]) {
                if (DEBUG) { console.log('2 FINGER'); }

                x2Canvas = te.touches[1].clientX - rect.left;
                y2Canvas = te.touches[1].clientY - rect.top;
                isMultiple = true;
                inputCount = 2;
            }

            isAnyTouch = true;
        }

        let isMultipleStart = isMultiple && !this.isMultipleLast;
        let isMultipleEnd = !isMultiple && this.isMultipleLast;

        this.xCanvasLast = xCanvas;
        this.yCanvasLast = yCanvas;
        this.x2CanvasLast = x2Canvas;
        this.y2CanvasLast = y2Canvas;
        this.isMultipleLast = isMultiple;

        // Scale for viewPort
        let u = (xCanvas / cvs.width);
        let v = (yCanvas / cvs.height);
        let x = this.lastViewport.xLeft + u * (this.lastViewport.xRight - this.lastViewport.xLeft);
        let y = this.lastViewport.yTop + v * (this.lastViewport.yBottom - this.lastViewport.yTop);

        let u2 = (x2Canvas / cvs.width);
        let v2 = (y2Canvas / cvs.height);
        let x2 = this.lastViewport.xLeft + u2 * (this.lastViewport.xRight - this.lastViewport.xLeft);
        let y2 = this.lastViewport.yTop + v2 * (this.lastViewport.yBottom - this.lastViewport.yTop);

        if (type === UserInputType.Move && this.isInputDown) {
            type = UserInputType.Drag;
        }

        if (isMultipleStart) {
            type = UserInputType.ChangeToMultipleStart;
            this.hasBeenMultiple = true;
            this.inputDownStart = Date.now();
            isMultiple = true;
        } else if (isMultipleEnd) {
            type = UserInputType.MultipleEnd;
            isMultiple = true;
        } else if (!isMultiple && this.hasBeenMultiple) {
            type = UserInputType.MultipleEndAfter;
            isMultiple = true;
        }

        let duration = Date.now() - (this.inputDownStart || Date.now());

        this.onInput({ x, y, type, duration, u, v, isMultiple, inputCount, u2, v2, x2, y2, isTouch });

        if (origType === UserInputType.Start) {
            this.isInputDown = true;
            this.inputDownStart = Date.now();
        } else if (origType === UserInputType.End && !isAnyTouch) {
            this.isInputDown = false;
            this.inputDownStart = null;
            this.hasBeenMultiple = false;
        }

        e.preventDefault();
        return false;
    }

    clear() {
        let cvs = this.finalBuffer.canvas;
        let ctx = this.finalBuffer.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        if (this.finalBuffer !== this.mainBuffer) {
            cvs = this.mainBuffer.canvas;
            ctx = this.mainBuffer.context;
            ctx.clearRect(0, 0, cvs.width, cvs.height);
        }
    }

    drawItems(sprites: SpriteInstance[], viewport: ViewPort, tileWidth: number, tileHeight: number) {
        this.lastViewport = viewport;

        let shouldDrawOnlyDirty = true;

        if (!this.lastViewportValues
            || this.lastViewportValues.xLeft !== viewport.xLeft
            || this.lastViewportValues.xRight !== viewport.xRight
            || this.lastViewportValues.yBottom !== viewport.yBottom
            || this.lastViewportValues.yTop !== viewport.yTop
            || this.lastViewportValues.clip_uLeft !== viewport.clip_uLeft
            || this.lastViewportValues.clip_uRight !== viewport.clip_uRight
            || this.lastViewportValues.clip_vBottom !== viewport.clip_vBottom
            || this.lastViewportValues.clip_vTop !== viewport.clip_vTop
        ) {
            shouldDrawOnlyDirty = false;
        }

        this.lastViewportValues = { ...viewport };

        const OVER_SIZE = 4;
        const OVER_SIZE2 = 8;

        // Draw on the canvas context
        let cvs = this.mainBuffer.canvas;
        let ctx = this.mainBuffer.context;

        // TEST iOS
        let roundToPixels = false;

        // Clip
        let wClip = cvs.width * (viewport.clip_uRight - viewport.clip_uLeft);
        let hClip = cvs.height * (viewport.clip_vBottom - viewport.clip_vTop);
        let xClip = cvs.width * viewport.clip_uLeft;
        let yClip = cvs.height * viewport.clip_vTop;

        let viewportWidth = (viewport.xRight - viewport.xLeft);
        let viewportHeight = (viewport.yBottom - viewport.yTop);
        let xScale = wClip / viewportWidth;
        let yScale = hClip / viewportHeight;
        let xLeft = viewport.xLeft;
        let yTop = viewport.yTop;

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
            || this.highlightBuffer.canvas.width !== cvs.height
        ) {
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

        let clipBorder = 10;

        let sAreas = sprites.map(s => ({
            sprite: s,
            overlap: [s] as typeof s[],
            x: (s.x - xLeft) * xScale,
            y: (s.y - yTop) * yScale,
            w: s.sprite.width * xScale,
            h: s.sprite.height * yScale,
        })).map(s => ({
            ...s,
            xMinClip_new: Math.floor(s.x - clipBorder),
            yMinClip_new: Math.floor(s.y - clipBorder),
            xMaxClip_new: Math.ceil(s.x + s.w + clipBorder),
            yMaxClip_new: Math.ceil(s.y + s.h + clipBorder)
        })).map(s => ({
            ...s,
            xMinClip: Math.min(s.xMinClip_new, s.sprite.xMinClip_last),
            yMinClip: Math.min(s.yMinClip_new, s.sprite.yMinClip_last),
            xMaxClip: Math.max(s.xMaxClip_new, s.sprite.xMaxClip_last),
            yMaxClip: Math.max(s.yMaxClip_new, s.sprite.yMaxClip_last)
        }));
        let dirty = sAreas.filter(s => s.sprite.isDirty);

        if (shouldDrawOnlyDirty) {

            for (let i = 0; i < sAreas.length; i++) {
                let s = sAreas[i];
                for (let j = 0; j < dirty.length; j++) {
                    let d = dirty[j];

                    if (s.xMinClip <= d.xMaxClip && s.xMaxClip >= d.xMinClip
                        && s.yMinClip <= d.yMaxClip && s.yMaxClip >= d.yMinClip) {
                        d.overlap.push(s.sprite);
                    }
                }
            }

            for (let i = 0; i < dirty.length; i++) {
                let d = dirty[i];
                d.overlap.sort((a, b) => a.zIndex - b.zIndex);
            }
        } else {
            dirty = sAreas;
        }

        // console.log('dirty.length', dirty.length);

        for (let i = 0; i < dirty.length; i++) {
            let d = dirty[i];
            ctx.save();
            ctx.beginPath();
            ctx.rect(d.xMinClip, d.yMinClip, d.xMaxClip - d.xMinClip, d.yMaxClip - d.yMinClip);
            // ctx.stroke();
            ctx.clip();

            for (let j = 0; j < d.overlap.length; j++) {
                let s = d.overlap[j];
                let x = (s.x - xLeft) * xScale;
                let y = (s.y - yTop) * yScale;
                let w = s.sprite.width * xScale;
                let h = s.sprite.height * yScale;

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

                let overSize = 0; // s.zIndex > zMinHighlight ? -16 : 0;
                let overSize2 = 0; // overSize * 2;

                ctx.globalAlpha = s.opacity;
                if (!s.shouldHighlight) {
                    ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - overSize, y - overSize, w + overSize2, h + overSize2);
                } else {
                    ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
                }
                ctx.globalAlpha = 1;
            }

            ctx.restore();
        }

        // Draw Highlight above others
        cvs = this.highlightBuffer.canvas;
        ctx = this.highlightBuffer.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        for (let i = 0; i < dirty.length; i++) {
            let d = dirty[i];
            ctx.save();
            ctx.beginPath();
            ctx.rect(d.xMinClip, d.yMinClip, d.xMaxClip - d.xMinClip, d.yMaxClip - d.yMinClip);
            ctx.clip();

            for (let j = 0; j < d.overlap.length; j++) {
                let s = d.overlap[j];
                let x = (s.x - xLeft) * xScale;
                let y = (s.y - yTop) * yScale;
                let w = s.sprite.width * xScale;
                let h = s.sprite.height * yScale;

                // Round to Pixel
                if (roundToPixels) {
                    x = Math.round(x);
                    y = Math.round(y);
                    w = Math.round(w);
                    h = Math.round(h);
                }

                if (s.shouldBringToFront) {
                    ctx.globalAlpha = s.opacity;
                    ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
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
        for (let i = 0; i < dirty.length; i++) {
            let d = dirty[i];
            let s = d.sprite;
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
    }

    // drawLine(x1: number, y1: number, x2: number, y2: number, viewPort: ViewPort) {
    //     let cvs = this.canvas;
    //     let ctx = this.context;
    //     let xScale = cvs.width / (viewPort.xRight - viewPort.xLeft);
    //     let yScale = cvs.height / (viewPort.yBottom - viewPort.yTop);


    //     ctx.strokeStyle = '#333333';
    //     ctx.beginPath();
    //     ctx.moveTo(x1 * xScale, y1 * yScale);
    //     ctx.lineTo(x2 * xScale, y2 * yScale);
    //     ctx.stroke();
    // }
}