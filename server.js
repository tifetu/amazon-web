const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "wellcom to my server",
  });
});

app.post(`/payment/create`, async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
    });
    // console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).json({
      message: "total must be greater than 0",
    });
  }
});
PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("error in server", err.message);
  } else {
    console.log(`server is running on port:http://localhost:${PORT}`);
  }
});
