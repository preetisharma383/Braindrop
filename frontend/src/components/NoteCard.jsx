import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../libs/utils.js";
import api from "../libs/axios.js";
import toast from "react-hot-toast";
import React from "react";

const NoteCard = ({ note, setNotes }) => {
  
const handleDelete = async (e, id) => {
  e.preventDefault();
  e.stopPropagation(); // Prevent navigation from <Link>

  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    const res = await api.delete(`/notes/${id}`);

    // Check for successful response
    if (res.status === 200 || res.status === 204) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } else {
      console.error("Unexpected response during delete:", res);
      toast.error("Failed to delete note (unexpected response)");
    }
  } catch (error) {
    console.error("Error in handleDelete", error?.response || error);
    toast.error("Failed to delete note");
  }
};

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;