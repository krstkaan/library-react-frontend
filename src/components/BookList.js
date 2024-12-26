import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("Kitaplar yüklenirken bir hata oluştu.");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
        await deleteBook(id);
        fetchBooks();
      } catch (err) {
          setError("Kitap silinirken bir hata oluştu.");
        console.error("Error deleting book:", err);
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>;
  }

    if (error) {
        return  <div className="d-flex justify-content-center align-items-center vh-100">
            <p className="text-danger fs-5">{error}</p>
            </div>
    }

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Kitap Listesi</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li
            key={book.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">{book.title}</h5>
              <p className="mb-0 text-muted">{book.author}</p>
            </div>
            <button
              onClick={() => handleDelete(book.id)}
              className="btn btn-danger btn-sm"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;