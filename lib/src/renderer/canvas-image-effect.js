"use strict";
var tslib_1 = require("tslib");
var DEBUG = false;
var ImageEffectKind;
(function (ImageEffectKind) {
    ImageEffectKind[ImageEffectKind["Light"] = 0] = "Light";
    ImageEffectKind[ImageEffectKind["Dark"] = 1] = "Dark";
    ImageEffectKind[ImageEffectKind["RgbRotate"] = 2] = "RgbRotate";
    ImageEffectKind[ImageEffectKind["RgbRotate2"] = 3] = "RgbRotate2";
})(ImageEffectKind = exports.ImageEffectKind || (exports.ImageEffectKind = {}));
function getImageEffect(spriteSheet, kind) {
    var _this = this;
    if (spriteSheet.image == null || spriteSheet.image.width <= 0) {
        return null;
    }
    spriteSheet.imageEffects = spriteSheet.imageEffects || [];
    var resultImage = spriteSheet.imageEffects[kind];
    if (resultImage == null) {
        // Placeholder
        spriteSheet.imageEffects[kind] = 0;
        setTimeout(function () {
            (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log('Create Image Effect START kind=', kind);
                            _a = kind;
                            switch (_a) {
                                case ImageEffectKind.Dark: return [3 /*break*/, 1];
                                case ImageEffectKind.RgbRotate: return [3 /*break*/, 3];
                                case ImageEffectKind.RgbRotate2: return [3 /*break*/, 5];
                                case ImageEffectKind.Light: return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, createImageEffect_dark(spriteSheet.image)];
                        case 2:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 3: return [4 /*yield*/, createImageEffect_rgbRotate(spriteSheet.image)];
                        case 4:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 5: return [4 /*yield*/, createImageEffect_rgbRotate2(spriteSheet.image)];
                        case 6:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, createImageEffect_light(spriteSheet.image)];
                        case 8:
                            resultImage = _b.sent();
                            return [3 /*break*/, 9];
                        case 9:
                            spriteSheet.imageEffects[kind] = resultImage;
                            console.log('Create Image Effect END kind=', kind);
                            return [2 /*return*/];
                    }
                });
            }); })().then();
        });
    }
    return resultImage || spriteSheet.image;
}
exports.getImageEffect = getImageEffect;
var CHUNK_SIZE = 100 * 1000;
var pauseCount = 0;
function pause() {
    var p = pauseCount++;
    // console.log('pause SETUP', p);
    return new Promise(function (resolve) {
        // console.log('pause START', p);
        setTimeout(function () {
            resolve();
            // console.log('pause END', p);
        });
    });
}
exports.pause = pause;
function createImageEffect_dark(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            data[i + 0] = r * 0.7;
                            data[i + 1] = g * 0.7;
                            data[i + 2] = b * 0.8;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_dark = createImageEffect_dark;
function createImageEffect_light(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            // data[i + 0] = r * 0.6 + 225 * 0.4;
                            // data[i + 1] = g * 0.6 + 225 * 0.4;
                            // data[i + 2] = b * 0.4 + 225 * 0.6;
                            data[i + 0] = r * 0.7 + 225 * 0.3;
                            data[i + 1] = g * 0.7 + 225 * 0.3;
                            data[i + 2] = b * 0.6 + 225 * 0.4;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_light = createImageEffect_light;
function createImageEffect_rgbRotate(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            data[i + 0] = g;
                            data[i + 1] = b;
                            data[i + 2] = r;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_rgbRotate = createImageEffect_rgbRotate;
function createImageEffect_rgbRotate2(image) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, ctx, imageData, data, iMain, i, r, g, b, a;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    if (DEBUG) {
                        document.body.appendChild(cvs);
                    }
                    ctx = cvs.getContext('2d');
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    data = imageData.data;
                    iMain = 0;
                    _a.label = 1;
                case 1:
                    if (!(iMain < data.length)) return [3 /*break*/, 4];
                    for (i = iMain; i < iMain + CHUNK_SIZE && i < data.length; i += 4) {
                        r = data[i + 0];
                        g = data[i + 1];
                        b = data[i + 2];
                        a = data[i + 3];
                        if (a > 0) {
                            data[i + 0] = b;
                            data[i + 1] = r;
                            data[i + 2] = g;
                        }
                    }
                    return [4 /*yield*/, pause()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    iMain += CHUNK_SIZE;
                    return [3 /*break*/, 1];
                case 4:
                    ctx.putImageData(imageData, 0, 0);
                    return [2 /*return*/, cvs];
            }
        });
    });
}
exports.createImageEffect_rgbRotate2 = createImageEffect_rgbRotate2;
//# sourceMappingURL=canvas-image-effect.js.map