const express = require("express");
const cors = require("cors");
const documents = require("./routes/documents.js");

const app = express();

app.use(cors({
    origin: '*'
}));

app.use("/documents", documents);

app.listen(3001, function () {
    console.log("Listening on port " + 3001);
})

module.exports = app;
