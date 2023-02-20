use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Rgba {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
    pub alpha: u8,
}

impl Rgba {
    pub(crate) fn new() -> Rgba {
        Rgba {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
        }
    }

    pub(crate) fn mean(pixels: &[Rgba]) -> Rgba {
        let mut red: u32 = 0;
        let mut green: u32 = 0;
        let mut blue: u32 = 0;
        let mut alpha: u32 = 0;
        for pixel in pixels {
            red += pixel.red as u32;
            green += pixel.green as u32;
            blue += pixel.blue as u32;
            alpha += pixel.alpha as u32;
        }
        let len = pixels.len() as u32;
        Rgba {
            red: (red / len) as u8,
            green: (green / len) as u8,
            blue: (blue / len) as u8,
            alpha: (alpha / len) as u8,
        }
    }

    pub(crate) fn mse(&self, pixels: &[Rgba]) -> f32 {
        // to avoid overflows, first cast each
        // component to u32, then sum, then divide and cast back to u8.
        let mut red: f32 = 0.0;
        let mut green: f32 = 0.0;
        let mut blue: f32 = 0.0;
        for pixel in pixels {
            red += (pixel.red as f32 - self.red as f32).powi(2);
            green += (pixel.green as f32 - self.green as f32).powi(2);
            blue += (pixel.blue as f32 - self.blue as f32).powi(2);
        }
        let len = pixels.len() as f32;
        let (r_mse, g_mse, b_mse) = (red / len, green / len, blue / len);
        // these seem to be the magical constants to account for how important
        // getting a color right is, in terms of how well typical LEDs absorb light
        // in certain frequencies.
        r_mse * 0.2989 + g_mse * 0.5870 + b_mse * 0.1140
    }
}

// Assume square image, with length a power of 2
#[wasm_bindgen]
#[derive(Debug)]
pub struct Image {
    width: usize,
    height: usize,
    pixels: Vec<Rgba>,
}

impl Image {
    #[allow(dead_code)]
    pub(crate) fn new(width: usize, height: usize, pixels: Vec<Rgba>) -> Image {
        Image {
            width,
            height,
            pixels,
        }
    }

    pub(crate) fn empty(width: usize, height: usize) -> Image {
        Image {
            width,
            height,
            pixels: vec![
                Rgba {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 0
                };
                width * height
            ],
        }
    }

    pub(crate) fn get_index(&self, x: usize, y: usize) -> usize {
        y * self.width + x
    }

    pub(crate) fn set_index(&mut self, x: usize, y: usize, pixel: Rgba) {
        let idx = self.get_index(x, y);
        self.pixels[idx] = pixel;
    }

    pub(crate) fn get_pixel(&self, x: usize, y: usize) -> Rgba {
        self.pixels[self.get_index(x, y)]
    }

    pub(crate) fn get_size(&self) -> usize {
        self.width * self.height
    }
}

#[wasm_bindgen]
impl Image {
    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn pixels(&self) -> *const Rgba {
        self.pixels.as_ptr()
    }

    pub fn from_image_data(image_data_rgba: &[u8], width: usize, height: usize) -> Image {
        // utils::set_panic_hook();
        let mut pixels = vec![];
        for i in 0..(width * height) {
            let index = i * 4;
            pixels.push(Rgba {
                red: image_data_rgba[index],
                green: image_data_rgba[index + 1],
                blue: image_data_rgba[index + 2],
                alpha: image_data_rgba[index + 3],
            });
        }

        Image {
            width,
            height,
            pixels,
        }
    }

    pub fn to_image_data(&self, image_data_rgba: &mut [u8]) {
        for i in 0..(self.width * self.height) {
            let index = i * 4;
            image_data_rgba[index] = self.pixels[i].red;
            image_data_rgba[index + 1] = self.pixels[i].green;
            image_data_rgba[index + 2] = self.pixels[i].blue;
            image_data_rgba[index + 3] = self.pixels[i].alpha;
        }
    }
}
