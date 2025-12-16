import { Server } from "socket.io";

const io = new Server(server);

const combatLog = [];

io.on("connection", (socket) => {
    console.log("A socket connected", socket.id);

    socket.emit("combat-log-history", combatLog);

    socket.on("combat-event", (event) => {
        
        const logEntry = {
            ...event,
            timestamp: new Date().toISOString(),
        };

        combatLog.push(logEntry);

        
        io.emit("new-combat-log", logEntry);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
    });
});
