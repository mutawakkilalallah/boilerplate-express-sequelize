require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./src/router/index");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders:
      "x_total_data, x_page_limit, x_total_page, x_current_page, x-auth",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Api Started :)");
});

app.use("/api/v1", apiRouter);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `REST API started on port ${process.env.HOST}:${process.env.PORT}`
  );
});
