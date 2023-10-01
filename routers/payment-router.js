const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentRouter = express.Router();

/**
 * Sends the publishable key
 * @returns stripe publishable key
 */
paymentRouter.get("/config", async (req, res) => {
  res.status(200).json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

/**
 * Creates a payment intent
 * @requires amount - total amount of order
 * @returns client secret created by payment intent
 */
paymentRouter.post("/intent", async (req, res) => {
  console.log("[REQUEST]: ", req);

  let { amount } = req.body;
  amount = (amount * 100).toFixed(0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Order payment",
      automatic_payment_methods: { enabled: true },
    });

    res.status(201).json({
      message: "Payment intent created!",
      data: { clientSecret: paymentIntent.client_secret },
    });
  } catch (error) {
    console.log("[ERROR]: ", error);
    res.status(400).json({
      message: "Payment Failed!",
      data: { error: error.message },
    });
  }
});

exports.paymentRouter = paymentRouter;
