"use strict";
var tslib_1 = require("tslib");
var tiled_map_1 = require("../src/tiled-map");
var kenney_xml_loader_1 = require("../src/sprite-sheet/kenney-xml-loader");
var canvas_renderer_1 = require("../src/renderer/canvas-renderer");
var loader_1 = require("../src/loader");
var user_input_1 = require("../src/user-input/user-input");
// BUG: This is not working automatically 
// (it's loading a duplicate of the module and defeating the singleton)
var src_1 = require("@told/platform/lib/src");
src_1.setupBrowser();
// Platform.urlResolver = resolveUrlClient;
function load_async() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var map, spriteSheet, r, viewPort, toolPanelViewPort, tileHighlighter, tileMover, tileCloner, viewportMover, viewportScroller, viewportResizer, viewportMultiTouchScroller, toolPanelViewportResizer, mode, animate;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('load_async START');
                    return [4 /*yield*/, loader_1.createMapWithSpriteSheetSamples('./kenney-isometric/landscapeTiles_sheet.png', './kenney-isometric/landscapeTiles_sheet.xml', 
                        // './kenney-isometric/cityTiles_sheet.png',
                        // './kenney-isometric/cityTiles_sheet.xml',
                        // './kenney-isometric/buildingTiles_sheet.png',
                        // './kenney-isometric/buildingTiles_sheet.xml',
                        // 67,
                        83, new kenney_xml_loader_1.KenneyXmlLoader(), tiled_map_1.MapShape.Isometric, 128 + 4, 64 + 2)];
                case 1:
                    map = _a.sent();
                    return [4 /*yield*/, loader_1.loadSpriteSheet('./kenney-isometric/landscapeTiles_sheet.png', './kenney-isometric/landscapeTiles_sheet.xml', map.defaultSprite, new kenney_xml_loader_1.KenneyXmlLoader(), tiled_map_1.MapShape.Isometric, 128 + 4, 64 + 2, './saves/landscape_layout.json')];
                case 2:
                    spriteSheet = _a.sent();
                    map = spriteSheet.layoutMap;
                    r = new canvas_renderer_1.CanvasRenderer(document.getElementById('host'));
                    viewPort = new tiled_map_1.ViewPort();
                    viewPort.xLeft = -1600;
                    viewPort.xRight = 1600;
                    viewPort.yTop = -900;
                    viewPort.yBottom = 900;
                    viewPort.clip_uLeft = 0;
                    viewPort.clip_uRight = 1;
                    viewPort.clip_vTop = 0;
                    // viewPort.clip_vBottom = 0.5;
                    // viewPort.clip_vBottom = 0.9;
                    viewPort.clip_vBottom = 1;
                    toolPanelViewPort = new tiled_map_1.ViewPort();
                    toolPanelViewPort.xLeft = -1600;
                    toolPanelViewPort.xRight = 1600;
                    toolPanelViewPort.yTop = -900;
                    toolPanelViewPort.yBottom = 900;
                    toolPanelViewPort.clip_uLeft = 0;
                    toolPanelViewPort.clip_uRight = 1;
                    toolPanelViewPort.clip_vTop = 0.5;
                    toolPanelViewPort.clip_vBottom = 1;
                    tileHighlighter = new user_input_1.TileHighlighter(map);
                    tileMover = new user_input_1.TileMover(map, false);
                    tileCloner = new user_input_1.TileMover(map, true);
                    viewportMover = new user_input_1.ViewportMover(map, viewPort);
                    viewportScroller = new user_input_1.ViewportScroller(map, viewPort);
                    viewportResizer = new user_input_1.ViewportResizer(viewPort, r);
                    viewportMultiTouchScroller = new user_input_1.ViewportMultiTouchScroller(map, viewPort, viewportResizer);
                    toolPanelViewportResizer = new user_input_1.ViewportResizer(toolPanelViewPort, r);
                    // Handle resize
                    r.onResize = function () {
                        viewportResizer.resize();
                        toolPanelViewportResizer.resize();
                    };
                    setTimeout(function () {
                        viewportResizer.resize();
                        toolPanelViewportResizer.resize();
                    });
                    r.onZoom = function (scaleRatio) {
                        viewportResizer.resize(scaleRatio);
                        toolPanelViewportResizer.resize(scaleRatio);
                    };
                    mode = 0;
                    r.onInput = function (input) {
                        // if (input.isMultiple) {
                        //     return;
                        // }
                        if (input.isMultiple) {
                            // console.log('Input Multiple type=', input.type, input);
                            if (input.type === user_input_1.UserInputType.ChangeToMultipleStart) {
                                // Cancel any actions started
                                viewportScroller.cancel();
                                viewportMover.cancel();
                                tileHighlighter.cancel();
                                tileMover.cancel();
                                tileCloner.cancel();
                            }
                            viewportMultiTouchScroller.handleInput(input);
                            return;
                        }
                        // console.log('Input Single', input.type, input);
                        viewportMover.handleInput(input);
                        if (viewportMover.isDragging) {
                            tileHighlighter.cancel();
                            viewportScroller.cancel();
                            tileMover.cancel();
                            tileCloner.cancel();
                            return;
                        }
                        tileHighlighter.handleInput(input);
                        if (!(input.u < 0.2 && input.v > 0.8)) {
                            viewportScroller.handleInput(input);
                        }
                        else {
                            viewportScroller.cancel();
                        }
                        if (input.type === user_input_1.UserInputType.End
                            && input.duration < 1000
                            && input.u < 0.2 && input.v > 0.8) {
                            mode++;
                        }
                        if (input.type === user_input_1.UserInputType.End
                            && input.duration < 1000
                            && input.u > 0.8 && input.v < 0.2) {
                            save(map);
                        }
                        switch (mode % 2) {
                            case 0:
                                tileMover.handleInput(input);
                                break;
                            case 1:
                                tileCloner.handleInput(input);
                                break;
                        }
                    };
                    animate = function () {
                        // r.clear();
                        r.draw(map, viewPort);
                        // r.draw(map, toolPanelViewPort);
                        requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    console.log('load_async END');
                    return [2 /*return*/];
            }
        });
    });
}
function save(map) {
    var data = {
        tiles: []
    };
    for (var i = 0; i < map.tiles.length; i++) {
        var column = map.tiles[i];
        for (var j = 0; j < column.length; j++) {
            var tile = column[j];
            for (var k = 0; k < tile.stack.length; k++) {
                if (k > 0) {
                    var tileItem = tile.stack[k];
                    var sprite = tileItem.sprite;
                    data.tiles.push({
                        i: i, j: j, k: k,
                        type: {
                            sheetUrl: sprite.spriteSheet.url,
                            x: sprite.xSheet,
                            y: sprite.ySheet
                        }
                    });
                }
            }
        }
    }
    console.log(data);
    console.log(JSON.stringify(data));
}
function setup() {
    load_async().then().catch(function (err) { return console.error(err); });
}
exports.setup = setup;
setup();
//# sourceMappingURL=tiled-map-canvas.js.map