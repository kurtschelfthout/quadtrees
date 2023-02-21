import * as qt from "quadtree";

const OWL_IMAGE = "owl.jpg";
const HAL_IMAGE = "hal.jpg";

const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext('2d');
const img = document.getElementById("original");


const getOriginalImageData = (img, sw, sh) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, sw, sh);
}

const drawQuadTree = (error, length) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.width;
    canvas.height = img.height;
    const imageData = getOriginalImageData(img, img.width, img.height);
    const image = qt.Image.from_image_data(imageData.data, imageData.width, imageData.height);
    const tree = qt.RegionQuadTreeImage.new(image);
    tree.subdivide_until(error, length);
    const subdivided = tree.get_result_image();
    const subdividedImageData = ctx.createImageData(imageData);
    subdivided.to_image_data(subdividedImageData.data);
    ctx.putImageData(subdividedImageData, 0, 0);
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
    const diff = target - length;
    return [diff, target];
}

const drawCompleteQuadTree = (level) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cSize = cropSize(img.width, img.height);
    let [sx, sw] = adjustmentLeftRight(img.width, cSize);
    let [sy, sh] = adjustmentLeftRight(img.height, cSize);
    canvas.width = sw;
    canvas.height = sh;
    const imageData = getOriginalImageData(img, sw, sh);
    const image = qt.Image.from_image_data(imageData.data, imageData.width, imageData.height);
    const tree = qt.QuadTree.new(image);
    const blurry = tree.image_at_level(level);
    const blurryImageData = ctx.createImageData(imageData);
    blurry.to_image_data(blurryImageData.data);
    ctx.putImageData(blurryImageData, sx,sy);
}

const onRegionQuadTree = () => {
    img.onload = function(){
        drawQuadTree(1000, 1);
    };
    img.src = OWL_IMAGE;

    var lengthSlider = document.getElementById("minLength");
    lengthSlider.style.display = 'block'
    lengthSlider.min = 1;
    lengthSlider.max = 100;
    lengthSlider.value = 20;
    var lengthOutput = document.getElementById("minlengthval");
    lengthOutput.innerHTML = "min length: " + lengthSlider.value;

    var errorSlider = document.getElementById("error");
    errorSlider.style.display = 'block'
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
}

const onCompleteQuadTree = () => {
    img.onload = function(){
        drawCompleteQuadTree(7);
    };
    img.src = HAL_IMAGE;

    var lengthSlider = document.getElementById("minLength");
    lengthSlider.style.display = 'block';
    var lengthOutput = document.getElementById("minlengthval");
    var errorSlider = document.getElementById("error");
    errorSlider.style.display = 'none';
    var errorOutput = document.getElementById("errorval");
    errorOutput.innerHTML = "";
    lengthSlider.min = 0;
    lengthSlider.max = 9;
    lengthSlider.value = 7;
    lengthOutput.innerHTML = "level: " + lengthSlider.value;

    lengthSlider.oninput = function() {
        lengthOutput.innerHTML = "level: " + this.value;
        drawCompleteQuadTree(this.value);
    }
}

const reactToHash = () => {
    if (window.location.hash === "#complete") {
        onCompleteQuadTree();
    }
    else {
        onRegionQuadTree(); 
    }
}


window.onhashchange = reactToHash;

reactToHash();

