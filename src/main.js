/**
 * Instantiate classes using p5 here
 */

let model = new Model();
let controller = new Controller(model);

let sketch = new HiddenMap("main-canvas", model, controller);
sketch.draw();

model.addListener(sketch);