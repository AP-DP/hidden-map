/**
 * Controller manages socket io events
 */
class Controller {
    constructor(model) {
        this.socket = io('ws://localhost:8080');
        let socket = this.socket;
        // If this is the new user, register in the model
        // Else register that there is a new collaborator
        socket.on("new-user", (id) => {
            let user = model.getUser();
            console.log("Current user: " + user);
            if (user == "") {
                console.log("setting user");
                model.setUser(id);
            }
            else {
                console.log("adding collaborator");
                model.addCollaborator(id);
            }
        })
        // Remove collaborator when they disconnect
        socket.on("disconnected", (id) => {
            // Update model
            model.removeCollaborator(id);
        })
        // Update model when mouse data is received from a collaborator
        socket.on("mouse", (data) => {
            // Update model
            model.updateCollaboratorPath(data.id, data.value);
        })
    }
    sendMessage(msgName, msgBody) {
        let socket = this.socket;
        socket.emit(msgName, {id: socket.id, value: msgBody});
    }
}
