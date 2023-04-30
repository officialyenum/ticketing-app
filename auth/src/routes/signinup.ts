import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { BadRequestError } from "../errors";
import { validateRequest } from "../middlewares";
import { JwtManager } from "../services";

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters long')
], validateRequest, async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError('User Exists');
    }
    const user = User.build({ email, password });
    await user.save()
    // Generate JWT
    const token = JwtManager.generate({
        id: user.id,
        email: user.email
    });
    // Store it on session object
    req.session = {jwt: token}
    res.status(201).json({
        status: 'success',
        message: "User created successfully",
        data: user
    });
    
});

export { router as signUpRouter };