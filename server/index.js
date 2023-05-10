const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const processData = require("./processData");
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/static", express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

app.post("/api/data", (req, res) => {
  try {
    const csvContent = req.body.fileContent;
    const result = processData(csvContent);

    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3001, () => {
  console.log("listening port 3001");
});
