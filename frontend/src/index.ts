// src/index.ts

import express from 'express';
import userRoutes from './routes/user';

const app = express();
const port = 3000;

app.use(express.json()); // Add JSON parsing middleware

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});