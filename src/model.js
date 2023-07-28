/**
 * Model maintains mouse tracking data
 */
class Model {
    constructor() {
        // Views dependent on model
        this.listeners = [];
        // Local user variables
        this.user = "";
        this.userPath = [];
        // Other user variables
        this.collaborators = [];
        this.collaboratorPaths = {};    // Paths stored with username as key
        this.collaboratorColours = [
            [34, 113, 178], // honolulu blue
            [61, 183, 233], // summer sky
            [247, 72, 165], // barbie pink
            [53, 155, 115], // ocean green
            [213, 94, 0], // bamboo
            [230, 159, 0], // gamboge
            [240, 228, 66], // paris daisy
            [0, 0, 0] // black
        ];
        this.nextColourIndex = 0;
    }
    /*************************/
    // Admin functions
    /*************************/
    /**
     * Add listener
     */
    addListener(view) {
        this.listeners.push(view);
    }
    /**
     * Notify listeners about change
     */
    notifyListener() {
        for (let i = 0; i < this.listeners.length; i++) {
            let listener = this.listeners[i];
            listener.update();
        }
    }
    /*************************/
    // Local user functions
    /*************************/
    /**
     * Set user name
     * @param {String} username 
     */
    setUser(username) {
        this.user = username;
        console.log("this user is " + username);
    }
    /**
     * Set local user path data
     * @param {Array} path 
     */
    setUserPath(path) {
        this.userPath = path;
    }
    /**
     * Update local user path data
     * @param {Array} coordinateArray 
     */
    updateUserPath(coordinateArray) {
        this.userPath.push(coordinateArray);
    }
    /**
     * Retrieve local user name
     */
    getUser() {
        return this.user;
    }
    /**
     * Allow view to retrieve local path data
     */
    getUserPath() {
        return this.userPath;
    }
    /*************************/
    // Other user functions
    /*************************/
    /**
     * Track new users
     * @param {String} newUser 
     */
    addCollaborator(newUser) {
        this.collaborators.push(newUser);
        let pathColour = this.getNextColour();
        this.collaboratorPaths[newUser] = {colour: pathColour, path: []};
        console.log(this.collaboratorPaths);
    }
    /**
     * Add newest mouse movements to collaborator paths
     * @param {String} username 
     * @param {Array} pathCoordinates 
     */
    updateCollaboratorPath(username, pathCoordinates) {
        (this.collaboratorPaths[username].path).push(pathCoordinates);
    }
    /**
     * Generates a new colour to assign to a collaborator
     */
    getNextColour() {
        let nextColour = this.collaboratorColours[this.nextColourIndex];
        this.nextColourIndex ++;
        return nextColour;
    }
}
