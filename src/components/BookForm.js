import React, { useState } from 'react';
import { createBook } from '../services/api';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

      if (!title.trim() || !author.trim()) {
          setError("Lütfen hem kitap adı hem de yazar alanını doldurun.");
          setLoading(false);
          return;
      }
    try {
        const newBook = { title, author };
        await createBook(newBook);
        setTitle('');
        setAuthor('');
        setSuccess("Kitap başarıyla eklendi!");
    } catch (err) {
         setError("Kitap eklenirken bir hata oluştu.");
        console.error("Error adding book:", err);
    } finally {
         setLoading(false);
    }
  };

  return (
    <div className="container mt-4 bg-white shadow-md rounded p-4">
      <h2 className="text-center mb-4">Yeni Kitap Ekle</h2>
        <form onSubmit={handleSubmit}>
             <div className="mb-3">
             <label htmlFor="title" className="form-label">Kitap Adı</label>
              <input
               type="text"
                id="title"
                placeholder="Kitap Adı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
               className="form-control"
              />
          </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Yazar</label>
                <input
                type="text"
                id="author"
                placeholder="Yazar"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-control"
               />
           </div>
           <div className="d-flex justify-content-center">
                 <button type="submit"
                        disabled={loading}
                        className={`btn btn-primary ${loading ? 'disabled' : ''}`}>
                            {loading ? 'Kaydediliyor...' : 'Ekle'}
                 </button>
           </div>
             {error && <div className="text-danger mt-2 text-center">{error}</div>}
           {success && <div className="text-success mt-2 text-center">{success}</div>}
        </form>
    </div>
  );
};

export default BookForm;