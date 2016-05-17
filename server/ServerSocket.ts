import io = require('socket.io');

module Core {
    export class ServerSocket {
        private WebServer;
        private Database;
        private serverSocket;

        private DrawingSessions = {};
        private UserSessions = {};

        public constructor(WebServer) {
            this.WebServer = WebServer;
        }

        public Initialize() {
            this.serverSocket = io(this.WebServer.HTTPServer);
            this.serverSocket.on('connection', (socket) => this.onSocketConnection.call(this, socket));
        }

        private onSocketConnection(socket) {
            console.log("wooo");
            socket.on('login', (data) => this.onLogin.call(this, socket, data));
            socket.on('save', (data) => this.onSave.call(this, socket, data));
            socket.on('update', (data) => this.onUpdate.call(this, socket, data));
            socket.on('disconnect', () => this.onDisconnect.call(this, socket));
        }

        private onLogin(socket, loginData: {drawingId: string, username: string}) {
            console.log("new user");
            console.log(socket);
            var self = this;

            var userSession = this.UserSessions[socket.id] = {
                username: loginData.username,
                drawingSessions: [],
                socket: socket
            };

            var drawing = this.DrawingSessions[loginData.drawingId];

            if (!drawing) {
                this.Database.Models.Drawing.findOne({
                    'id': loginData.drawingId
                }, function (err, drawing) {

                    if (err || !drawing) {
                        return;
                    }

                    drawing = self.DrawingSessions[loginData.drawingId] = {
                        drawingId: loginData.drawingId,
                        drawingSessions: [],
                        dataURL: drawing.dataURL
                    };

                    drawing.drawingSessions.push(userSession);
                    userSession.drawingSessions.push(drawing);
                });
            } else {
                drawing.drawingSessions.push(userSession);
                userSession.drawingSessions.push(drawing);

                socket.emit("update", {
                    drawingId: drawing.drawingId,
                    dataURL: drawing.dataURL
                });
            }
        }

        private onSave(socket, save : {drawingId: string, dataURL: string}) {
            this.saveDrawing(save.drawingId, save.dataURL);
        }

        private onUpdate(socket, data : {drawingId: string, dataURL: string}) {
            var drawing = this.DrawingSessions[data.drawingId];

            if (!drawing)
                return;

            drawing.dataURL = data.dataURL;

            drawing.drawingSessions.forEach(function(user) {
                user.socket.emit("update", {
                    drawingId: data.drawingId,
                    dataURL: data.dataURL
                });
            });
        }


        private onDisconnect(socket) {
            var self = this,
                user = this.UserSessions[socket.id],
                drawingSessions = this.DrawingSessions;

            if (!user)
                return;

            user.drawingSessions.forEach(function (drawingSession) {
                var i = drawingSession.drawingSessions.indexOf(user);

                // remove user from all drawing session he was partecipating
                if (i > -1)
                    drawingSession.drawingSessions.splice(i, 1);

                // no more user in this drawing session, free space
                // need to save the drawing
                if (drawingSession.drawingSessions.length == 0) {
                    self.saveDrawing(drawingSession.drawingId, drawingSession.dataURL);
                    delete drawingSessions[drawingSession.drawingId];
                }

            });

            delete this.UserSessions[socket.id];
        }

        private saveDrawing(drawingId, dataURL) {
            this.Database.Models.Drawing.findOne({
                'id': drawingId
            }, function (err, drawing) {

                if (err || !drawing) {
                    return;
                }

                drawing.dataURL = dataURL;
                drawing.save();
            });
        }
    }
}

export = Core.ServerSocket;
