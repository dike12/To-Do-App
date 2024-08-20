import mongoose from "mongoose";

const toDOSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
);

export const toDo = mongoose.model("toDO", toDOSchema)