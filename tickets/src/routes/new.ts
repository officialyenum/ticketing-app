import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, currentUser } from '@yetix/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
    '/api/tickets',
    requireAuth, 
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0})
            .withMessage('Price must be greater than 0')
    ], 
    validateRequest,
    async (req:Request, res:Response) => {
        const { title, price } = req.body;
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id,
        })
        await ticket.save();
        return res.status(201).json(ticket);
});

export { router as createTicketRouter };