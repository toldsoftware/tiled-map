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
            (async () => {
                console.log('Create Image Effect START kind=', kind);
                switch (kind) {
                    case ImageEffectKind.Dark:
                        resultImage = await createImageEffect_dark(spriteSheet.image);
                        break;
                    case ImageEffectKind.RgbRotate:
                        resultImage = await createImageEffect_rgbRotate(spriteSheet.image);
                        break;
                    case ImageEffectKind.RgbRotate2:
                        resultImage = await createImageEffect_rgbRotate2(spriteSheet.image);
                        break;
                    case ImageEffectKind.Light:
                    default:
                        resultImage = await createImageEffect_light(spriteSheet.image);
                        break;
                }
                spriteSheet.imageEffects[kind] = resultImage;
                console.log('Create Image Effect END kind=', kind);
            })().then();
        });
    }

    return resultImage || spriteSheet.image;
}

const CHUNK_SIZE = 100 * 1000;
let pauseCount = 0;
export function pause() {
    let p = pauseCount++;
    // console.log('pause SETUP', p);
    return new Promise(resolve => {
        // console.log('pause START', p);
        setTimeout(() => {
            resolve();
            // console.log('pause END', p);
        });
    });
}

export async function createImageEffect_dark(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let iMain = 0; iMain < data.length; iMain += CHUNK_SIZE) {
        for (let i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
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

        await pause();
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}

export async function createImageEffect_light(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let iMain = 0; iMain < data.length; iMain += CHUNK_SIZE) {
        for (let i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
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

        await pause();
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}


export async function createImageEffect_rgbRotate(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let iMain = 0; iMain < data.length; iMain += CHUNK_SIZE) {
        for (let i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
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

        await pause();
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}

export async function createImageEffect_rgbRotate2(image: HTMLImageElement | HTMLCanvasElement) {
    let cvs = document.createElement('canvas');
    cvs.width = image.width;
    cvs.height = image.height;
    if (DEBUG) { document.body.appendChild(cvs); }

    let ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    let data = imageData.data;

    for (let iMain = 0; iMain < data.length; iMain += CHUNK_SIZE) {
        for (let i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
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

        await pause();
    }

    ctx.putImageData(imageData, 0, 0);

    return cvs;
}