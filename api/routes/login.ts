import prisma from '../prisma'
import express from 'express'

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
    const user = await prisma.user.create({
        data: { name: req.body.name },
    })
    res.json(user);
});

export default loginRoute;
