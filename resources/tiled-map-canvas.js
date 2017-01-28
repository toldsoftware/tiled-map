/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tslib_1 = __webpack_require__(1);
	var tiled_map_1 = __webpack_require__(2);
	var kenney_xml_loader_1 = __webpack_require__(3);
	var canvas_renderer_1 = __webpack_require__(6);
	var loader_1 = __webpack_require__(8);
	var user_input_1 = __webpack_require__(16);
	// TODO: Load a test map
	function load_async() {
	    return tslib_1.__awaiter(this, void 0, void 0, function () {
	        var map, viewPort, r, tileHighlighter, tileMover;
	        return tslib_1.__generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    console.log('load_async START');
	                    return [4 /*yield*/, loader_1.createMapWithSpriteSheetSamples('./kenney-isometric/landscapeTiles_sheet.png', './kenney-isometric/landscapeTiles_sheet.xml', 
	                        // './kenney-isometric/cityTiles_sheet.png',
	                        // './kenney-isometric/cityTiles_sheet.xml',
	                        // './kenney-isometric/buildingTiles_sheet.png',
	                        // './kenney-isometric/buildingTiles_sheet.xml',
	                        67, new kenney_xml_loader_1.KenneyXmlLoader(), tiled_map_1.MapShape.Isometric, 128 + 4, 64 + 2)];
	                case 1:
	                    map = _a.sent();
	                    viewPort = new tiled_map_1.ViewPort();
	                    viewPort.xLeft = -100;
	                    viewPort.yTop = -600;
	                    viewPort.xRight = 1600;
	                    viewPort.yBottom = 600;
	                    r = new canvas_renderer_1.CanvasRenderer(document.getElementById('host'));
	                    tileHighlighter = new user_input_1.TileHighlighter(map);
	                    tileMover = new user_input_1.TileMover(map);
	                    r.onInput = function (input) {
	                        tileHighlighter.handleInput(input);
	                        tileMover.handleInput(input);
	                        r.draw(map, viewPort);
	                    };
	                    setTimeout(function () {
	                        r.draw(map, viewPort);
	                    }, 250);
	                    console.log('load_async END');
	                    return [2 /*return*/];
	            }
	        });
	    });
	}
	function load() { load_async().then(); }
	exports.load = load;
	load();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global global, define, System, Reflect, Promise */
	var __extends;
	var __assign;
	var __rest;
	var __decorate;
	var __param;
	var __metadata;
	var __awaiter;
	var __generator;
	(function (factory) {
	    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports) { factory(createExporter(root, createExporter(exports))); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === "object" && typeof module.exports === "object") {
	        factory(createExporter(root, createExporter(module.exports)));
	    }
	    else {
	        factory(createExporter(root));
	    }
	    function createExporter(exports, previous) {
	        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
	    }
	})
	(function (exporter) {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	
	    __extends = function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	
	    __assign = Object.assign || function (t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	
	    __rest = function (s, e) {
	        var t = {};
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	            t[p] = s[p];
	        if (s != null && typeof Object.getOwnPropertySymbols === "function")
	            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
	                t[p[i]] = s[p[i]];
	        return t;
	    };
	
	    __decorate = function (decorators, target, key, desc) {
	        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	        return c > 3 && r && Object.defineProperty(target, key, r), r;
	    };
	
	    __param = function (paramIndex, decorator) {
	        return function (target, key) { decorator(target, key, paramIndex); }
	    };
	
	    __metadata = function (metadataKey, metadataValue) {
	        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	    };
	
	    __awaiter = function (thisArg, _arguments, P, generator) {
	        return new (P || (P = Promise))(function (resolve, reject) {
	            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	            step((generator = generator.apply(thisArg, _arguments || [])).next());
	        });
	    };
	
	    __generator = function (thisArg, body) {
	        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
	        return { next: verb(0), "throw": verb(1), "return": verb(2) };
	        function verb(n) { return function (v) { return step([n, v]); }; }
	        function step(op) {
	            if (f) throw new TypeError("Generator is already executing.");
	            while (_) try {
	                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	                if (y = 0, t) op = [0, t.value];
	                switch (op[0]) {
	                    case 0: case 1: t = op; break;
	                    case 4: _.label++; return { value: op[1], done: false };
	                    case 5: _.label++; y = op[1]; op = [0]; continue;
	                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                    default:
	                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                        if (t[2]) _.ops.pop();
	                        _.trys.pop(); continue;
	                }
	                op = body.call(thisArg, _);
	            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	        }
	    };
	
	    exporter("__extends", __extends);
	    exporter("__assign", __assign);
	    exporter("__rest", __rest);
	    exporter("__decorate", __decorate);
	    exporter("__param", __param);
	    exporter("__metadata", __metadata);
	    exporter("__awaiter", __awaiter);
	    exporter("__generator", __generator);
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var ViewPort = (function () {
	    function ViewPort() {
	    }
	    return ViewPort;
	}());
	exports.ViewPort = ViewPort;
	var Map = (function () {
	    function Map() {
	    }
	    return Map;
	}());
	exports.Map = Map;
	var MapShape;
	(function (MapShape) {
	    MapShape[MapShape["Rectangular"] = 0] = "Rectangular";
	    // Rows run from left to top
	    MapShape[MapShape["Isometric"] = 1] = "Isometric";
	})(MapShape = exports.MapShape || (exports.MapShape = {}));
	var Tile = (function () {
	    function Tile() {
	    }
	    return Tile;
	}());
	exports.Tile = Tile;
	var TileItem = (function () {
	    function TileItem() {
	    }
	    return TileItem;
	}());
	exports.TileItem = TileItem;
	var Sprite = (function () {
	    function Sprite() {
	    }
	    return Sprite;
	}());
	exports.Sprite = Sprite;
	var SpriteSheet = (function () {
	    function SpriteSheet() {
	    }
	    return SpriteSheet;
	}());
	exports.SpriteSheet = SpriteSheet;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tslib_1 = __webpack_require__(1);
	var xml2json_light_1 = __webpack_require__(4);
	var sprite_sheet_loader_1 = __webpack_require__(5);
	var KenneyXmlLoader = (function (_super) {
	    tslib_1.__extends(KenneyXmlLoader, _super);
	    function KenneyXmlLoader() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    KenneyXmlLoader.prototype.load = function (imageUrl, image, tileWidth, tileHeight, xmlText) {
	        var root = xml2json_light_1.xml2json(xmlText);
	        var obj = root.TextureAtlas;
	        var spriteSheet = {
	            url: imageUrl,
	            image: image,
	            sprites: []
	        };
	        spriteSheet.sprites = obj.SubTexture.map(function (t) {
	            // Conver to numbers
	            t.x = t.x * 1;
	            t.y = t.y * 1;
	            t.width = t.width * 1;
	            t.height = t.height * 1;
	            var yBottomCenter_fromTopLeft = t.height + (tileWidth - t.width) * 0.5 * (tileHeight / tileWidth);
	            var stackBottomKind = 'ground';
	            var stackTopKind = 'top';
	            var stackHeight = 32 + 2;
	            return {
	                spriteSheet: spriteSheet,
	                xSheet: t.x,
	                ySheet: t.y,
	                width: t.width,
	                height: t.height,
	                xBottomCenter_fromTopLeft: t.width * 0.5,
	                yBottomCenter_fromTopLeft: yBottomCenter_fromTopLeft,
	                stackHeight: stackHeight,
	                stackBottomKind: stackBottomKind,
	                stackTopKind: stackTopKind,
	            };
	        });
	        return spriteSheet;
	    };
	    return KenneyXmlLoader;
	}(sprite_sheet_loader_1.SpriteSheetLoader));
	exports.KenneyXmlLoader = KenneyXmlLoader;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    xml2json: xml2json
	};
	
	//***********************************************************************
	// Main function. Clears the given xml and then starts the recursion
	//***********************************************************************
	function xml2json(xmlStr){ 
	    xmlStr = cleanXML(xmlStr);
	    return xml2jsonRecurse(xmlStr,0); 
	}
	
	//***********************************************************************
	// Recursive function that creates a JSON object with a given XML string.
	//***********************************************************************
	function xml2jsonRecurse(xmlStr) {
	    var obj = {},
	        tagName, indexClosingTag, inner_substring, tempVal, openingTag;
	
	    while (xmlStr.match(/<[^\/][^>]*>/)) {
	        openingTag = xmlStr.match(/<[^\/][^>]*>/)[0];
	        tagName = openingTag.substring(1, openingTag.length - 1);
	        indexClosingTag = xmlStr.indexOf(openingTag.replace('<', '</'));
	
	        // account for case where additional information in the openning tag
	        if (indexClosingTag == -1) {
	
	            tagName = openingTag.match(/[^<][\w+$]*/)[0];
	            indexClosingTag = xmlStr.indexOf('</' + tagName);
	            if (indexClosingTag == -1) {
	                indexClosingTag = xmlStr.indexOf('<\\/' + tagName);
	            }
	        }
	        inner_substring = xmlStr.substring(openingTag.length, indexClosingTag);
	        if (inner_substring.match(/<[^\/][^>]*>/)) {
	            tempVal = xml2json(inner_substring);
	        }
	        else {
	            tempVal = inner_substring;
	        }
	        // account for array or obj //
	        if (obj[tagName] === undefined) {
	            obj[tagName] = tempVal;
	        }
	        else if (Array.isArray(obj[tagName])) {
	            obj[tagName].push(tempVal);
	        }
	        else {
	            obj[tagName] = [obj[tagName], tempVal];
	        }
	
	        xmlStr = xmlStr.substring(openingTag.length * 2 + 1 + inner_substring.length);
	    }
	
	    return obj;
	}
	
	//*****************************************************************
	// Removes some characters that would break the recursive function.
	//*****************************************************************
	function cleanXML(xmlStr) {
	    
	    xmlStr = xmlStr.replace( /<!--[\s\S]*?-->/g, '' ); //remove commented lines
	    xmlStr = xmlStr.replace(/\n|\t|\r/g, ''); //replace special characters
	    xmlStr = xmlStr.replace(/ {1,}<|\t{1,}</g, '<'); //replace leading spaces and tabs
	    xmlStr = xmlStr.replace(/> {1,}|>\t{1,}/g, '>'); //replace trailing spaces and tabs
	    xmlStr = xmlStr.replace(/<\?[^>]*\?>/g, ''); //delete docType tags
	
	    xmlStr = replaceSelfClosingTags(xmlStr); //replace self closing tags
	    xmlStr = replaceAloneValues(xmlStr); //replace the alone tags values
	    xmlStr = replaceAttributes(xmlStr); //replace attributes
	
	    return xmlStr;
	}
	
	//************************************************************************************************************
	// Replaces all the self closing tags with attributes with another tag containing its attribute as a property.
	// The function works if the tag contains multiple attributes. 
	//
	// Example : '<tagName attrName="attrValue" />' becomes 
	//           '<tagName><attrName>attrValue</attrName></tagName>'
	//************************************************************************************************************
	function replaceSelfClosingTags(xmlStr) {
	
	    var selfClosingTags = xmlStr.match(/<[^/][^>]*\/>/g);
	
	    if (selfClosingTags) {
	        for (var i = 0; i < selfClosingTags.length; i++) {
	
	            var oldTag = selfClosingTags[i];
	            var tempTag = oldTag.substring(0, oldTag.length - 2);
	            tempTag += ">";
	
	            var tagName = oldTag.match(/[^<][\w+$]*/)[0];
	            var closingTag = "</" + tagName + ">";
	            var newTag = "<" + tagName + ">";
	
	            var attrs = tempTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
	
	            if (attrs) {
	                for(var j = 0; j < attrs.length; j++) {
	                    var attr = attrs[j];
	                    var attrName = attr.substring(0, attr.indexOf('='));
	                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
	                    
	                    newTag += "<" + attrName + ">" + attrValue + "</" + attrName + ">";
	                }
	            }
	
	            newTag += closingTag;
	
	            xmlStr = xmlStr.replace(oldTag, newTag);
	        }
	    }
	
	    return xmlStr;
	}
	
	//*************************************************************************************************
	// Replaces all the tags with attributes and a value with a new tag.
	// 
	// Example : '<tagName attrName="attrValue">tagValue</tagName>' becomes 
	//           '<tagName><attrName>attrValue</attrName><_@attribute>tagValue</_@attribute></tagName>'
	//*************************************************************************************************
	function replaceAloneValues(xmlStr) {
	 
	    var tagsWithAttributesAndValue = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>{1}([^<]+)/g);
	    
	    if (tagsWithAttributesAndValue) {
	        for(var i = 0; i < tagsWithAttributesAndValue.length; i++) {
	
	            var oldTag = tagsWithAttributesAndValue[i];
	            var oldTagName = oldTag.substring(0, oldTag.indexOf(">") + 1);
	            var oldTagValue = oldTag.substring(oldTag.indexOf(">") + 1);
	            
	            var newTag = oldTagName + "<_@ttribute>" + oldTagValue + "</_@ttribute>";
	            
	            xmlStr = xmlStr.replace(oldTag, newTag);
	        }    
	    }
	    
	    return xmlStr;
	}
	
	//*****************************************************************************************************************
	// Replaces all the tags with attributes with another tag containing its attribute as a property.
	// The function works if the tag contains multiple attributes.
	//
	// Example : '<tagName attrName="attrValue"></tagName>' becomes '<tagName><attrName>attrValue</attrName></tagName>'
	//*****************************************************************************************************************
	function replaceAttributes(xmlStr) {
	
	    var tagsWithAttributes = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>/g);
	
	    if (tagsWithAttributes) {
	        for (var i = 0; i < tagsWithAttributes.length; i++) {
	           
	            var oldTag = tagsWithAttributes[i];
	            var tagName = oldTag.match(/[^<][\w+$]*/)[0];
	            var newTag = "<" + tagName + ">";
	            var attrs = oldTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
	
	            if (attrs) {
	                for(var j = 0; j < attrs.length; j++) {
	                    
	                    var attr = attrs[j];
	                    var attrName = attr.substring(0, attr.indexOf('='));
	                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
	                    
	                    newTag += "<" + attrName + ">" + attrValue + "</" + attrName + ">";
	                }
	            }
	
	            xmlStr = xmlStr.replace(oldTag, newTag);
	        }
	    }
	
	    return xmlStr;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var SpriteSheetLoader = (function () {
	    function SpriteSheetLoader() {
	    }
	    return SpriteSheetLoader;
	}());
	exports.SpriteSheetLoader = SpriteSheetLoader;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tslib_1 = __webpack_require__(1);
	var renderer_1 = __webpack_require__(7);
	var user_input_1 = __webpack_require__(16);
	var canvas_image_effect_1 = __webpack_require__(17);
	var CanvasRenderer = (function (_super) {
	    tslib_1.__extends(CanvasRenderer, _super);
	    function CanvasRenderer(host) {
	        var _this = _super.call(this) || this;
	        _this.isInputDown = false;
	        _this.canvas = document.createElement('canvas');
	        _this.context = _this.canvas.getContext('2d');
	        host.appendChild(_this.canvas);
	        // this.canvas.style.width = '100%';
	        // this.canvas.style.height = '100%';
	        _this.canvas.width = host.clientWidth;
	        _this.canvas.height = host.clientHeight;
	        _this.canvas.addEventListener('mousedown', function (e) { return _this.getInput(e, user_input_1.UserInputType.Start); });
	        _this.canvas.addEventListener('touchstart', function (e) { return _this.getInput(e, user_input_1.UserInputType.Start); });
	        window.addEventListener('mousemove', function (e) { return _this.getInput(e, user_input_1.UserInputType.Move); });
	        window.addEventListener('touchmove', function (e) { return _this.getInput(e, user_input_1.UserInputType.Move); });
	        window.addEventListener('mouseup', function (e) { return _this.getInput(e, user_input_1.UserInputType.End); });
	        window.addEventListener('touchend', function (e) { return _this.getInput(e, user_input_1.UserInputType.End); });
	        return _this;
	    }
	    CanvasRenderer.prototype.getInput = function (e, type) {
	        if (this.lastViewPort == null || this.onInput == null) {
	            return;
	        }
	        // console.log('CanvasRenderer.getInput', e, this.onInput, this.lastViewPort);
	        var xCanvas = 0;
	        var yCanvas = 0;
	        var rect = this.canvas.getBoundingClientRect();
	        if (e.clientX != null) {
	            xCanvas = e.clientX - rect.left;
	            yCanvas = e.clientY - rect.top;
	        }
	        else if (e.touches != null) {
	            xCanvas = e.touches[0].clientX - rect.left;
	            yCanvas = e.touches[0].clientY - rect.top;
	        }
	        // Scale for viewPort
	        var x = this.lastViewPort.xLeft + (xCanvas / this.canvas.width) * (this.lastViewPort.xRight - this.lastViewPort.xLeft);
	        var y = this.lastViewPort.yTop + (yCanvas / this.canvas.height) * (this.lastViewPort.yBottom - this.lastViewPort.yTop);
	        if (type === user_input_1.UserInputType.Move && this.isInputDown) {
	            type = user_input_1.UserInputType.Drag;
	        }
	        this.onInput({ x: x, y: y, type: type });
	        if (type === user_input_1.UserInputType.Start) {
	            this.isInputDown = true;
	        }
	        else if (type === user_input_1.UserInputType.End) {
	            this.isInputDown = false;
	        }
	    };
	    CanvasRenderer.prototype.drawItems = function (sprites, viewPort) {
	        this.lastViewPort = viewPort;
	        // Draw on the canvas context
	        var cvs = this.canvas;
	        var ctx = this.context;
	        ctx.clearRect(0, 0, cvs.width, cvs.height);
	        var xScale = cvs.width / (viewPort.xRight - viewPort.xLeft);
	        var yScale = cvs.height / (viewPort.yBottom - viewPort.yTop);
	        for (var i = 0; i < sprites.length; i++) {
	            var s = sprites[i];
	            var x = (s.x - viewPort.xLeft) * xScale;
	            var y = (s.y - viewPort.yTop) * yScale;
	            var w = s.sprite.width * xScale;
	            var h = s.sprite.height * yScale;
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
	            }
	            else {
	                // if (s.shouldHighlight) {
	                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x, y, w, h);
	                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.Light), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
	                // ctx.drawImage(getImageEffect(s.sprite.spriteSheet, ImageEffectKind.RgbRotate2), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
	                ctx.drawImage(canvas_image_effect_1.getImageEffect(s.sprite.spriteSheet, canvas_image_effect_1.ImageEffectKind.Dark), s.sprite.xSheet, s.sprite.ySheet, s.sprite.width, s.sprite.height, x - 2, y - 2, w + 4, h + 4);
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
	    };
	    CanvasRenderer.prototype.drawLine = function (x1, y1, x2, y2, viewPort) {
	        var cvs = this.canvas;
	        var ctx = this.context;
	        var xScale = cvs.width / (viewPort.xRight - viewPort.xLeft);
	        var yScale = cvs.height / (viewPort.yBottom - viewPort.yTop);
	        ctx.strokeStyle = '#333333';
	        ctx.beginPath();
	        ctx.moveTo(x1 * xScale, y1 * yScale);
	        ctx.lineTo(x2 * xScale, y2 * yScale);
	        ctx.stroke();
	    };
	    return CanvasRenderer;
	}(renderer_1.Renderer));
	exports.CanvasRenderer = CanvasRenderer;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var Renderer = (function () {
	    function Renderer() {
	    }
	    Renderer.prototype.draw = function (map, viewPort) {
	        // Filter the tiles that are in the viewPort
	        var visibleItems = [];
	        for (var iKey in map.tiles) {
	            var i = iKey * 1;
	            var column = map.tiles[i];
	            for (var jKey in column) {
	                var j = jKey * 1;
	                var tile = column[j];
	                var tileLeft = tile.x;
	                var tileRight = tile.x + map.tileWidth;
	                if (tileRight > viewPort.xLeft && tileLeft < viewPort.xRight) {
	                    for (var k = 0; k < tile.stack.length; k++) {
	                        var item = tile.stack[k];
	                        var itemTop = item.y;
	                        var itemBottom = item.y + item.sprite.height;
	                        if (itemBottom > viewPort.yTop && itemTop < viewPort.yBottom) {
	                            visibleItems.push(item);
	                        }
	                    }
	                }
	            }
	        }
	        // for (let j = -10; j < 10; j++) {
	        // }
	        visibleItems.sort(function (a, b) { return a.zIndex - b.zIndex; });
	        this.drawItems(visibleItems, viewPort);
	        // // DEBUG: Draw Grid
	        // for (let i = -100; i < 100; i++) {
	        //     let iSlope = map.shape === MapShape.Isometric ? 1 : 0;
	        //     let jSlope = iSlope;
	        //     // this.drawLine(i * map.tileWidth * 0.5 * iSlope * -10000, -10000 * map.tileHeight, i * map.tileWidth * 0.5 * iSlope * 10000, 10000 * map.tileHeight, viewPort);
	        //     this.drawLine(i * map.tileWidth * 0.5, -10000 * map.tileHeight * 0.5, i * map.tileWidth * 0.5, 10000 * map.tileHeight * 0.5, viewPort);
	        // }
	        // for (let j = -100; j < 100; j++) {
	        //     let iSlope = map.shape === MapShape.Isometric ? 1 : 0;
	        //     let jSlope = iSlope;
	        //     // this.drawLine(i * map.tileWidth * 0.5 * iSlope * -10000, -10000 * map.tileHeight, i * map.tileWidth * 0.5 * iSlope * 10000, 10000 * map.tileHeight, viewPort);
	        //     this.drawLine(-10000 * map.tileWidth * 0.5, j * map.tileHeight * 0.5, 10000 * map.tileWidth * 0.5, j * map.tileHeight * 0.5, viewPort);
	        // }
	        // this.drawLine(viewPort.xLeft, -viewPort.yTop, 1000 + viewPort.xRight, -viewPort.yTop, viewPort);
	        // this.drawLine(-viewPort.xLeft, viewPort.yTop, -viewPort.xLeft, 1000 + viewPort.yBottom, viewPort);
	    };
	    return Renderer;
	}());
	exports.Renderer = Renderer;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tslib_1 = __webpack_require__(1);
	var src_1 = __webpack_require__(9);
	var tiled_map_1 = __webpack_require__(2);
	src_1.setupBrowser();
	var http = src_1.Platform.http();
	function createMapWithSpriteSheetSamples(spriteSheetImageUrl, spriteSheetMetaDataUrl, defaultSpriteIndex, spriteSheetLoader, shape, tileWidth, tileHeight) {
	    return tslib_1.__awaiter(this, void 0, void 0, function () {
	        var map, iZero, jZero, image, metaDataText, spriteSheet, defaultSprite, i, j, s, _a, xBottomCenter, yBottomCenter, zIndex, x, y, tile, spriteCount, columns, rows, iSprite, i, j, s, _b, xBottomCenter, yBottomCenter, zIndex, x, y, tile;
	        return tslib_1.__generator(this, function (_c) {
	            switch (_c.label) {
	                case 0:
	                    map = {
	                        iZero: 100,
	                        jZero: 100,
	                        shape: shape,
	                        tileWidth: tileWidth,
	                        tileHeight: tileHeight,
	                        tiles: [],
	                        defaultSprite: null
	                    };
	                    iZero = map.iZero;
	                    jZero = map.jZero;
	                    image = new Image();
	                    image.src = spriteSheetImageUrl;
	                    return [4 /*yield*/, http.request(spriteSheetMetaDataUrl)];
	                case 1:
	                    metaDataText = (_c.sent()).data;
	                    spriteSheet = spriteSheetLoader.load(spriteSheetImageUrl, image, tileWidth, tileHeight, metaDataText);
	                    defaultSprite = map.defaultSprite = spriteSheet.sprites[defaultSpriteIndex];
	                    for (i = 0; i < iZero * 2; i++) {
	                        for (j = 0; j < jZero * 2; j++) {
	                            s = defaultSprite;
	                            _a = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), xBottomCenter = _a.xBottomCenter, yBottomCenter = _a.yBottomCenter, zIndex = _a.zIndex;
	                            x = xBottomCenter - s.width * 0.5;
	                            y = yBottomCenter - s.height;
	                            map.tiles[i] = map.tiles[i] || [];
	                            tile = map.tiles[i][j] = map.tiles[i][j] || {
	                                stack: [],
	                                x: xBottomCenter - tileWidth * 0.5,
	                                y: yBottomCenter - tileHeight,
	                                zIndex: zIndex
	                            };
	                            tile.stack.push({
	                                tile: tile,
	                                sprite: s,
	                                x: x,
	                                y: y,
	                                zIndex: zIndex,
	                                opacity: 1,
	                                shouldHighlight: false
	                            });
	                        }
	                    }
	                    spriteCount = spriteSheet.sprites.length;
	                    columns = Math.ceil(Math.sqrt(spriteCount));
	                    rows = columns;
	                    iSprite = 0;
	                    for (i = iZero; i < columns + iZero; i++) {
	                        for (j = jZero; j < rows + jZero; j++) {
	                            s = spriteSheet.sprites[iSprite];
	                            _b = getTilePosition(i, j, shape, tileWidth, tileHeight, map.iZero, map.jZero), xBottomCenter = _b.xBottomCenter, yBottomCenter = _b.yBottomCenter, zIndex = _b.zIndex;
	                            x = xBottomCenter - s.width * 0.5;
	                            y = yBottomCenter - s.height;
	                            map.tiles[i] = map.tiles[i] || [];
	                            tile = map.tiles[i][j] = map.tiles[i][j] || {
	                                stack: [],
	                                x: x,
	                                y: y,
	                                zIndex: zIndex
	                            };
	                            tile.stack[0] = {
	                                tile: tile,
	                                sprite: s,
	                                x: x,
	                                y: y,
	                                zIndex: zIndex,
	                                opacity: 1,
	                                shouldHighlight: false
	                            };
	                            iSprite++;
	                            if (iSprite >= spriteCount) {
	                                break;
	                            }
	                        }
	                        if (iSprite >= spriteCount) {
	                            break;
	                        }
	                    }
	                    return [2 /*return*/, map];
	            }
	        });
	    });
	}
	exports.createMapWithSpriteSheetSamples = createMapWithSpriteSheetSamples;
	function getTilePosition(i, j, shape, tileWidth, tileHeight, iZero, jZero) {
	    var xPerI = tileWidth;
	    var xPerJ = 0;
	    var yPerI = 0;
	    var yPerJ = tileHeight;
	    var zIndexPerI = 0;
	    var zIndexPerJ = 1;
	    if (shape === tiled_map_1.MapShape.Isometric) {
	        xPerI = tileWidth * 0.5;
	        xPerJ = tileWidth * 0.5;
	        yPerI = -tileHeight * 0.5;
	        yPerJ = tileHeight * 0.5;
	        zIndexPerI = -1;
	        zIndexPerJ = 1;
	    }
	    return {
	        xBottomCenter: (i - iZero) * xPerI + (j - jZero) * xPerJ,
	        yBottomCenter: (i - iZero) * yPerI + (j - jZero) * yPerJ,
	        zIndex: (i - iZero) * zIndexPerI + (j - jZero) * zIndexPerJ,
	    };
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	//# sourceMappingURL=index.js.map

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var Platform = (function () {
	    function Platform() {
	    }
	    Platform.http = function () { return Platform.provider.http(); };
	    return Platform;
	}());
	exports.Platform = Platform;
	//# sourceMappingURL=platform.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
	    return { next: verb(0), "throw": verb(1), "return": verb(2) };
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var P = __webpack_require__(10);
	var browser_ajax_1 = __webpack_require__(12);
	function setupBrowser() {
	    P.Platform.provider = new BrowserPlatformProvider();
	    Promise = __webpack_require__(13).Promise;
	}
	exports.setupBrowser = setupBrowser;
	var BrowserPlatformProvider = (function () {
	    function BrowserPlatformProvider() {
	    }
	    BrowserPlatformProvider.prototype.http = function () {
	        return new BrowserHttpClient();
	    };
	    return BrowserPlatformProvider;
	}());
	var BrowserHttpClient = (function () {
	    function BrowserHttpClient() {
	    }
	    BrowserHttpClient.prototype.request = function (url, method, data, headers, withCredentials) {
	        if (withCredentials === void 0) { withCredentials = false; }
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, new Promise(function (resolve, reject) {
	                        method = method || "GET";
	                        new browser_ajax_1.Ajax().ajax({
	                            url: url,
	                            type: method,
	                            data: data,
	                            withCredentials: withCredentials,
	                            beforeSend: function (xhr) {
	                                if (headers != null) {
	                                    for (var k in headers) {
	                                        var v = headers[k];
	                                        xhr.setRequestHeader(k, v);
	                                    }
	                                }
	                            },
	                            success: function (data, textStatus, response) {
	                                var headersList = response.getAllResponseHeaders().split("\n").map(function (x) { return x.trim().split("="); });
	                                var headers = {};
	                                headersList.forEach(function (x) { return headers[x[0]] = x[1]; });
	                                resolve({ data: data, headers: headers });
	                            },
	                            error: function (err) { return reject(err); }
	                        });
	                    })];
	            });
	        });
	    };
	    return BrowserHttpClient;
	}());
	//# sourceMappingURL=browser.js.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	// Vanilla Ajax Requests
	// From: http://stackoverflow.com/a/18078705/567524
	"use strict";
	var Ajax = (function () {
	    function Ajax() {
	    }
	    Ajax.prototype.createXhr = function () {
	        if (typeof XMLHttpRequest !== "undefined") {
	            return new XMLHttpRequest();
	        }
	        var versions = [
	            "MSXML2.XmlHttp.6.0",
	            "MSXML2.XmlHttp.5.0",
	            "MSXML2.XmlHttp.4.0",
	            "MSXML2.XmlHttp.3.0",
	            "MSXML2.XmlHttp.2.0",
	            "Microsoft.XmlHttp"
	        ];
	        for (var i = 0; i < versions.length; i++) {
	            try {
	                return new ActiveXObject(versions[i]);
	            }
	            catch (e) {
	            }
	        }
	    };
	    // private send(url, callback, method, data, async = true) {
	    //     var xhr = this.xhr;
	    //     xhr.open(method, url, async);
	    //     xhr.onreadystatechange = function () {
	    //         if (xhr.readyState == 4) {
	    //             callback(xhr.responseText);
	    //         }
	    //     };
	    //     if (method == 'POST') {
	    //         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    //     }
	    //     xhr.send(data);
	    // };
	    Ajax.prototype.get = function (url, onSuccess, onFail) {
	        // var query = [];
	        // for (var key in data) {
	        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	        // }
	        // this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null);
	        this.ajax({
	            url: url,
	            type: "GET",
	            success: onSuccess,
	            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ":" + information); }
	        });
	    };
	    ;
	    Ajax.prototype.post = function (url, data, onSuccess, onFail) {
	        var query = [];
	        for (var key in data) {
	            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	        }
	        var dataString = query.join("&");
	        // this.send(url, callback, 'POST', query.join('&'));
	        this.ajax({
	            url: url,
	            data: dataString,
	            type: "POST",
	            contentType: "application/x-www-form-urlencoded",
	            success: onSuccess,
	            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ":" + information); }
	        });
	    };
	    ;
	    Ajax.prototype.jsonp = function (url, data, onSuccess, onFail) {
	        var query = [];
	        for (var key in data) {
	            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	        }
	        var dataString = query.join("&");
	        // this.send(url, callback, 'POST', query.join('&'));
	        var src = url
	            + (url.indexOf("?") > 0 ? "&" : "?")
	            + dataString;
	        var script = document.createElement("script");
	        script.src = src;
	        script.onload = function () { return onSuccess(); };
	        script.onerror = function () { return onFail(); };
	        document.head.appendChild(script);
	    };
	    ;
	    Ajax.prototype.ajax = function (settings) {
	        // settings.beforeSend
	        // settings.complete
	        // settings.contentType
	        // settings.data
	        // settings.dataType - No Processing Done Null or Text only
	        // settings.error
	        // settings.processData - Always false
	        // settings.success
	        // settings.type
	        // settings.url
	        if (settings.dataType != null && settings.dataType !== "text") {
	            throw "Ajax Library does not process data - set to null or text";
	        }
	        settings.success = settings.success || (function () { });
	        settings.error = settings.error || (function () { });
	        settings.complete = settings.complete || (function () { });
	        settings.beforeSend = settings.beforeSend || (function () { });
	        var xhr = this.createXhr();
	        var hasCompleted = false;
	        setTimeout(function () {
	            if (!hasCompleted) {
	                settings.error(xhr, "Timed Out", "");
	            }
	        }, 30 * 1000);
	        var url = settings.url;
	        var method = settings.type || "GET";
	        xhr.open(method, url, true);
	        xhr.withCredentials = settings.withCredentials || false;
	        xhr.onerror = function (ev) {
	            settings.error(xhr, "" + xhr.status, "" + ev);
	        };
	        xhr.onreadystatechange = function () {
	            // console.log("xhr.onreadystatechange",
	            //     "settings.url", settings.url,
	            //     "xhr.readyState", xhr.readyState,
	            //     "xhr.status", xhr.status,
	            //     "xhr.responseText", xhr.responseText.substr(0, 20),
	            // );
	            if (xhr.readyState === 4) {
	                hasCompleted = true;
	                if (xhr.status >= 200 && xhr.status < 300) {
	                    try {
	                        settings.success(xhr.responseText, "" + xhr.status, xhr);
	                    }
	                    catch (err) {
	                        console.log("ERROR in success handler", err);
	                    }
	                }
	                else {
	                    try {
	                        settings.error(xhr, "" + xhr.status, "");
	                    }
	                    catch (err) {
	                        console.log("ERROR in error handler", err);
	                    }
	                }
	                try {
	                    settings.complete();
	                }
	                catch (err) {
	                    console.log("ERROR in complete handler", err);
	                }
	            }
	        };
	        // if (method == 'POST') {
	        //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        // }
	        if (settings.contentType != null) {
	            xhr.setRequestHeader("Content-type", settings.contentType);
	        }
	        settings.beforeSend(xhr);
	        xhr.send(settings.data);
	    };
	    return Ajax;
	}());
	exports.Ajax = Ajax;
	//# sourceMappingURL=browser-ajax.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }
	
	  return useSetTimeout();
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(15);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,
	
	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }
	
	    var P = local.Promise;
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 15 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tslib_1 = __webpack_require__(1);
	var UserInputType;
	(function (UserInputType) {
	    UserInputType[UserInputType["Move"] = 0] = "Move";
	    UserInputType[UserInputType["Start"] = 1] = "Start";
	    UserInputType[UserInputType["Drag"] = 2] = "Drag";
	    UserInputType[UserInputType["End"] = 3] = "End";
	})(UserInputType = exports.UserInputType || (exports.UserInputType = {}));
	function getTilesAtInput(map, input) {
	    if (input.tilesUnder) {
	        return { tilesUnder: input.tilesUnder, tileItemsUnder: input.tileItemsUnder };
	    }
	    var tilesUnder = [];
	    var tileItemsUnder = [];
	    var x = input.x;
	    var y = input.y;
	    var tw = map.tileWidth;
	    var th = map.tileHeight;
	    for (var i = 0; i < map.tiles.length; i++) {
	        var column = map.tiles[i];
	        for (var j = 0; j < column.length; j++) {
	            var tile = column[j];
	            var isTileUnder = false;
	            if (tile.x <= x && tile.x + tw >= x
	                && tile.y <= y && tile.y + th >= y) {
	                tilesUnder.push(tile);
	                isTileUnder = true;
	            }
	            for (var k = 0; k < tile.stack.length; k++) {
	                var tileItem = tile.stack[k];
	                if (tileItem.x <= x && tileItem.x + tileItem.sprite.width >= x
	                    && tileItem.y <= y && tileItem.y + tileItem.sprite.height >= y) {
	                    tileItemsUnder.push(tileItem);
	                }
	            }
	        }
	    }
	    // console.log('getTilesAtInput', tilesUnder, tileItemsUnder);
	    input.tilesUnder = tilesUnder;
	    input.tileItemsUnder = tileItemsUnder;
	    return { tilesUnder: tilesUnder, tileItemsUnder: tileItemsUnder };
	}
	exports.getTilesAtInput = getTilesAtInput;
	function getNearestTile(map, tilesUnder, input) {
	    if (tilesUnder.length === 0) {
	        return null;
	    }
	    return tilesUnder.map(function (t) { return ({
	        t: t,
	        dx: t.x + map.tileWidth * 0.5 - input.x,
	        dy: t.y + map.tileHeight * 0.5 - input.y
	    }); }).map(function (t) { return (tslib_1.__assign({ distSqr: t.dx * t.dx + t.dy * t.dy }, t)); })
	        .reduce(function (out, t) { return out.distSqr < t.distSqr ? out : t; })
	        .t;
	}
	exports.getNearestTile = getNearestTile;
	function getNearestTileItem(tileItemsUnder, input) {
	    var topTiles = tileItemsUnder
	        .filter(function (t) { return t.tile.stack[t.tile.stack.length - 1] === t; });
	    if (topTiles.length === 0) {
	        return null;
	    }
	    return topTiles
	        .map(function (t) { return ({
	        t: t,
	        dx: t.x + t.sprite.xBottomCenter_fromTopLeft - input.x,
	        dy: t.y + t.sprite.yBottomCenter_fromTopLeft - t.sprite.height * 0.5 - input.y
	    }); }).map(function (t) { return (tslib_1.__assign({ distSqr: t.dx * t.dx + t.dy * t.dy }, t)); })
	        .reduce(function (out, t) { return out.distSqr < t.distSqr ? out : t; })
	        .t;
	}
	exports.getNearestTileItem = getNearestTileItem;
	var TileHighlighter = (function () {
	    function TileHighlighter(map) {
	        this.map = map;
	        this.oldTilesUnder = [];
	        this.oldTileItemsUnder = [];
	    }
	    TileHighlighter.prototype.handleInput = function (input) {
	        // if (input.type === UserInputType.Move) { return; }
	        // console.log('TileMover.handleInput input=', input);
	        var _a = getTilesAtInput(this.map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
	        for (var _i = 0, _b = this.oldTileItemsUnder; _i < _b.length; _i++) {
	            var t = _b[_i];
	            t.shouldHighlight = false;
	        }
	        // for (let tile of this.oldTilesUnder) {
	        //     for (let t of tile.stack) {
	        //         t.shouldHighlight = false;
	        //     }
	        // }
	        var nearestTileItem = getNearestTileItem(tileItemsUnder, input);
	        if (nearestTileItem) {
	            nearestTileItem.shouldHighlight = true;
	            this.oldTileItemsUnder = [nearestTileItem];
	        }
	        if (nearestTileItem.opacity < 1) {
	            var nearestTile = getNearestTile(this.map, tilesUnder, input);
	            if (nearestTile) {
	                for (var _c = 0, _d = nearestTile.stack; _c < _d.length; _c++) {
	                    var t = _d[_c];
	                    t.shouldHighlight = true;
	                    this.oldTileItemsUnder.push(t);
	                }
	            }
	        }
	        // this.oldTilesUnder = [nearestTile];
	    };
	    return TileHighlighter;
	}());
	exports.TileHighlighter = TileHighlighter;
	var TileMover = (function () {
	    function TileMover(map) {
	        this.map = map;
	    }
	    TileMover.prototype.handleInput = function (input) {
	        var _this = this;
	        if (input.type === UserInputType.Move) {
	            return;
	        }
	        // console.log('TileMover.handleInput input=', input);
	        if (!this.activeTileItem) {
	            var _a = getTilesAtInput(this.map, input), tilesUnder = _a.tilesUnder, tileItemsUnder = _a.tileItemsUnder;
	            var nearestTileItem = getNearestTileItem(tileItemsUnder, input);
	            if (!nearestTileItem) {
	                return;
	            }
	            this.activeTileItem = nearestTileItem;
	            this.dxStart = this.activeTileItem.x - input.x;
	            this.dyStart = this.activeTileItem.y - input.y;
	            this.xStart = this.activeTileItem.x;
	            this.yStart = this.activeTileItem.y;
	            this.zStart = this.activeTileItem.zIndex;
	        }
	        this.activeTileItem.x = input.x + this.dxStart;
	        this.activeTileItem.y = input.y + this.dyStart;
	        this.activeTileItem.shouldHighlight = true;
	        this.activeTileItem.zIndex = 10000;
	        this.activeTileItem.opacity = 0.5;
	        if (input.type === UserInputType.End) {
	            // Move Stack
	            var _b = getTilesAtInput(this.map, input), tilesUnder = _b.tilesUnder, tileItemsUnder = _b.tileItemsUnder;
	            console.log('Move Stack', this.activeTileItem.tile, this.activeTileItem, tilesUnder);
	            if (tilesUnder.some(function (t) { return t === _this.activeTileItem.tile; })) {
	                // Return to old position
	                this.activeTileItem.x = this.xStart;
	                this.activeTileItem.y = this.yStart;
	                this.activeTileItem.zIndex = this.zStart;
	            }
	            else {
	                // Move to new stack
	                var newTile = getNearestTile(this.map, tilesUnder, input);
	                if (newTile == null) {
	                    return;
	                }
	                var oldTile = this.activeTileItem.tile;
	                // Calculate New position                
	                this.activeTileItem.x = newTile.x + this.map.tileWidth * 0.5 - this.activeTileItem.sprite.xBottomCenter_fromTopLeft;
	                this.activeTileItem.y = newTile.y + this.map.tileHeight - this.activeTileItem.sprite.yBottomCenter_fromTopLeft;
	                this.activeTileItem.y -= newTile.stack.reduce(function (out, t) { return out += t.sprite.stackHeight; }, 0);
	                this.activeTileItem.zIndex = newTile.zIndex + newTile.stack.length * 0.1;
	                // Change stack
	                oldTile.stack.splice(oldTile.stack.indexOf(this.activeTileItem), 1);
	                newTile.stack.push(this.activeTileItem);
	                this.activeTileItem.tile = newTile;
	            }
	            this.activeTileItem.shouldHighlight = false;
	            this.activeTileItem.opacity = 1;
	            this.activeTileItem = null;
	        }
	    };
	    return TileMover;
	}());
	exports.TileMover = TileMover;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var DEBUG = false;
	var ImageEffectKind;
	(function (ImageEffectKind) {
	    ImageEffectKind[ImageEffectKind["Light"] = 0] = "Light";
	    ImageEffectKind[ImageEffectKind["Dark"] = 1] = "Dark";
	    ImageEffectKind[ImageEffectKind["RgbRotate"] = 2] = "RgbRotate";
	    ImageEffectKind[ImageEffectKind["RgbRotate2"] = 3] = "RgbRotate2";
	})(ImageEffectKind = exports.ImageEffectKind || (exports.ImageEffectKind = {}));
	function getImageEffect(spriteSheet, kind) {
	    if (spriteSheet.image == null || spriteSheet.image.width <= 0) {
	        return null;
	    }
	    spriteSheet.imageEffects = spriteSheet.imageEffects || [];
	    var resultImage = spriteSheet.imageEffects[kind];
	    if (resultImage == null) {
	        // Placeholder
	        spriteSheet.imageEffects[kind] = 0;
	        setTimeout(function () {
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
	exports.getImageEffect = getImageEffect;
	function createImageEffect_dark(image) {
	    var cvs = document.createElement('canvas');
	    cvs.width = image.width;
	    cvs.height = image.height;
	    if (DEBUG) {
	        document.body.appendChild(cvs);
	    }
	    var ctx = cvs.getContext('2d');
	    ctx.drawImage(image, 0, 0, image.width, image.height);
	    var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	    var data = imageData.data;
	    for (var i = 0; i < data.length; i += 4) {
	        var r = data[i + 0];
	        var g = data[i + 1];
	        var b = data[i + 2];
	        var a = data[i + 3];
	        if (a > 0) {
	            data[i + 0] = r * 0.7;
	            data[i + 1] = g * 0.7;
	            data[i + 2] = b * 0.8;
	        }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    return cvs;
	}
	exports.createImageEffect_dark = createImageEffect_dark;
	function createImageEffect_light(image) {
	    var cvs = document.createElement('canvas');
	    cvs.width = image.width;
	    cvs.height = image.height;
	    if (DEBUG) {
	        document.body.appendChild(cvs);
	    }
	    var ctx = cvs.getContext('2d');
	    ctx.drawImage(image, 0, 0, image.width, image.height);
	    var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	    var data = imageData.data;
	    for (var i = 0; i < data.length; i += 4) {
	        var r = data[i + 0];
	        var g = data[i + 1];
	        var b = data[i + 2];
	        var a = data[i + 3];
	        if (a > 0) {
	            data[i + 0] = r * 0.6 + 225 * 0.4;
	            data[i + 1] = g * 0.6 + 225 * 0.4;
	            data[i + 2] = b * 0.4 + 225 * 0.6;
	        }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    return cvs;
	}
	exports.createImageEffect_light = createImageEffect_light;
	function createImageEffect_rgbRotate(image) {
	    var cvs = document.createElement('canvas');
	    cvs.width = image.width;
	    cvs.height = image.height;
	    if (DEBUG) {
	        document.body.appendChild(cvs);
	    }
	    var ctx = cvs.getContext('2d');
	    ctx.drawImage(image, 0, 0, image.width, image.height);
	    var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	    var data = imageData.data;
	    for (var i = 0; i < data.length; i += 4) {
	        var r = data[i + 0];
	        var g = data[i + 1];
	        var b = data[i + 2];
	        var a = data[i + 3];
	        if (a > 0) {
	            data[i + 0] = g;
	            data[i + 1] = b;
	            data[i + 2] = r;
	        }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    return cvs;
	}
	exports.createImageEffect_rgbRotate = createImageEffect_rgbRotate;
	function createImageEffect_rgbRotate2(image) {
	    var cvs = document.createElement('canvas');
	    cvs.width = image.width;
	    cvs.height = image.height;
	    if (DEBUG) {
	        document.body.appendChild(cvs);
	    }
	    var ctx = cvs.getContext('2d');
	    ctx.drawImage(image, 0, 0, image.width, image.height);
	    var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	    var data = imageData.data;
	    for (var i = 0; i < data.length; i += 4) {
	        var r = data[i + 0];
	        var g = data[i + 1];
	        var b = data[i + 2];
	        var a = data[i + 3];
	        if (a > 0) {
	            data[i + 0] = b;
	            data[i + 1] = r;
	            data[i + 2] = g;
	        }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    return cvs;
	}
	exports.createImageEffect_rgbRotate2 = createImageEffect_rgbRotate2;


/***/ }
/******/ ]);
//# sourceMappingURL=tiled-map-canvas.js.map