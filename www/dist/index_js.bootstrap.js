"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcreate_wasm_app"] = self["webpackChunkcreate_wasm_app"] || []).push([["index_js"],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var quadtree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quadtree */ \"./node_modules/quadtree/quadtree_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([quadtree__WEBPACK_IMPORTED_MODULE_0__]);\nquadtree__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n// import { Image as QTImage } from \"quadtree\";\r\n// https://github.com/rustwasm/wasm-bindgen/issues/2200\r\n// import { memory } from \"quadtree/quadtree_bg.wasm\";\r\n\r\n// const DEFAULT_IMAGE = \"hal.jpg\";\r\n\r\n// const canvas = document.getElementById(\"image-canvas\");\r\n// const ctx = canvas.getContext('2d');\r\n\r\n// const img = new Image();\r\n// img.onload = function(){\r\n//     canvas.width = img.width;\r\n//     canvas.height = img.height;\r\n//     ctx.drawImage(img, 0, 0, img.width, img.height);\r\n//     const imageData = ctx.getImageData(0, 0, img.width, img.height);\r\n//     // const image = QTImage.from_image_data(imageData, img.width, img.height);\r\n// };\r\n// img.src = DEFAULT_IMAGE;\r\n\r\n\r\n// const imageData = ctx.getImageData(0, 0, img.width, img.height);\r\n\r\nconst emptyImage = () => quadtree__WEBPACK_IMPORTED_MODULE_0__.Image.test();\r\n\r\nconst image = emptyImage();\r\n\r\n\r\n// const renderLoop = () => {\r\n//         universe.tick();\r\n\r\n//         drawGrid();\r\n//         drawCells();\r\n\r\n//         requestAnimationFrame(renderLoop);\r\n//     };\r\n\r\n// const drawGrid = () => {\r\n//     ctx.beginPath();\r\n//     ctx.strokeStyle = GRID_COLOR;\r\n\r\n//     // Vertical lines.\r\n//     for (let i = 0; i <= width; i++) {\r\n//         ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\r\n//         ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\r\n//     }\r\n\r\n//     // Horizontal lines.\r\n//     for (let j = 0; j <= height; j++) {\r\n//         ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);\r\n//         ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);\r\n//     }\r\n\r\n//     ctx.stroke();\r\n// };\r\n\r\n// const getIndex = (row, column) => {\r\n//     return row * width + column;\r\n// };\r\n\r\n// const drawCells = () => {\r\n//     const cellsPtr = universe.cells();\r\n//     const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);\r\n\r\n//     ctx.beginPath();\r\n\r\n//     for (let row = 0; row < height; row++) {\r\n//         for (let col = 0; col < width; col++) {\r\n//             const idx = getIndex(row, col);\r\n\r\n//             ctx.fillStyle = cells[idx] === Cell.Dead\r\n//                 ? DEAD_COLOR\r\n//                 : ALIVE_COLOR;\r\n\r\n//             ctx.fillRect(\r\n//                 col * (CELL_SIZE + 1) + 1,\r\n//                 row * (CELL_SIZE + 1) + 1,\r\n//                 CELL_SIZE,\r\n//                 CELL_SIZE\r\n//             );\r\n//         }\r\n//     }\r\n\r\n//     ctx.stroke();\r\n// };\r\n\r\n// drawGrid();\r\n// drawCells();\r\n// requestAnimationFrame(renderLoop);\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://create-wasm-app/./index.js?");

/***/ }),

/***/ "./node_modules/quadtree/quadtree_bg.js":
/*!**********************************************!*\
  !*** ./node_modules/quadtree/quadtree_bg.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Image\": () => (/* binding */ Image),\n/* harmony export */   \"Pixel\": () => (/* binding */ Pixel),\n/* harmony export */   \"__wbg_error_f851667af71bcfc6\": () => (/* binding */ __wbg_error_f851667af71bcfc6),\n/* harmony export */   \"__wbg_new_abda76e883ba8a5f\": () => (/* binding */ __wbg_new_abda76e883ba8a5f),\n/* harmony export */   \"__wbg_stack_658279fe44541cf6\": () => (/* binding */ __wbg_stack_658279fe44541cf6),\n/* harmony export */   \"__wbindgen_object_drop_ref\": () => (/* binding */ __wbindgen_object_drop_ref),\n/* harmony export */   \"__wbindgen_throw\": () => (/* binding */ __wbindgen_throw)\n/* harmony export */ });\n/* harmony import */ var _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quadtree_bg.wasm */ \"./node_modules/quadtree/quadtree_bg.wasm\");\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);\n_quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = new Uint8Array();\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(_quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passArray8ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 1);\n    getUint8Memory0().set(arg, ptr / 1);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachedInt32Memory0 = new Int32Array();\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(_quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n/**\n*/\nclass Image {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Image.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_image_free(ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    static test() {\n        const ret = _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.image_test();\n        return ret >>> 0;\n    }\n    /**\n    * @returns {Image}\n    */\n    static empty() {\n        const ret = _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.image_empty();\n        return Image.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        const ret = _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.image_width(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        const ret = _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.image_height(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    pixels() {\n        const ret = _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.image_pixels(this.ptr);\n        return ret;\n    }\n    /**\n    * @param {Uint8ClampedArray} image_data_rgba\n    * @param {number} width\n    * @param {number} height\n    * @returns {Image}\n    */\n    static from_image_data(image_data_rgba, width, height) {\n        const ptr0 = passArray8ToWasm0(image_data_rgba, _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc);\n        const len0 = WASM_VECTOR_LEN;\n        const ret = _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.image_from_image_data(ptr0, len0, width, height);\n        return Image.__wrap(ret);\n    }\n}\n/**\n*/\nclass Pixel {\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_pixel_free(ptr);\n    }\n}\n\nfunction __wbg_new_abda76e883ba8a5f() {\n    const ret = new Error();\n    return addHeapObject(ret);\n};\n\nfunction __wbg_stack_658279fe44541cf6(arg0, arg1) {\n    const ret = getObject(arg1).stack;\n    const ptr0 = passStringToWasm0(ret, _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nfunction __wbg_error_f851667af71bcfc6(arg0, arg1) {\n    try {\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        _quadtree_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(arg0, arg1);\n    }\n};\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://create-wasm-app/./node_modules/quadtree/quadtree_bg.js?");

/***/ }),

/***/ "./node_modules/quadtree/quadtree_bg.wasm":
/*!************************************************!*\
  !*** ./node_modules/quadtree/quadtree_bg.wasm ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var __webpack_instantiate__ = ([WEBPACK_IMPORTED_MODULE_0]) => {\n\treturn __webpack_require__.v(exports, module.id, \"8126fff42ff3b5d9be8c\", {\n\t\t\"./quadtree_bg.js\": {\n\t\t\t\"__wbg_new_abda76e883ba8a5f\": WEBPACK_IMPORTED_MODULE_0.__wbg_new_abda76e883ba8a5f,\n\t\t\t\"__wbg_stack_658279fe44541cf6\": WEBPACK_IMPORTED_MODULE_0.__wbg_stack_658279fe44541cf6,\n\t\t\t\"__wbg_error_f851667af71bcfc6\": WEBPACK_IMPORTED_MODULE_0.__wbg_error_f851667af71bcfc6,\n\t\t\t\"__wbindgen_object_drop_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_drop_ref,\n\t\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw\n\t\t}\n\t});\n}\n__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => {\n\ttry {\n\t/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./quadtree_bg.js */ \"./node_modules/quadtree/quadtree_bg.js\");\n\tvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([WEBPACK_IMPORTED_MODULE_0]);\n\tvar [WEBPACK_IMPORTED_MODULE_0] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;\n\tawait __webpack_require__.v(exports, module.id, \"8126fff42ff3b5d9be8c\", {\n\t\t\"./quadtree_bg.js\": {\n\t\t\t\"__wbg_new_abda76e883ba8a5f\": WEBPACK_IMPORTED_MODULE_0.__wbg_new_abda76e883ba8a5f,\n\t\t\t\"__wbg_stack_658279fe44541cf6\": WEBPACK_IMPORTED_MODULE_0.__wbg_stack_658279fe44541cf6,\n\t\t\t\"__wbg_error_f851667af71bcfc6\": WEBPACK_IMPORTED_MODULE_0.__wbg_error_f851667af71bcfc6,\n\t\t\t\"__wbindgen_object_drop_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_drop_ref,\n\t\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw\n\t\t}\n\t});\n\t__webpack_async_result__();\n\t} catch(e) { __webpack_async_result__(e); }\n}, 1);\n\n//# sourceURL=webpack://create-wasm-app/./node_modules/quadtree/quadtree_bg.wasm?");

/***/ })

}]);