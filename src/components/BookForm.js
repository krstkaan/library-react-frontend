import React, { useState } from 'react';
import { createBook } from '../services/api'; // API çağrısı fonksiyonu

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [photoUrl, setPhotoUrl] = useState(''); // Fotoğraf URL'si
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result); // Base64 veriyi set et
    };
    if (file) {
      reader.readAsDataURL(file); // Base64'e dönüştür
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!title.trim() || !author.trim() || !publishedDate.trim() || !isbn.trim() || !photoUrl.trim()) {
      setError('Lütfen tüm alanları doldurun.');
      setLoading(false);
      return;
    }

    const newBook = { title, author, publishedDate, isbn, photoUrl };

    try {
      await createBook(newBook);
      setSuccess('Kitap başarıyla eklendi!');
      setTitle('');
      setAuthor('');
      setPublishedDate('');
      setIsbn('');
      setPhotoUrl('');
    } catch (err) {
      console.error(err);
      setError('Kitap eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Yeni Kitap Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Kitap Adı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Yazar</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Yayın Tarihi</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Fotoğraf</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="form-control"
            required
          />
        </div>
        {photoUrl && <img src={photoUrl} alt="Seçilen Fotoğraf" className="img-thumbnail" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />}
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Kaydediliyor...' : 'Ekle'}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
        {success && <p className="text-success mt-3">{success}</p>}
      </form>
    </div>
  );
};

export default BookForm;
