const io = require("socket.io")(8900,{
    cors: {
        origin: ["http://localhost:3000","http://localhost:1200"]
    }
});

io.on("connection", (socket)=>{ 
    console.log("An user has connected")

    io.emit("welcome", "Welcome friend socketIo")

})
