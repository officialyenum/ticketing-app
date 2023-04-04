import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models";
import { RequestValidationError, BadRequestError } from "../errors";

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters long')
], async (req:Request, res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError('User Exists');
    }
    const user = User.build({ email, password });
    await user.save()
    res.status(201).json({
        status: 'success',
        message: "User created successfully",
        data: user
    });
    
});

export { router as signUpRouter };