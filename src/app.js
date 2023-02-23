// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const authRoute = require('./routes/auth-route');
const packageRoute = require('./routes/package-route');
const profileRoute = require('./routes/profile-route');
const transactionRoute = require('./routes/transaction-route');
const watchlistRoute = require('./routes/watchlist-route');
const authenticateMiddleware = require('./middlewares/authenticate');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(morgan('dev'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/profile', authenticateMiddleware, profileRoute);
app.use('/package', authenticateMiddleware, packageRoute);
app.use('/transaction', authenticateMiddleware, transactionRoute);
app.use('/watchlist', authenticateMiddleware, watchlistRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
