import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, BadRequestError, NotAuthorizedError } from '@yetix/common';
import { Ticket } from '../models/ticket';
import mongoose from 'mongoose';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, 
        [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
                .isFloat({ gt: 0})
                .withMessage('Price must be greater than 0')
        ],
        validateRequest, async (req:Request, res:Response) => {
        const mongooseIdType = new mongoose.Types.ObjectId(req.params.id).toString();
        const isValidId = mongooseIdType === req.params.id;
        if (!isValidId) {
                throw new BadRequestError('Invalid or missing ticket id');
        }
        const ticket = await Ticket.findById(req.params.id);
        /**
         * Validate if ticket exists
         */
        if(!ticket) {
                throw new NotFoundError();
        }
        /**
         * Validate if user is ticket owner
         */
        const isOwner = ticket.userId === req.currentUser!.id;
        if (!isOwner) {
                throw new BadRequestError('The ticket does not belong to user');
        }
        ticket.set({
                title: req.body.title,
                price: req.body.price
        });
        await ticket.save();

        return res.status(200).json(ticket);
});

export { router as updateTicketRouter };