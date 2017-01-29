import { Renderer } from './renderer';
import { UserInput, UserInputType } from '../user-input/user-input';
import { SpriteInstance, ViewPort } from '../tiled-map';
import { getImageEffect, ImageEffectKind } from './canvas-image-effect';

const DEBUG = true;

export class CanvasRenderer extends Renderer {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    onInput: (input: UserInput) => void;
    isInputDown = false;
    inputDownStart: number;

    lastViewPort: ViewPort;

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
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        host.appendChild(this.canvas);

        let resize = () => {
            this.width = this.canvas.width = host.clientWidth;
            this.height = this.canvas.height = host.clientHeight;
            if (this.onResize) { this.onResize(); }
        };

        resize();
        host.addEventListener('resize', () => resize());
        window.addEventListener('resize', () => resize());

        this.canvas.addEventListener('mousedown', (e) => this.getInput(e, UserInputType.Start));
        this.canvas.addEventListener('touchstart', (e) => this.getInput(e, UserInputType.Start));
        window.addEventListener('mousemove', (e) => this.getInput(e, UserInputType.Move));
        window.addEventListener('touchmove', (e) => this.getInput(e, UserInputType.Move));
        window.addEventListener('mouseup', (e) => this.getInput(e, UserInputType.End));
        window.addEventListener('touchend', (e) => this.getInput(e, UserInputType.End));

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

    getInput(e: Event, type: UserInputType): false {
        if (this.lastViewPort == null || this.onInput == null) { return; }
        // console.log('CanvasRenderer.getInput', e, this.onInput, this.lastViewPort);

        let origType = type;

        let xCanvas = this.xCanvasLast;
        let yCanvas = this.yCanvasLast;

        let rect = this.canvas.getBoundingClientRect();

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
        let u = (xCanvas / this.canvas.width);
        let v = (yCanvas / this.canvas.height);
        let x = this.lastViewPort.xLeft + u * (this.lastViewPort.xRight - this.lastViewPort.xLeft);
        let y = this.lastViewPort.yTop + v * (this.lastViewPort.yBottom - this.lastViewPort.yTop);

        let u2 = (x2Canvas / this.canvas.width);
        let v2 = (y2Canvas / this.canvas.height);
        let x2 = this.lastViewPort.xLeft + u2 * (this.lastViewPort.xRight - this.lastViewPort.xLeft);
        let y2 = this.lastViewPort.yTop + v2 * (this.lastViewPort.yBottom - this.lastViewPort.yTop);

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

        this.onInput({ x, y, type, duration, u, v, isMultiple, inputCount, u2, v2, x2, y2 });

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

    drawItems(sprites: SpriteInstance[], viewPort: ViewPort) {
        this.lastViewPort = viewPort;

        const OVER_SIZE = 4;
        const OVER_SIZE2 = 8;

        // Draw on the canvas context
        let cvs = this.canvas;
        let ctx = this.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);

// // TEST - Clip Half
//         ctx.beginPath();
//         ctx.moveTo(0, 0);
//         ctx.lineTo(cvs.width * 0.5, 0);
//         ctx.lineTo(cvs.width * 0.5, cvs.height);
//         ctx.lineTo(0, cvs.height);
//         ctx.lineTo(0, 0);
//         ctx.clip();

        let xScale = cvs.width / (viewPort.xRight - viewPort.xLeft);
        let yScale = cvs.height / (viewPort.yBottom - viewPort.yTop);

        // TODO: Is blocking highlight
        // let hasHighlight = sprites.some(s => s.shouldHighlight);
        // let zMaxHighlight = sprites.filter(s => s.shouldHighlight).reduce((out, s) => out > s.zIndex ? out : s.zIndex, -100000);
        // let zMinHighlight = sprites.filter(s => s.shouldHighlight).reduce((out, s) => out < s.zIndex ? out : s.zIndex, 100000);
        // console.log(hasHighlight, zMaxHighlight, zMinHighlight);

        for (let i = 0; i < sprites.length; i++) {
            let s = sprites[i];
            let x = (s.x - viewPort.xLeft) * xScale;
            let y = (s.y - viewPort.yTop) * yScale;
            let w = s.sprite.width * xScale;
            let h = s.sprite.height * yScale;

            let overSize = 0; // s.zIndex > zMinHighlight ? -16 : 0;
            let overSize2 = 0; // overSize * 2;

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
            } else {
                // if (s.shouldHighlight) {
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.RgbRotate2), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
                ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
            }
            ctx.globalAlpha = 1;
        }

        // Draw Highlight above others
        for (let i = 0; i < sprites.length; i++) {
            let s = sprites[i];
            let x = (s.x - viewPort.xLeft) * xScale;
            let y = (s.y - viewPort.yTop) * yScale;
            let w = s.sprite.width * xScale;
            let h = s.sprite.height * yScale;

            if (s.shouldBringToFront) {
                ctx.globalAlpha = 0.25 * s.opacity;
                ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - OVER_SIZE, y - OVER_SIZE, w + OVER_SIZE2, h + OVER_SIZE2);
                ctx.globalAlpha = 1;
            }
        }
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, viewPort: ViewPort) {
        let cvs = this.canvas;
        let ctx = this.context;
        let xScale = cvs.width / (viewPort.xRight - viewPort.xLeft);
        let yScale = cvs.height / (viewPort.yBottom - viewPort.yTop);


        ctx.strokeStyle = '#333333';
        ctx.beginPath();
        ctx.moveTo(x1 * xScale, y1 * yScale);
        ctx.lineTo(x2 * xScale, y2 * yScale);
        ctx.stroke();
    }
}