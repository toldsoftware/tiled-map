import { Renderer } from './renderer';
import { UserInput, UserInputType } from '../user-input/user-input';
import { SpriteInstance, ViewPort } from '../tiled-map';
export declare class CanvasRenderer extends Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    onInput: (input: UserInput) => void;
    isInputDown: boolean;
    inputDownStart: number;
    lastViewPort: ViewPort;
    lastViewPortValues: ViewPort;
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
    constructor(host: HTMLElement);
    getInput(e: Event, type: UserInputType): false;
    clear(): void;
    drawItems(sprites: SpriteInstance[], viewPort: ViewPort): void;
}
