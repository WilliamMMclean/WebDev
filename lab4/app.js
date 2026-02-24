import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Datastore from "nedb-promises";
import mustacheExpress from "mustache-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// parse form data (req.body)
app.use(express.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// mustache setup
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// bootstrap local CSS route (after you install bootstrap)
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);

// ✅ NeDB embedded DB (persists to file)
const db = Datastore.create({
  filename: "./database/emp.db",
  autoload: true,
});

console.log("db created");

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Add employee
app.post("/add", async (req, res) => {
  try {
    const doc = await db.insert({ name: req.body.name });
    console.log("Document inserted:", doc);
    res.send("<a href='/'>Back to Home</a>");
  } catch (err) {
    console.error("Error inserting:", err);
    res.sendStatus(500);
  }
});

// Show all employees
app.post("/showall", async (req, res) => {
  try {
    const docs = await db.find({});
    console.log("Documents retrieved:", docs);

    // render nicely using mustache template
    res.render("employeeData", { employee: docs });
  } catch (err) {
    console.error("Error retrieving:", err);
    res.sendStatus(500);
  }
});

// Show Fred Smith
app.post("/showFred", async (req, res) => {
  try {
    const docs = await db.find({ name: "Fred Smith" });
    console.log("Documents retrieved:", docs);
    res.render("employeeData", { employee: docs });
  } catch (err) {
    console.error("Error retrieving:", err);
    res.sendStatus(500);
  }
});

// Delete by name
app.post("/delete", async (req, res) => {
  try {
    const { name } = req.body;
    const numRemoved = await db.remove({ name }, { multi: true });
    console.log("Removed documents:", numRemoved);
    res.send("<a href='/'>Back to Home</a>");
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
