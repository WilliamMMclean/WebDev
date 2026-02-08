import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mustacheExpress from "mustache-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: false }));

// Serve static files from ./public
app.use(express.static(path.join(__dirname, "./public")));

// Mustache template engine setup
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");

// Routes
app.get("/serverForm", (req, res) => {
  // Renders the form using a Mustache template
  res.render("form", {
    title: "Input from form",
    name: "",
    surname: "",
  });
});

app.post("/processForm1a", (req, res) => {
  // Send an HTML response directly
  res.send(
    `<html>
      <body>
        <h1>Form submitted</h1>
         <p> Name: ${req.body.firstName} </p>
         <p> Surname: ${req.body.surname} </p> 
       </body>
    </html>`
  );
});

app.post("/processForm1b", (req, res) => {
  // Uses a Mustache template to render the response
  res.render("formResults", {
    title: "Input from form",
    name: req.body.firstName,
    surname: req.body.surname,
  });
});

app.post("/processForm1c", (req, res) => {
  // Uses the same Mustache template to render the form and the response
  res.render("form", {
    title: "Input from form",
    name: req.body.firstName,
    surname: req.body.surname,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
