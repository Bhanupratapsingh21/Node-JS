const fs = require("fs");

function logreqres(req, res, next) {
    const ip = req.ip; // Access client's IP address from req object
    const date = new Date();
    const log = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} :${date.getTime()} New req received from ${ip}\n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
        next(); // Call next middleware or route handler
    });
}

module.exports = logreqres;
