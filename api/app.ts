import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io"
import cors from 'cors'

import prisma from './prisma'
import loginRoute from './routes/login'

const app = express()

app.use(express.json())
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use('/login', loginRoute);

io.on("connection", async (socket) => {
    const messages = await prisma.message.findMany({
        select: {
            content: true,
            author: {
                select: {
                    name: true
                }
            },
        }
    })

    socket.emit('messages', messages);

    socket.on('message', async ({ message, authorId }) => {
        const data = await prisma.message.create({
            data: { content: message, authorId },
            select: {
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
            }
        })

        io.emit('message', data);
    });
});

httpServer.listen(3000);
