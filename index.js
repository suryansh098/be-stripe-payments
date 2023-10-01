const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { paymentRouter } = require("./routers/payment-router");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
