import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, BadRequestError } from '@yetix/common';
import { Ticket } from '../models/ticket';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/api/tickets/:id', async (req:Request, res:Response) => {
        const { id } = req.params;
        const mongooseIdType = new mongoose.Types.ObjectId(id).toString();
        const isValidId = mongooseIdType === id;
        if (!isValidId) {
                throw new BadRequestError('Invalid or missing ticket id');
        }
        const ticket = await Ticket.findById(id);
        if(!ticket){
                throw new NotFoundError();
        }
        return res.status(200).json(ticket);
});

export { router as showTicketRouter };