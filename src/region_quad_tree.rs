use wasm_bindgen::prelude::wasm_bindgen;

use crate::{
    image::{Image, Rgba},
    utils,
};

/// A region of an image or a 2D plane, described by its top left corner
/// and its width and height.
#[derive(Debug, Clone)]
struct Region {
    x: usize,
    y: usize,
    width: usize,
    height: usize,
}

#[derive(Debug, Clone)]
enum RegionQuadTree {
    Leaf(Region, Rgba),
    Branch([Box<RegionQuadTree>; 4]),
}

// macro_rules! log {
//     ( $( $t:tt )* ) => {
//         web_sys::console::log_1(&format!( $( $t )* ).into());
//     }
// }

impl RegionQuadTree {
    fn new(x: usize, y: usize, width: usize, height: usize) -> RegionQuadTree {
        RegionQuadTree::Leaf(
            Region {
                x,
                y,
                width,
                height,
            },
            Rgba::new(),
        )
    }

    fn leaf(x: usize, y: usize, width: usize, height: usize, image: &Image) -> RegionQuadTree {
        let pixels = Self::get_original_points(&Self::new(x, y, width, height), image);
        let mean = Rgba::mean(&pixels);
        RegionQuadTree::Leaf(
            Region {
                x,
                y,
                width,
                height,
            },
            mean,
        )
    }

    fn region(&self) -> Region {
        match self {
            RegionQuadTree::Leaf(region, _) => region.clone(),
            RegionQuadTree::Branch(children) => Region {
                x: children[0].region().x,
                y: children[0].region().y,
                width: children[0].region().width + children[2].region().width,
                height: children[0].region().height + children[1].region().height,
            },
        }
    }

    /// Get the original points in the given image, in the region of this quadtree.
    fn get_original_points(&self, image: &Image) -> Vec<Rgba> {
        let region = self.region();
        let mut points = Vec::with_capacity(region.width * region.height);
        for x in region.x..region.x + region.width {
            for y in region.y..region.y + region.height {
                points.push(image.get_pixel(x, y));
            }
        }
        points
    }

    /// Write the averaged points in the given image, in the region of this quadtree.
    fn get_averaged_points(&self, result: &mut Image) {
        match self {
            RegionQuadTree::Leaf(region, mean) => {
                for x in region.x..region.x + region.width {
                    for y in region.y..region.y + region.height {
                        result.set_index(x, y, *mean);
                    }
                }
            }
            RegionQuadTree::Branch(children) => {
                for child in children {
                    child.get_averaged_points(result);
                }
            }
        }
    }

    /// Get the mean squared error of the region of this quadtree.
    fn get_error(&self, image: &Image) -> f32 {
        match self {
            RegionQuadTree::Leaf(_, mean) => {
                let pixels = self.get_original_points(image);
                mean.mse(&pixels)
            }
            RegionQuadTree::Branch(children) => {
                let mut error = 0.0;
                for child in children {
                    error += child.get_error(image);
                }
                error
            }
        }
    }

    /// Subdivide the region of this quadtree into 4 smaller regions,
    /// if the error is above the given threshold and the region is
    /// greater than the given minimum length.
    fn subdivide(
        &self,
        image: &Image,
        error_threshold: f32,
        min_region_length: usize,
    ) -> Option<RegionQuadTree> {
        let region = self.region();
        if self.get_error(image) < error_threshold
            || region.height <= min_region_length
            || region.width <= min_region_length
        {
            return None;
        }
        match self {
            RegionQuadTree::Leaf(region, _) => {
                let half_width_l = (region.width as f64 / 2.0).floor() as usize;
                let half_width_r = (region.width as f64 / 2.0).ceil() as usize;
                let half_height_up = (region.height as f64 / 2.0).floor() as usize;
                let half_height_dwn = (region.height as f64 / 2.0).ceil() as usize;

                let children = [
                    Box::new(RegionQuadTree::leaf(
                        region.x,
                        region.y,
                        half_width_l,
                        half_height_up,
                        image,
                    )),
                    Box::new(RegionQuadTree::leaf(
                        region.x,
                        region.y + half_height_up,
                        half_width_l,
                        half_height_dwn,
                        image,
                    )),
                    Box::new(RegionQuadTree::leaf(
                        region.x + half_width_l,
                        region.y,
                        half_width_r,
                        half_height_up,
                        image,
                    )),
                    Box::new(RegionQuadTree::leaf(
                        region.x + half_width_l,
                        region.y + half_height_up,
                        half_width_r,
                        half_height_dwn,
                        image,
                    )),
                ];
                Some(RegionQuadTree::Branch(children))
            }
            RegionQuadTree::Branch(children) => {
                let sub_children: Vec<_> = children
                    .iter()
                    .map(|child| child.subdivide(image, error_threshold, min_region_length))
                    .zip(children)
                    .collect();

                if sub_children.iter().all(|c| c.0.is_none()) {
                    return None;
                }

                let children = sub_children
                    .into_iter()
                    .map(|(nc, oc)| Box::new(nc.unwrap_or(*oc.clone())))
                    .collect::<Vec<_>>()
                    .try_into()
                    .unwrap();
                Some(RegionQuadTree::Branch(children))
            }
        }
    }
}

/// Convenience struct to hold a quadtree and an image,
/// for JS interop.
#[wasm_bindgen]
pub struct RegionQuadTreeImage {
    quadtree: RegionQuadTree,
    image: Image,
}

#[wasm_bindgen]
impl RegionQuadTreeImage {
    pub fn new(image: Image) -> RegionQuadTreeImage {
        utils::set_panic_hook();
        let quadtree = RegionQuadTree::new(0, 0, image.width(), image.height());
        RegionQuadTreeImage { quadtree, image }
    }

    pub fn subdivide_until(&mut self, error_threshold: f32, min_region_length: usize) {
        loop {
            let new_quadtree =
                self.quadtree
                    .subdivide(&self.image, error_threshold, min_region_length);
            match new_quadtree {
                Some(qt) => self.quadtree = qt,
                None => break,
            }
        }
    }

    pub fn get_result_image(&self) -> Image {
        let mut result = Image::empty(self.image.width(), self.image.height());
        self.quadtree.get_averaged_points(&mut result);
        result
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn test_image_4x4() -> Image {
        let mut pixels = vec![];
        for i in 1..1 + 16 {
            pixels.push(Rgba {
                red: i * 5,
                green: i * 4,
                blue: i * 3,
                alpha: 255,
            });
        }

        Image::new(4, 4, pixels)
    }

    #[test]
    fn subdivide() {
        let mut tree = RegionQuadTreeImage::new(test_image_4x4());
        tree.subdivide_until(1.0, 1);
        let result = tree.get_result_image();
        assert_eq!(tree.image.width(), result.width());
        assert_eq!(tree.image.height(), result.height());
    }
}
