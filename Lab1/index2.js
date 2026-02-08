
import http from "http";

const server = http.createServer((req, res) => {
  // normalize url by removing querystring, optional trailing slash, and making it lowercase
  let path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();

  switch (path) {
    case "":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Welcome to my application</h1>");
      res.end("Homepage");
      break;

    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>This is the about page</h1>");
      res.end("About");
      break;
    
    case "/guestbook":
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<h1>Guests</h1>");
        res.write("<p>Billy</p>")
        res.write("<p>Billy</p>")
        res.write("<p>Billy</p>")
        res.end("guestbook")
        break;
        

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Not Found");
      break;
  }
});

server.listen(3000);

console.log("Server started on localhost:8000; press Ctrl-C to terminate....");
