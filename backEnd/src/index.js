import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import messageroutes from './routes/message.routes.js';

import authRoutes from './routes/auth.routes.js';
import connectDB from './lib/DB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageroutes);

app.get('/', (req, res) => res.send('Hello World!'));

// Connect DB ONCE
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});