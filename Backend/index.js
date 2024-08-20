import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './config.js';
import todosRoute from './routes/toDoRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database")

        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
     
        app.use("/api/todos", todosRoute);

        app.use((err, req, res, next) => {
            console.error("Unhandled error:", err);
            res.status(500).send('Internal Server Error');
        });
        
    })
    .catch((error) => {
        console.log(error);
    });



