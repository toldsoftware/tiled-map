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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/*! *****************************************************************************
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
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function __generator(thisArg, body) {
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.dir = { rootDir: '' };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var fs = __webpack_require__(5);
var Path = __webpack_require__(2);
var resolve_url_1 = __webpack_require__(4);
var root_dir_1 = __webpack_require__(1);
function main(context, request, pathDepthFromApiRoot) {
    if (pathDepthFromApiRoot === void 0) { pathDepthFromApiRoot = 1; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var pathOrig, filePath, path;
        return tslib_1.__generator(this, function (_a) {
            pathOrig = request.query.name || request.pathName;
            filePath = pathOrig
                .replace(/\/$/, '')
                .replace(/\/(file)$/, '')
                .replace(/\/([^\/]+\.js\.map)$/, '.map');
            path = Path.resolve(root_dir_1.dir.rootDir, resolve_url_1.getPathDepthPrefix(pathDepthFromApiRoot - 1), 'resources', filePath.replace(/^\//, ''));
            context.log('filePath=' + filePath + ' path=' + path + ' __dirname=' + __dirname + ' request.query.name=' + request.query.name + ' request.pathName=' + request.pathName);
            fs.readFile(path, function (err, data) {
                context.log('path=' + path);
                if (err != null) {
                    context.log('ERROR: ' + err);
                    context.done(null, {
                        status: 404,
                        headers: {
                            'Content-Type': 'text/plain',
                        },
                        body: ('File Not Found: ' + filePath)
                    });
                    return;
                }
                var type = 'text/plain';
                if (path.match('\.html$')) {
                    type = 'text/html';
                }
                if (path.match('\.css$')) {
                    type = 'text/css';
                }
                if (path.match('\.js$')) {
                    type = 'application/x-javascript';
                }
                if (path.match('\.json$')) {
                    type = 'application/json';
                }
                if (path.match('\.jpg$')) {
                    type = 'image/jpeg';
                }
                if (path.match('\.png$')) {
                    type = 'image/png';
                }
                if (path.match('\.gif$')) {
                    type = 'image/gif';
                }
                if (path.match('\.ico$')) {
                    type = 'image/x-icon';
                }
                // Auto Resolve Resource Urls?
                var body = data;
                if (type === 'text/html') {
                    body = data.toString();
                    body = resolve_url_1.resolveAllUrls(body, pathDepthFromApiRoot);
                }
                // // Prevent Json Curroption
                // if (type === 'application/json') {
                //     body = data.toString();
                //     body = JSON.parse(body);
                // }
                context.done(null, {
                    headers: {
                        'Content-Type': type,
                    },
                    body: body,
                    // Bypass response handling
                    isRaw: true
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.main = main;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function resolveUrlClient(url) {
    if (url.indexOf('./') !== 0) {
        return url;
    }
    var pathname = window.location.pathname;
    var prefix = '/';
    if (pathname.match(/^\/api\//)) {
        prefix = '/api/';
    }
    return resolveUrl_inner(url, prefix);
}
exports.resolveUrlClient = resolveUrlClient;
function resolveUrl(url, pathDepthFromApiRoot) {
    if (pathDepthFromApiRoot === void 0) { pathDepthFromApiRoot = 1; }
    if (url.indexOf('./') !== 0) {
        return url;
    }
    var depthPrefix = getPathDepthPrefix(pathDepthFromApiRoot);
    return resolveUrl_inner(url, depthPrefix);
}
exports.resolveUrl = resolveUrl;
function resolveUrl_inner(url, prefix) {
    url = url.substr(2);
    // If file extension, make file
    if (url.match(/[^/]\.[^/]+$/)) {
        return prefix + "resource/" + url + "/file";
    }
    else {
        return "" + prefix + url + "?q";
    }
}
function resolveAllUrls(content, pathDepthFromApiRoot) {
    return content
        .replace(/"(\.\/[^"]+)"/g, function (x) { return '"' + resolveUrl(x.substr(1, x.length - 2), pathDepthFromApiRoot) + '"'; })
        .replace(/'(\.\/[^']+)'/g, function (x) { return '\'' + resolveUrl(x.substr(1, x.length - 2), pathDepthFromApiRoot) + '\''; });
}
exports.resolveAllUrls = resolveAllUrls;
function getPathDepthPrefix(pathDepthFromApiRoot) {
    var depthPrefix = '';
    for (var i = 0; i < pathDepthFromApiRoot; i++) {
        depthPrefix += '../';
    }
    return depthPrefix;
}
exports.getPathDepthPrefix = getPathDepthPrefix;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var resource_1 = __webpack_require__(3);
function main(context, request) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resource_1.main(context, request)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.main = main;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tslib_1 = __webpack_require__(0);
var path = __webpack_require__(2);
var root_dir_1 = __webpack_require__(1);
function setDirName(dirName) {
    root_dir_1.dir.rootDir = path.resolve(dirName, '..');
    return this;
}
exports.setDirName = setDirName;
function serve(main) {
    return function (context, request) {
        var req = tslib_1.__assign({}, request);
        req.pathName = req.pathName || context.bindingData.pathName || '';
        req.pathParts = req.pathName.split('/').filter(function (x) { return x.length > 0; });
        if (req.query.ping != null) {
            context.done(null, {
                status: 200,
                headers: { 'Content-Type': 'text/plain' },
                body: 'PONG',
            });
            return;
        }
        // Auto-Parse Json
        if (typeof req.body === 'string') {
            var orig = req.body;
            try {
                req.body = JSON.parse(req.body);
            }
            catch (err) {
                req.body = orig;
            }
        }
        main(context, req)
            .then(function () { })
            .catch(function (err) {
            context.log('Uncaught Error:', err);
            context.done(err, null);
        });
    };
}
exports.serve = serve;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// Intentionally global
___export = __webpack_require__(8).setDirName(__dirname).serve(__webpack_require__(7).main);
module.exports = ___export;

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map