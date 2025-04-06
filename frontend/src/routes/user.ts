// src/routes/user.ts

import express, { Request, Response } from 'express';

const router = express.Router();

// Mock user data (replace with a database in a real application)
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
];

// User Listing (GET /users)
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// User Retrieval (GET /users/:id)
router.get('/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

export default router;