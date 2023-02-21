use wasm_bindgen::prelude::wasm_bindgen;

use crate::image::{Image, Rgba};

/// A coordinate in the image.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Coordinate {
    x: usize,
    y: usize,
}

/// A node in the quad tree. Describes the region
/// it is applicable to by top_left and bottom_right
/// coordinates, both inclusive.
/// Describes the color of its region in data.
#[derive(Debug, Clone)]
pub struct QuadTreeNode {
    top_left: Coordinate,
    bottom_right: Coordinate,
    data: Rgba,
}

/// A complete quad tree is stored in a vector.
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct QuadTree {
    nodes: Vec<QuadTreeNode>,
}

impl QuadTreeNode {
    fn empty() -> QuadTreeNode {
        QuadTreeNode {
            top_left: Coordinate { x: 0, y: 0 },
            bottom_right: Coordinate { x: 0, y: 0 },
            data: Rgba::new(),
        }
    }

    /// A node consisting of a single pixel.
    fn pixel(image: &Image, x: usize, y: usize) -> QuadTreeNode {
        QuadTreeNode {
            top_left: Coordinate { x, y },
            bottom_right: Coordinate { x, y },
            data: image.get_pixel(x, y),
        }
    }
}

impl QuadTree {
    /// Given the size of the image, returns the capacity of the vec necessary
    /// to store the nodes.
    fn get_tree_size(image_size: usize) -> (usize, usize) {
        let mut level_size = 1;
        let mut total_size = 1;
        while level_size < image_size {
            level_size *= 4;
            total_size += level_size;
        }
        (total_size, level_size)
    }
}

/// Public methods, exported to JavaScript.
#[wasm_bindgen]
impl QuadTree {
    /// Create a new complete quad tree from an image. Leaf nodes contain a single
    /// pixel each.
    pub fn new(image: &Image) -> QuadTree {
        let image_size = image.get_size();
        let (tree_size, last_level_size) = QuadTree::get_tree_size(image_size);
        let mut tree_vec = Vec::with_capacity(tree_size);
        tree_vec.resize(tree_size, QuadTreeNode::empty());

        // fill the leaf nodes in the back of the array. Order is z-order.
        let mut count = 0;
        for i in (0..image.width() - 1).step_by(2).rev() {
            for j in (0..image.height() - 1).step_by(2).rev() {
                let branch_index = tree_size - count;
                tree_vec[branch_index - 4] = QuadTreeNode::pixel(image, i, j);
                tree_vec[branch_index - 3] = QuadTreeNode::pixel(image, i, j + 1);
                tree_vec[branch_index - 2] = QuadTreeNode::pixel(image, i + 1, j);
                tree_vec[branch_index - 1] = QuadTreeNode::pixel(image, i + 1, j + 1);
                count += 4;
            }
        }

        // fill the branch nodes back to front.
        for i in (0..tree_size - last_level_size).rev() {
            let chunk: Vec<_> = tree_vec[4 * i + 1..=4 * i + 4]
                .iter()
                .map(|n| n.data)
                .collect();
            let s = Rgba::mean(&chunk);
            tree_vec[i] = QuadTreeNode {
                top_left: tree_vec[4 * i + 1].top_left,
                bottom_right: tree_vec[4 * i + 4].bottom_right,
                data: s,
            };
        }

        QuadTree { nodes: tree_vec }
    }

    /// Return a new "pixelated" image, constructed from the regions at the
    /// given level in the tree.
    pub fn image_at_level(&self, level: u32) -> Image {
        let width = self.nodes[0].bottom_right.x - self.nodes[0].top_left.x + 1;
        let height = self.nodes[0].bottom_right.y - self.nodes[0].top_left.y + 1;
        let mut image = Image::empty(width, height);

        let mut index = 0;
        let mut level_size = 1;
        for _ in 0..level {
            index += level_size;
            level_size *= 4;
        }

        for i in index..index + level_size {
            let node = &self.nodes[i];
            for x in node.top_left.x..=node.bottom_right.x {
                for y in node.top_left.y..=node.bottom_right.y {
                    image.set_index(x, y, node.data);
                }
            }
        }

        image
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tree_size() {
        assert_eq!(QuadTree::get_tree_size(1), (1, 1));
        assert_eq!(QuadTree::get_tree_size(4), (5, 4));
        assert_eq!(QuadTree::get_tree_size(9), (21, 16));
        assert_eq!(QuadTree::get_tree_size(16), (21, 16));
    }

    fn test_image_4x4() -> Image {
        let mut pixels = vec![];
        for i in 1..1 + 16 {
            pixels.push(Rgba {
                red: i,
                green: i,
                blue: i,
                alpha: i,
            });
        }

        Image::new(4, 4, pixels)
    }

    #[test]
    fn tree_construction_4by4() {
        let image = test_image_4x4();
        let tree = QuadTree::new(&image);

        assert_eq!(tree.nodes.len(), 21);

        for i in 0..21 {
            assert_ne!(tree.nodes[i].data.red, 0);
            assert_ne!(tree.nodes[i].data.green, 0);
            assert_ne!(tree.nodes[i].data.blue, 0);
        }
        assert_eq!(tree.nodes[0].top_left, Coordinate { x: 0, y: 0 });
        assert_eq!(tree.nodes[0].bottom_right, Coordinate { x: 3, y: 3 });
        assert_eq!(tree.nodes[1].top_left, Coordinate { x: 0, y: 0 });
        assert_eq!(tree.nodes[1].bottom_right, Coordinate { x: 1, y: 1 });
        assert_eq!(tree.nodes[4].top_left, Coordinate { x: 2, y: 2 });
        assert_eq!(tree.nodes[4].bottom_right, Coordinate { x: 3, y: 3 });
    }

    #[test]
    fn level_image() {
        let image = test_image_4x4();
        let tree = QuadTree::new(&image);

        let level_image = tree.image_at_level(0);
        assert_eq!(level_image.width(), 4);
        assert_eq!(level_image.height(), 4);
        for x in 0..4 {
            for y in 0..4 {
                assert_eq!(
                    level_image.get_pixel(x, y),
                    Rgba {
                        red: 8,
                        green: 8,
                        blue: 8,
                        alpha: 8
                    }
                );
            }
        }

        let level_image = tree.image_at_level(1);
        for x in 0..2 {
            for y in 0..2 {
                assert_eq!(
                    level_image.get_pixel(x, y),
                    Rgba {
                        red: 3,
                        green: 3,
                        blue: 3,
                        alpha: 3
                    }
                );
            }
            for y in 2..4 {
                assert_eq!(
                    level_image.get_pixel(x, y),
                    Rgba {
                        red: 11,
                        green: 11,
                        blue: 11,
                        alpha: 11
                    }
                );
            }
        }
        for x in 2..4 {
            for y in 0..2 {
                assert_eq!(
                    level_image.get_pixel(x, y),
                    Rgba {
                        red: 5,
                        green: 5,
                        blue: 5,
                        alpha: 5
                    }
                );
            }
            for y in 2..4 {
                assert_eq!(
                    level_image.get_pixel(x, y),
                    Rgba {
                        red: 13,
                        green: 13,
                        blue: 13,
                        alpha: 13
                    }
                );
            }
        }
    }

    #[test]
    fn roundtrip() {
        let image = test_image_4x4();
        let tree = QuadTree::new(&image);
        let image2 = tree.image_at_level(2);
        let tree2 = QuadTree::new(&image2);

        assert_eq!(tree.nodes.len(), tree2.nodes.len());
        for node in tree.nodes.iter().zip(tree2.nodes.iter()) {
            assert_eq!(node.0.data, node.1.data);
        }
    }
}
