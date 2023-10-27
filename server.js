const app = require("./app");

const port = process.env.port || 3003;

app.get("/", (req, res) => {
  res.send("Welcome to Coin Saver");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
