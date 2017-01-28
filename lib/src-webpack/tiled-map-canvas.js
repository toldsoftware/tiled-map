"use strict";
var tslib_1 = require("tslib");
var tiled_map_1 = require("../src/tiled-map");
var kenney_xml_loader_1 = require("../src/sprite-sheet/kenney-xml-loader");
var canvas_renderer_1 = require("../src/renderer/canvas-renderer");
var loader_1 = require("../src/loader");
// TODO: Load a test map
function load_async() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var map, viewPort, r;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loader_1.createMapWithSpriteSheetSamples('./kenney-isometric/landscapeTiles_sheet.png', './kenney-isometric/landscapeTiles_sheet.xml', new kenney_xml_loader_1.KenneyXmlLoader(), tiled_map_1.MapShape.Isometric, 132, 66)];
                case 1:
                    map = _a.sent();
                    viewPort = new tiled_map_1.ViewPort();
                    viewPort.xRight = 800;
                    viewPort.yBottom = 600;
                    r = new canvas_renderer_1.CanvasRenderer(document.body);
                    r.draw(map, viewPort);
                    return [2 /*return*/];
            }
        });
    });
}
function load() { load_async().then(); }
exports.load = load;
//# sourceMappingURL=tiled-map-canvas.js.map