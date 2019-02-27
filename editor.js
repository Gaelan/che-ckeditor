/*eslint-disable no-unused-params */
const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;

const source = fs.readFileSync(process.argv[2]);

app.set("view engine", "ejs");
app.use('/ckeditor', express.static("node_modules/ckeditor"));
app.use(express.urlencoded())

app.get("/", (req, res) => {
  res.render("editor", { source });
});

app.post("/", (req, res) => {
    fs.writeFileSync(process.argv[2], req.body.source);
    res.send("<script>window.close()</script>")
    process.exit()
})

app.listen(port, () => console.log(`Click the link above to edit the file.`));
