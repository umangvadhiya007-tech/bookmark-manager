import React, { useEffect, useState } from 'react';
import '../styles/BookmarkForm.css';
import { toast } from "react-toastify";   

function BookmarkForm({ addBookmark, editBookMark, updateBookMark }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  
  useEffect(() => {
    if (editBookMark) {
      setTitle(editBookMark.title);
      setUrl(editBookMark.url);
    }
  }, [editBookMark]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !url) {
      toast.error("Both fields are required");
      return;
    }

    if (editBookMark) {
      updateBookMark(editBookMark.id, { title, url });
    } else {
      addBookmark({ title, url });
      toast.success("Bookmark added successfully");
    }

    setTitle('');
    setUrl('');
  };

  return (
    <div className="bookmark-form">
      <h3 className="form-title">
        {editBookMark ? "Edit Bookmark" : "Add New Bookmark"}
      </h3>

      <form onSubmit={handleSubmit} className="form-body">
        <input
          type="text"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />

        <input
          type="url"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="form-btn">
          {editBookMark ? "Update Bookmark" : "Save Bookmark"}
        </button>
      </form>
    </div>
  );
}

export default BookmarkForm;
