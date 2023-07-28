/**
 * Class containing p5 structure
 */
class HiddenMap {
    /**
     * Pass <div> id as container
     */
    constructor(container, model, controller) {
        // MVC variables
        this.model = model;
        this.controller = controller;
        // View variables
        this.backgroundImg;
        this.maskingLayer;
        this.maskedBackground;
        this.width = 800;
        this.height = 400;
        // Data variables
        this.trailPath = [];
        this.otherPaths = [];
        this.lastCoordinate = 0;
        // Draw
        let self = this;
        // P5 function
        this.sketch = function(p) {
            // Load image in preload
            p.preload = function() {
                self.backgroundImg = p.loadImage('custom-image.jpg');
            }
            // Create canvas before drawing
            p.setup = function() {
                // Create base canvas
                let canvas = p.createCanvas(self.width, self.height);
                canvas.parent(container);
                // Create masking layer
                self.maskingLayer = p.createGraphics(self.width, self.height);
            }
            // p5 draw called on a loop
            p.draw = function() {
                // Record mouse coordinates
                self.trailPath.push([p.mouseX, p.mouseY]);
                // Reveal areas where the mouse goes
                // White background for areas not explored
                p.background(255);
                // Add new mouse-located ellipse to masking layer
                self.maskingLayer.fill('rgba(0, 0, 0, 1)');
                self.maskingLayer.ellipse(p.mouseX, p.mouseY, 80, 80);
                for (let i = self.lastCoordinate; i < self.otherPaths.length; i++) {
                    let coordinate = self.otherPaths[i];
                    self.maskingLayer.ellipse(coordinate[0], coordinate[1], 80, 80);
                    self.lastCoordinate += 1;
                }
                // Copy bg image and apply mask
                ( this.maskedBackground = self.backgroundImg.get() ).mask( self.maskingLayer.get() );
                // Display masked image
                p.image(this.maskedBackground, 0, 0, self.width, self.height);
            }

            p.mouseDragged = function() {
                let mouseX = p.mouseX;
                let mouseY = p.mouseY;
                //***************/
                controller.sendMessage('mouse', {x: mouseX, y: mouseY});
                //***************/
            }
        }
    }
    /**
     * Initiate p5 draw loop
     */
    draw() {
        new p5(this.sketch);
    }
    /**
     * Get trail path
     */
    getTrailCoordinates() {
        return this.trailPath;
    }
    /**
     * Add other user draw path
     */
    collabDraw(data) {
        this.otherPaths.push([data.x, data.y]);
    }
    /**
     * Update local variables from model
     */
    update() {
        console.log("Updating");
    }
}
