import express, {Request, Response} from "express";

const router = express.Router();

router.post('/api/users/signout', (req:Request, res:Response) => {
    req.session = null;
    return res.status(200).json({
        status: 'success',
        message: "User Logged Out successfully"
    });
});

export { router as signOutRouter };