import { Renderer } from './renderer';
import { UserInput, UserInputType } from '../user-input/user-input';
import { SpriteInstance, ViewPort } from '../tiled-map';
import { getImageEffect, ImageEffectKind } from './canvas-image-effect';

export class CanvasRenderer extends Renderer {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    onInput: (input: UserInput) => void;
    isInputDown = false;

    lastViewPort: ViewPort;

    constructor(host: HTMLElement) {
        super();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        host.appendChild(this.canvas);
        // this.canvas.style.width = '100%';
        // this.canvas.style.height = '100%';
        this.canvas.width = host.clientWidth;
        this.canvas.height = host.clientHeight;

        this.canvas.addEventListener('mousedown', (e) => this.getInput(e, UserInputType.Start));
        this.canvas.addEventListener('touchstart', (e) => this.getInput(e, UserInputType.Start));
        window.addEventListener('mousemove', (e) => this.getInput(e, UserInputType.Move));
        window.addEventListener('touchmove', (e) => this.getInput(e, UserInputType.Move));
        window.addEventListener('mouseup', (e) => this.getInput(e, UserInputType.End));
        window.addEventListener('touchend', (e) => this.getInput(e, UserInputType.End));
    }

    getInput(e: any, type: UserInputType): UserInput {
        if (this.lastViewPort == null || this.onInput == null) { return; }
        // console.log('CanvasRenderer.getInput', e, this.onInput, this.lastViewPort);

        let xCanvas = 0;
        let yCanvas = 0;

        let rect = this.canvas.getBoundingClientRect();

        if (e.clientX != null) {
            xCanvas = e.clientX - rect.left;
            yCanvas = e.clientY - rect.top;
        } else if (e.touches != null) {
            xCanvas = e.touches[0].clientX - rect.left;
            yCanvas = e.touches[0].clientY - rect.top;

            // if (e.touches[1]) {
            //     if (DEBUG_MOUSE) { console.log('2 FINGER'); }

            //     xm2 = e.touches[1].clientX - rect.left;
            //     ym2 = e.touches[1].clientY - rect.top;
            // }
        }

        // Scale for viewPort
        let x = this.lastViewPort.xLeft + (xCanvas / this.canvas.width) * (this.lastViewPort.xRight - this.lastViewPort.xLeft);
        let y = this.lastViewPort.yTop + (yCanvas / this.canvas.height) * (this.lastViewPort.yBottom - this.lastViewPort.yTop);

        if (type === UserInputType.Move && this.isInputDown) {
            type = UserInputType.Drag;
        }

        this.onInput({ x, y, type });

        if (type === UserInputType.Start) {
            this.isInputDown = true;
        } else if (type === UserInputType.End) {
            this.isInputDown = false;
        }
    }

    drawItems(sprites: SpriteInstance[], viewPort: ViewPort) {
        this.lastViewPort = viewPort;

        // Draw on the canvas context
        let cvs = this.canvas;
        let ctx = this.context;
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        let xScale = cvs.width / (viewPort.xRight - viewPort.xLeft);
        let yScale = cvs.height / (viewPort.yBottom - viewPort.yTop);

        for (let i = 0; i < sprites.length; i++) {
            let s = sprites[i];
            let x = (s.x - viewPort.xLeft) * xScale;
            let y = (s.y - viewPort.yTop) * yScale;
            let w = s.sprite.width * xScale;
            let h = s.sprite.height * yScale;

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
                ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
            } else {
                // if (s.shouldHighlight) {
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.RgbRotate2), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
                ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
            }
            ctx.globalAlpha = 1;
        }

        // // Draw Highlight above others
        // for (let i = 0; i < sprites.length; i++) {
        //     let s = sprites[i];
        //     let x = (s.x - viewPort.xLeft) * xScale;
        //     let y = (s.y - viewPort.yTop) * yScale;
        //     let w = s.sprite.width * xScale;
        //     let h = s.sprite.height * yScale;

        //     if (s.shouldHighlight) {
        //         // ctx.globalAlpha = 0.25;
        //         // ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x + 2, y, w, h);
        //         // ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y, w, h);
        //         // ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y + 2, w, h);
        //         // ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y - 2, w, h);
        //         // ctx.globalAlpha = 1;

        //         ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
        //     }
        // }
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