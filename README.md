# Quadtree Browser Demo in Rust/WebAssembly

Two example implementations of quadtrees in Rust.

Two demos of applying quadtrees to image representation, running in your browser:

<https://kurtschelfthout.github.io/quadtrees/>

## Development notes

### WebAssembly/Rust links

- <https://rustwasm.github.io/docs/book/introduction.html>
- <https://rustwasm.github.io/wasm-bindgen/introduction.html>

### Local development

Provided you've got everything setup as in the links above:

```sh
cd www/
wasm-pack build
npm install
npm run start
```

Should give you a locally running dev server and open your browser with the webpage showing in it.

### Notes

- I've had a hard time getting `npm` to pick up the latest built version of the wasm. The way I understand it should work is that `wasm-pack` builds the wasm module and other paraphernalia to `./pkg`. `www/package.json` has a line `"quadtree": "file:../pkg"` so that `npm run build` and friends pick up the latest version from `./pkg` and copy it to `www/node_modules`. However, that step does not seem to be working. I've resorted to just writing a little script that removes `www/node_modules/quadtree`, and wasm and npm builds manually.
- To publish to GitHub pages, commit the updated `www/dist` directory to the `gh-pages` branch. The Jekyll processing is turned off so it'll go live pretty quickly.
