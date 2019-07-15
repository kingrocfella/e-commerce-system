const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
router(app);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});