import { Renderer } from './renderer';
import { UserInput, UserInputType } from '../user-input/user-input';
import { SpriteInstance, ViewPort } from '../tiled-map';
export declare class CanvasRenderer extends Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    onInput: (input: UserInput) => void;
    isInputDown: boolean;
    lastViewPort: ViewPort;
    constructor(host: HTMLElement);
    getInput(e: any, type: UserInputType): UserInput;
    drawItems(sprites: SpriteInstance[], viewPort: ViewPort): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, viewPort: ViewPort): void;
}
