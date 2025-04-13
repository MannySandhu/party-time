import express from 'express';
const router = express.Router();

router.post('/location', (req, res) => {
    try {
        res.status(200).json({ message: 'Success'});
    } catch (error) {
        console.error('Error in /location', error);
        res.status(500).json({error: 'Internal Server Error' });
    }
});

export default router;