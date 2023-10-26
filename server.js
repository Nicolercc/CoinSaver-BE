//importing app.js -> contains  Express.js application, containing all the routes, middleware, and  configurations
const app = require("./app");

//setting a port var that will be used as the port of the app
const port = process.env.port || 3003;

//base url -
app.get("/", (req, res) => {
  res.send("Welcome to Coin Saver");
});

//starts the app on specified port
app.listen(port, () => {
  //this function will be executed once the port starts
  console.log(`listening on port ${port}`);
});
