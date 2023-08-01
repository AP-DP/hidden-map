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
        this.pathColours = [];
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
                ( self.maskedBackground = self.backgroundImg.get() ).mask( self.maskingLayer.get() );
                // Display masked image
                p.image(self.maskedBackground, 0, 0, self.width, self.height);
                // Show other user paths
                for (let j = 0; j < self.otherPaths.length; j++) {
                    let rgb = self.pathColours[j];
                    p.fill(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.1)`)
                    p.noStroke();
                    let coordinate = self.otherPaths[j];
                    p.ellipse(coordinate[0], coordinate[1], 100, 100);
                }
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
    collabDraw() {
        let collaborators = this.model.getCollaborators();
        for (let i=0; i < collaborators.length; i++) {
            let id = collaborators[i];
            let pathData = this.model.getCollaboratorPath(id)
            let colour = pathData.colour;
            let coordinates = pathData.path;
            let coordinate = coordinates.slice(-1)[0];
            // Check if collaborator has already shared that location
            if (coordinate != undefined) {
                let hitMatch = false;
                let hitRange = 15;
                let index = 0;
                let maxIndex = this.otherPaths.length - 1;
                // Check for coordinate close enough to a recorded coordinate
                // and check for collaborator match based on colour
                while (!hitMatch && index <= maxIndex) {
                    let testCoordinate = this.otherPaths[index];
                    if (Math.abs(testCoordinate[0] - coordinate.x) < hitRange) {
                        if (Math.abs(testCoordinate[1] - coordinate.y) < hitRange) {
                            if (colour == this.pathColours[index]) {
                                hitMatch = true;
                            }
                        }
                    }
                    index++;
                }
                // If collaborator has not previously shared that location,
                // add to tracked collaborator paths
                if (!hitMatch) {
                    this.otherPaths.push([coordinate.x, coordinate.y]);
                    this.pathColours.push(colour);
                }
            }
        }
    }
    /**
     * Update local variables from model
     */
    update() {
        console.log("Updating");
        this.collabDraw()
    }
}
