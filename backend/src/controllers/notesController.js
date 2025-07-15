import Note from "../models/noteModel.js";

export async function getNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});//newest one
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getall Notes controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content })

        const savedNote = await note.save();
        res.status(201).json({ success: true, message: "Note Created Successfully!", savedNote });

    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note Not Found" });
        }
        res.status(200).json({ success: true, message: "Note Updated Successfully!", updatedNote });
    } catch (error) {
        console.error("Error in update Notes controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  try {
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting note", error);
    res.status(500).json({ error: "Server error" });
  }
};

import mongoose from "mongoose";

export const getNotesById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNotesById controller", error);
    res.status(500).json({ error: "Server error" });
  }
};
