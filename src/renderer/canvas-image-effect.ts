import { SpriteSheet } from '../tiled-map';

const DEBUG = false;

export enum ImageEffectKind {
    Light,
    Dark,
    RgbRotate,
    RgbRotate2,
}

export function getImageEffect(spriteSheet: SpriteSheet, kind: ImageEffectKind) {
    if (spriteSheet.image == null || spriteSheet.image.width <= 0) { return null; }

    spriteSheet.imageEffects = spriteSheet.imageEffects || [];
    let resultImage = spriteSheet.imageEffects[kind];

    if (resultImage == null) {
        // Placeholder
        spriteSheet.imageEffects[kind] = 0;
        setTimeout(() => {
            console.log('Create Image Effect START kind=', kind);
            switch (kind) {
                case ImageEffectKind.Dark:
                    resultImage = createImageEffect_dark(spriteSheet.image);
                    break;
                case ImageEffectKind.RgbRotate:
                    resultImage = createImageEffect_rgbRotate(spriteSheet.image);
                    break;
                case ImageEffectKind.RgbRotate2:
                    resultImage = createImageEffect_rgbRotate2(spriteSheet.image);
                    break;
                case ImageEffectKind.Light:
                default:
                    resultImage = createImageEffect_light(spriteSheet.image);
                    break;
            }
            spriteSheet.imageEffects[kind] = resultImage;
            console.log('Create Image Effect END kind=', kind);
        });
    }

    return resultImage || spriteSheet.image;
}


export function createImageEffect_dark(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i + 0];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        if (a > 0) {
            data[i + 0] = r * 0.7;
            data[i + 1] = g * 0.7;
            data[i + 2] = b * 0.8;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}

export function createImageEffect_light(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i + 0];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        if (a > 0) {
            data[i + 0] = r * 0.6 + 225 * 0.4;
            data[i + 1] = g * 0.6 + 225 * 0.4;
            data[i + 2] = b * 0.4 + 225 * 0.6;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}


export function createImageEffect_rgbRotate(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i + 0];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        if (a > 0) {
            data[i + 0] = g;
            data[i + 1] = b;
            data[i + 2] = r;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}

export function createImageEffect_rgbRotate2(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i + 0];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        if (a > 0) {
            data[i + 0] = b;
            data[i + 1] = r;
            data[i + 2] = g;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}