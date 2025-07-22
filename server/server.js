// index.js or index.mjs
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectedDb } from './config/db.js';
import userRouter from './routes/userRoute.js';
import ownerRouter from './routes/ownerRoute.js';
import bookingRouter from './routes/BookingRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express using ES Modules!');
});
connectedDb()

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/booking',bookingRouter)
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
