import express, { request, response } from "express";
import { toDo } from "../models/todoModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        if(!request.body.title) {
            return response.status(400).send({
                message: "send all rq fields: title",
            });
        }

        const newToDo =  {
            title: request.body.title,
        };

        const todo = await toDo.create(newToDo);
        return response.status(201).json({ data: todo });

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }

});

router.get("/", async (request, response) => {
    try {
        const todo = await toDo.find({});

        return response.status(200).json(
            {
                data: todo
            });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const todo = await toDo.findByIdAndDelete(id);
        if (!todo) {
            return response.status(404).json({ message: 'Todo not found' });
        }
        return response.status(200).json({ message : 'Successfully deleted todo'});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});


export default router;