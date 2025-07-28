
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');
const walletRoutes = require('./routes/walletRoutes');
const playerRoutes=require('./routes/playerRoutes');
const setupSocket = require('./sockets/gameSocket');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'))

app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next();
  }
  express.json()(req, res, next);
});

// app.use(express.json());
app.use('/api', gameRoutes);
app.use('/api', walletRoutes);
app.use('/api',playerRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(err);
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

setupSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
