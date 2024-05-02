const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const ip = req.connection.remoteAddress;
    const log = `${Date.now()} New req received from ${ip}\n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
    res.end("hello from Server");
});

myServer.listen(8000, () => console.log("Server started"));
