import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onNavbarClick, onLogout }) => {
    const navigate = useNavigate();

     const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

   const handleBookListClick = () => {
        onNavbarClick('bookList');
        navigate('/admin/booklist');
   }

   const handleBookFormClick = () => {
        onNavbarClick('bookForm');
       navigate('/admin/bookform')
   }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/admin">Kütüphane Uygulaması</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                             <button className="nav-link" onClick={handleBookListClick}>Kitaplar</button>
                        </li>
                         <li className="nav-item">
                             <button className="nav-link" onClick={handleBookFormClick}>Kitap Ekle</button>
                        </li>
                         <li className="nav-item">
                            <button className="nav-link" onClick={handleLogoutClick}>Çıkış Yap</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;