import { Renderer } from './renderer';
import { UserInput, UserInputType } from '../user-input/user-input';
import { SpriteInstance, ViewPort } from '../tiled-map';
export interface CanvasBuffer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}
export declare class CanvasRenderer extends Renderer {
    finalBuffer: CanvasBuffer;
    mainBuffer: CanvasBuffer;
    highlightBuffer: CanvasBuffer;
    onInput: (input: UserInput) => void;
    isInputDown: boolean;
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
    constructor(host: HTMLElement);
    getInput(e: Event, type: UserInputType, isTouch?: boolean): false;
    clear(): void;
    drawItems(sprites: SpriteInstance[], viewport: ViewPort, tileWidth: number, tileHeight: number): void;
}
