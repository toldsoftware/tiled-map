import { Renderer } from './renderer';
import { SpriteInstance, ViewPort } from '../tiled-map';

export class CanvasRenderer extends Renderer {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(host: HTMLElement) {
        super();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        host.appendChild(this.canvas);
        // this.canvas.style.width = '100%';
        // this.canvas.style.height = '100%';
        this.canvas.width = host.clientWidth;
        this.canvas.height = host.clientHeight;
    }

    drawItems(sprites: SpriteInstance[], viewPort: ViewPort) {
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

            ctx.drawImage(s.sprite.spriteSheet.image, s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
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