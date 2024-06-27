const io = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log("User connected, id:", socket.id);

    socket.on("message", (message, roomName) => {
        console.log("message", message);
        if (roomName && roomName.length > 0) {
            console.log(`Message received from ${socket.id}: ${message} in room: ${roomName}`);
            io.to(roomName).emit("message", { message: message, id: socket.id });
        } else {
            console.log(`Message received from ${socket.id}: ${message}`);
            io.emit("message", { message: message, id: socket.id });
        }
    });

    socket.on("joinRoom", (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room: ${roomName}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

console.log("Server is running on port 3000");
