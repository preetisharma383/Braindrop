import { Link } from 'react-router-dom';
import { NotebookIcon } from 'lucide-react';
import React from 'react';

const NoteNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      {/* Icon wrapper */}
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold">No notes yet</h3>

      {/* Description */}
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to begin your journey.
      </p>

      {/* CTA Button */}
      <Link to="/create" className="btn btn-primary">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NoteNotFound;
