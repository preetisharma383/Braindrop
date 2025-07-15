import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../libs/axios.js";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

 useEffect(() => {
  const fetchNote = async () => {
    console.log("fetchNote called");  // <-- add this
    try {
      const res = await api.get(`/notes/${id}`);
      console.log("Fetched Note:", res.data);
      setNote(res.data.note || res.data); // fallback in case
    } catch (error) {
      console.error("Error in fetching note:", error);
      toast.error("Failed to fetch the note");
    } finally {
      setLoading(false);
    }
  };

  fetchNote();
}, [id]);


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-outline btn-error">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* Note Edit Form */}
          <div className="card bg-base-100 shadow-lg rounded-lg">
            <div className="card-body">
              <form onSubmit={handleSave} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full bg-[#1f1f1f] text-white placeholder-gray-400"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Content</label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-40 bg-[#1f1f1f] text-white placeholder-gray-400"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
