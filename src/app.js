// const { Movie } = require('./models');
// Movie.sync({ alter: true });

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const authAdminRoute = require('./routes/auth-admin-route');
const authRoute = require('./routes/auth-route');
const adminRoute = require('./routes/admin-route');
const movieRoute = require('./routes/movie-route');
const packageRoute = require('./routes/package-route');
const profileRoute = require('./routes/profile-route');
const paymentRoute = require('./routes/payment-route');
const transactionRoute = require('./routes/transaction-route');
const watchlistRoute = require('./routes/watchlist-route');
const authenticateAdmin = require('./middlewares/authenticate-admin');
const authenticateMiddleware = require('./middlewares/authenticate');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(morgan('dev'));

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());

// app.use(express.static('../private/videos'));
app.get('/test/:videoId', (req, res) => {
  const path = `private/videos/${req.params.videoId}.mp4`;
  console.log(path, req.params, 'test');
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  fs.createReadStream(path).pipe(res);
});
app.use('/payment', authenticateMiddleware, paymentRoute);
app.use('/auth', authRoute);
app.use('/auth-admin', authAdminRoute);
app.use('/profile', authenticateMiddleware, profileRoute);
app.use('/package', authenticateMiddleware, packageRoute);
app.use('/transaction', authenticateMiddleware, transactionRoute);
app.use('/movie', authenticateMiddleware, movieRoute);
app.use('/watchlist', authenticateMiddleware, watchlistRoute);
app.use('/admin', authenticateAdmin, adminRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
