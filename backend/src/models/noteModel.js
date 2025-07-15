import mongoose from "mongoose";

//1- Create a schema for the note
//2- Define the structure of the note document
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},{timestamps: true});
//3- Create a model from the schema
const Note = mongoose.model("Note", noteSchema);
//4- Export the model
export default Note;

