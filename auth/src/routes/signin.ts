import express, {Request, Response} from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { RequestValidationError, BadRequestError } from "../errors";
import { validateRequest } from "../middlewares";
import { JwtManager, PasswordManager } from "../services";

const router = express.Router();

router.post('/api/users/signin',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
], validateRequest, async (req: Request, res:Response) => {
    
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError(`User with ${email} does not Exist`);
    }
    const passwordsMatch = PasswordManager.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError(`Incorrect Password`);
    }
    // Generate JWT
    const token = JwtManager.generate({
        id: existingUser.id,
        email: existingUser.email
    });
    // Store it on session object
    req.session = {jwt: token}
    return res.status(201).json({
        status: 'success',
        message: "User Logged successfully",
        data: existingUser
    });
});

export { router as signInRouter };