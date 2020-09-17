const express = require('express')
const di_wrapp = express()
const http = require('http')
const server = http.createServer(di_wrapp)
const io = require('socket.io')(server)
const fs = require('fs');

const PORT = process.env.PORT || 1000

io.on("connection", (socket) => {
    console.log('A new user has been connected')

    socket.on("incoming data", (data) => {
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
        socket.broadcast.emit("outgoing data", { num: data });
    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));

})

di_wrapp.get('/image', (req, res) => {
    var file = './server/public/background.jpg'
    // convert binary data to base64 encoded string
    base64str = new Buffer(fs.readFileSync(file)).toString('base64');
    socket.emit("image", base64str)
})


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
