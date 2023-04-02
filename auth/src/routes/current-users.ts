import express from "express";

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
    console.log('current User');
    res.json({
        name: 'John Doe',
        email: 'yenum@doe.com'
    });
});

export { router as currentUserRouter };