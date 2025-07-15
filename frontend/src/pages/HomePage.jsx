import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../libs/axios.js';
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NoteCard from '../components/NoteCard.jsx';
import NotenotFound from '../components/NotenotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes..");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading...</div>}

        {notes.length === 0 && !isRateLimited && <NotenotFound />}
        {!isRateLimited && notes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
