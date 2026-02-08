import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function serveStaticFile(res, filePath, contentType, responseCode = 200) {
  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/javascript" });
      res.end("500 - Internal Error");
    } else {
      res.writeHead(responseCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  let requestPath = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();

  switch (requestPath) {
    case "":
      serveStaticFile(res, "/public/home.html", "text/html");
      break;

    case "/about":
      serveStaticFile(res, "/public/about.html", "text/html");
      break;

    case "/guestbook":
      serveStaticFile(res, "/public/guestbook.html", "text/html");
      break;

    case "/img/logo.jpg":
    serveStaticFile(res, "/public/img/logo.jpg", "image/jpeg");
    break;

    default:
      serveStaticFile(res, "/public/404.html", "text/html", 404);
      break;
  }
});

server.listen(3000);
console.log("Server started on localhost:3000; press Ctrl-C to terminate....");
