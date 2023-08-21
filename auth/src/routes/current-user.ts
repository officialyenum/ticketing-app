import express, {Request, Response} from "express";
import { currentUser } from "@yetix/common";

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req:Request, res:Response) => {
    return res.json({
        currentUser: req.currentUser || null
    });
});

export { router as currentUserRouter };