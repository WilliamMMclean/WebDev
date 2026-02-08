import http from "http";

http
  .createServer(function (req, res) {
    // Tell the browser: this response contains HTML
    res.writeHead(200, { "Content-Type": "text/html" });

    // Send HTML AS STRINGS
    res.write("<h1>Welcome to my application</h1>");
    res.write("<div>This response is sent using Node.js</div>");
    res.end("<div>Have a nice day!</div>");
  })
  .listen(3000);

console.log("Server started on port 3000, ctrl^c to quit.");


