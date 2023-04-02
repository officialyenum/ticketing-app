import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters long')
], (req:Request, res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'failed',
            error: errors.array()[0].msg,
            errors: errors.array() });
    }
    const { email, password } = req.body;
    if (!email || typeof email !== 'string') {
        res.status(400).json({ 
            status: 'failed',
            error: "Provide a valid email"
         });
    }
    if (!password || typeof password !== 'string') {
        res.status(400).json({ 
            status: 'failed',
            error: "Provide a valid password" 
        });
    }
    res.status(201).json({
        status: 'success',
        message: "User created successfully"
    })
    console.log('creating a user...');
});

export { router as signUpRouter };