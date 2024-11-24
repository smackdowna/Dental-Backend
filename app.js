const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

//config
dotenv.config({ path: "./config/config.env" });


app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: [,"http://localhost:3000","http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

//Route imports
const user = require("./routes/UserRoute");
const book = require("./routes/bookingRoutes");


app.use("/api/v1", user);
app.use("/api/v1", book);

module.exports = app;

app.get("/", (req, res) => res.send(`<h1>Welcome To Dental Backend</h1>`));


//middleware
app.use(errorMiddleware);
