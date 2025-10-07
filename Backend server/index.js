let express = require('express');
require('dotenv').config();
const Connection = require('./config/dbConfig');
let router = require('./Router/index');
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

Connection();
app.use(router);
let http = require('http');
const { init: initSocket } = require('./socket_server');
let server = http.createServer(app);
const io = initSocket(server);
io.on('connection', socket => {
  console.log('✅ User connected:', socket.id);

  socket.on('joinUser', () => {
    const roomId = socket.id;
    socket.join(roomId);
    console.log(`👤 User joined room ${roomId}`);
  });

  socket.on('joinCart', ({ cartId }) => {
    socket.join(cartId);
    console.log(`🛒 User joined cart room: ${cartId}`);
  });

  socket.on('joinProduct', ({ productId }) => {
    socket.join(productId);
    console.log(`👤 User joined product room ${productId}`);
  });

  socket.on('joinAdmin', () => {
    socket.join('adminRoom');
    console.log(`👑 Admin joined adminRoom`);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });

  socket.on('searchProducts', async ({ query }) => {
    try {
      const { searchProducts } = require('./AllHandler/searchHandler');

      const req = { query: { query } };
      const res = {
        status: code => ({
          json: data => socket.emit('searchResults', data),
        }),
      };
      const next = err => {
        if (err) {
          console.error('Search error:', err);
          socket.emit('searchError', { msg: err.message });
        }
      };

      await searchProducts(req, res, next);
    } catch (error) {
      console.error('Socket search error:', error);
      socket.emit('searchError', { msg: 'Something went wrong' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World !');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
module.exports = { app, server };
