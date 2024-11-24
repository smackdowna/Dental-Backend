const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");


app.get("/", (req, res) => {
  res.send("Welcome To dental Webiste Backend");
});

//handling uncaught
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "./config/config.env" });

connectDB();


const server = app.listen(process.env.PORT, '0.0.0.0',() => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});



//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting Down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
