const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const port = 5000;
app.use(cors());

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const filePath = path.join(__dirname, "person.json");
app.get("/person", (req, res) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/add-persons", jsonParser, (req, res) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    const person = req.body;
    console.log("person,", person);
    data = JSON.parse(data);
    data.push(person);
    fs.writeFile(filePath, JSON.stringify(data), () => {});
    res.json(data);
  });
});

app.post("/update-persons", jsonParser, (req, res) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    const editingPerson = req.body;
    data = JSON.parse(data);
    data = data.map((item) => {
      if (item.id === editingPerson.id) {
        return editingPerson;
      }
      return item;
    });
    fs.writeFile(filePath, JSON.stringify(data), () => {});
    res.json(data);
  });
});

app.post("/delete-persons", jsonParser, (req, res) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    const deletedPersonId = req.body;
    data = JSON.parse(data);
    data = data.filter((item) => item.id !== deletedPersonId.id);
    fs.writeFile(filePath, JSON.stringify(data), () => {});
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
