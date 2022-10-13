import express from "express";
import * as http from 'http';
import { Server } from 'socket.io'
import fetch from 'node-fetch';

const app = express();
app.use(express.static('public'))

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {

    socket.on("join", function (data) {
        this.username = data;
        socket.broadcast.emit("join", data);
    });

    socket.on("message", function (data) {
        data.username = this.username;
        socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", function () {
        socket.broadcast.emit("left", this.username);
    });
})

server.listen(5000, () => {
    console.log("Server listening on port 5000!");
});