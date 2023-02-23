// const { sequelize } = require('./models')
// sequelize.sync({ force: true })

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const authRoute = require("./routes/authe-route");
const paymentRoute = require("./routes/payment-route");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/payment", paymentRoute);

app.use("/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
