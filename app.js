import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/price", async (req, res) => {
  const { crypto, currency } = req.body;
  const symbol = `${crypto}-${currency}`;

  try {
    const response = await axios.get(
      `https://api.blockchain.com/v3/exchange/tickers/${symbol}`
    );

    res.render("result", { data: response.data, symbol });
  } catch (error) {
    res.render("error", { symbol });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});