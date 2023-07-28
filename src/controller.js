/**
 * Controller manages socket io events
 */
class Controller {
    constructor(model) {
        this.socket = io('ws://localhost:8080');
        let socket = this.socket;
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
        socket.on("test-event", () => {
            console.log("Testing server to client event");
        })
        
        socket.on("mouse", (data) => {
            sketch.collabDraw(data);
        })
    }
    sendMessage(msgName, msgBody) {
        let socket = this.socket;
        socket.emit(msgName, msgBody);
    }
}
