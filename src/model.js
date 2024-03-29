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
    notifyListeners() {
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
    removeCollaborator(id) {
        // Copy array without target user
        const index = (this.collaborators).indexOf(id);
        let newCollaboratorList = this.collaborators;
        if (index > -1) {
            let firstHalf = (this.collaborators).slice(0, index);
            let secondHalf = (this.collaborators).slice(index + 1);
            newCollaboratorList = firstHalf.concat(secondHalf);
        }
        // Copy path object without target user's path data
        let collaboratorPaths = this.collaboratorPaths;
        let userkeys = Object.keys(collaboratorPaths);
        let remainingUserKeys = userkeys.filter((userID) => {
            return userID !== id;
        });
        let remainingUserPaths = {};
        for (let i=0; i < remainingUserKeys.length; i++) {
            let key = remainingUserKeys[i];
            let value = collaboratorPaths[key];
            remainingUserPaths[key] = value;
        }
        // Assign variables to new data
        this.collaborators = newCollaboratorList;
        this.collaboratorPaths = remainingUserPaths;
    }
    /**
     * Add newest mouse movements to collaborator paths
     * @param {String} username 
     * @param {Array} pathCoordinates 
     */
    updateCollaboratorPath(username, pathCoordinates) {
        (this.collaboratorPaths[username].path).push(pathCoordinates);
        this.notifyListeners();
    }
    /**
     * Get list of collaborator ids
     */
    getCollaborators() {
        return this.collaborators;
    }
    /**
     * Get colour and coordinates associated with other user paths
     * @param {String} id 
     * @returns Object containing path data
     */
    getCollaboratorPath(id) {
        // {colour: [r, g, b], path: [{x: coordinate, y: coordinate}]}
        return this.collaboratorPaths[id];
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
