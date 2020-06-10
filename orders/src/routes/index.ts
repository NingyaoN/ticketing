import express, { Request, Response } from 'express';
import { requireAuth } from '@nntickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket'); //find the order and ticket associated with it.

  res.send(orders);
});

export { router as indexOrderRouter };
