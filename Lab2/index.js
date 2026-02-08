import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, 'public');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get("/", function (req, res) {
    res.send("Hello! Welcome to my application.");
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(publicPath, 'about.html'));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(publicPath, 'contact.html'));
});

app.get("/guestbook", function (req, res){
    res.send("<h1>Guestbook Messages</h1>");
});

// POST endpoint
app.post("/handleform", (req, res) => {
  console.log(req.body);

  const { username, email, newsletter } = req.body;

  const newsletterStatus =
    newsletter === "subscribe" ? "Subscribed" : "Unsubscribed";

  res
    .status(200)
    .send(`
      <!DOCTYPE html>
      <html>
        <body>
          <div class="card">
            <h1>Thank You, ${username}</h1>
            <p>Email: ${email}</p>
            <p>Newsletter:${newsletter}</p>
          </div>
        </body>
      </html>
    `);
});

app.use(function (req, res){
    res.status(404);
    res.send("Opps! We didn't find what you were looking for!");
});


app.listen(3000, function () {
    console.log("Server started on port 3000. CTRL^c to quit.");
});