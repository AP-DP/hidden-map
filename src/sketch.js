/**
 * Class containing p5 structure
 */
class HiddenMap {
    /**
     * Pass <div> id as container
     */
    constructor(container) {
        // View variables
        this.backgroundImg;
        this.maskingLayer;
        this.maskedBackground;
        this.width = 800;
        this.height = 400;
        // Data variables
        this.trailPath = [];
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
                // Copy bg image and apply mask
                ( this.maskedBackground = self.backgroundImg.get() ).mask( self.maskingLayer.get() );
                // Display masked image
                p.image(this.maskedBackground, 0, 0, self.width, self.height);
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
}
