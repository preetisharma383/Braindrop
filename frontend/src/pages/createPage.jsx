import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../libs/axios.js';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note Created Successfully!")
      navigate("/")
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down !,You're Creating notes too fast", {
          duration: 4000,
          icon: "☠️",
        });
      } else {

        toast.error("Failed to create note!")
      }

    } finally {
      setLoading(false);
    }
    // Simulate API call
    setTimeout(() => {
      console.log('Note created:', { title, content });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to='/' className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4 font-bold'>Create New Note</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="w-full input input-bordered bg-[#1f1f1f] text-white placeholder-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="w-full textarea textarea-bordered h-40 bg-[#1f1f1f] text-white placeholder-gray-400"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary "
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
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

export default CreatePage;
