import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import BookmarkForm from './Components/BookMarkForm';
import BookmarkList from './Components/BookMarkList';
import './index.css';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://69687c8e69178471522a9d75.mockapi.io/book-mark/list";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editBookMark, setEditBookMark] = useState(null);

  
  const fetchBookmarks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks", error);
      toast.error("Failed to load bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  
  const addBookmark = async (newBookmark) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookmark),
      });

      const data = await res.json();
      setBookmarks([...bookmarks, data]);
      toast.success("Bookmark added successfully");
    } catch (error) {
      console.error("Error adding bookmark", error);
      toast.error("Error adding bookmark");
    }
  };

  
  const updateBookMark = async (id, updateData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const updatedBookmark = await res.json();

      const updatedList = bookmarks.map((b) =>
        b.id === id ? updatedBookmark : b
      );

      setBookmarks(updatedList);
      setEditBookMark(null);
      toast.success("Bookmark updated successfully");
    } catch (error) {
      console.error("Error updating bookmark", error);
      toast.error("Error updating bookmark");
    }
  };

  
  const deleteBookmark = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setBookmarks(bookmarks.filter((bm) => bm.id !== id));
      toast.success("Bookmark deleted successfully");
    } catch (error) {
      console.error("Error deleting bookmark", error);
      toast.error("Error deleting bookmark");
    }
  };

  return (
    <>
      <Navbar />
      <Header />

      <BookmarkForm
        addBookmark={addBookmark}
        editBookMark={editBookMark}
        updateBookMark={updateBookMark}
      />

      <BookmarkList
        bookmarks={bookmarks}
        deleteBookmark={deleteBookmark}
        setEditBookMark={setEditBookMark}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
