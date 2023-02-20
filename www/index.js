import * as qt from "quadtree";

// https://github.com/rustwasm/wasm-bindgen/issues/2200
// import { memory } from "quadtree/quadtree_bg.wasm";

const DEFAULT_IMAGE = "hal.jpg";

const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext('2d');

const drawOriginal = (img) => {
    canvas.width = 2 * img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
}

const drawQuadTree = (error, length) => {
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const image = qt.Image.from_image_data(imageData.data, imageData.width, imageData.height);
    const tree = qt.RegionQuadTreeImage.new(image);
    tree.subdivide_until(error, length);
    const subdivided = tree.get_result_image();
    const subdividedImageData = ctx.createImageData(imageData);
    subdivided.to_image_data(subdividedImageData.data);
    ctx.putImageData(subdividedImageData, img.width, 0);
}

const img = new Image();
img.onload = function(){
    drawOriginal(img);
    drawQuadTree(1000, 1);
};
img.src = DEFAULT_IMAGE;

var lengthSlider = document.getElementById("minLength");
var lengthOutput = document.getElementById("minlengthval");
lengthOutput.innerHTML = "min length: " + lengthSlider.value;

var errorSlider = document.getElementById("error");
var errorOutput = document.getElementById("errorval");
errorOutput.innerHTML = "error: " + errorSlider.value;

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = "min length: " + this.value;
    drawQuadTree(errorSlider.value, this.value);
}



errorSlider.oninput = function() {
    errorOutput.innerHTML = "error: " + this.value;
    drawQuadTree(this.value, lengthSlider.value);
}





const nextLowerPowerOf4 = (n) => {
    let start = 1;
    while (start < n) {
        start *= 4;
    }
    return start;
}

const cropSize = (width, height) => nextLowerPowerOf4(width*height);

const adjustmentLeftRight = (length, size) => {
    const target = Math.sqrt(size);
    const diff = length - target;
    return [diff / 2, target];
}

// const img = new Image();
// img.onload = function(){
//     drawOriginal(img);
//     const cSize = cropSize(img.width, img.height);
//     let [sx, sw] = adjustmentLeftRight(img.width, cSize);
//     let [sy, sh] = adjustmentLeftRight(img.height, cSize);
//     canvas.width = img.width + sw;
//     canvas.height = sh;
//     ctx.drawImage(img, sx, sy, sw, sh, 0,  0, sw, sh);
//     const imageData = ctx.getImageData(0, 0, sw, sh);
//     const image = qt.Image.from_image_data(imageData.data, imageData.width, imageData.height);
//     const tree = qt.QuadTree.new(image);
//     const blurry = tree.image_at_level(7);
//     const blurryImageData = ctx.createImageData(imageData);
//     blurry.to_image_data(blurryImageData.data);
//     ctx.putImageData(blurryImageData, img.width, 0);
// };
// img.src = DEFAULT_IMAGE;



