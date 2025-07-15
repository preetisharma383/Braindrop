import express from "express";
import { createNote, deleteNote, getNotes, updateNote,getNotesById } from "../controllers/notesController.js";

const router = express.Router();

router.get('/', getNotes);  // Get all notes   
router.get('/:id', getNotesById);  // Get all notes by specific id   

router.post('/',createNote);// Create a new note
router.put('/:id',updateNote); // Update a note by ID
router.delete('/:id',deleteNote); // Delete a note by ID

export default router;