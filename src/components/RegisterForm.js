import React, { useState } from 'react';

const RegisterForm = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert(await response.text());
                 onBackToLogin(); // Kayıt sonrası login formuna dön
            } else {
               alert("Kayıt başarısız: "+ await response.text())
            }
        } catch (error) {
            alert("Kayıt sırasında bir hata oluştu", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Kayıt Ol</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">E-posta</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Şifre</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Kayıt Ol
                        </button>
                        <p className="mt-3">
                         Zaten bir hesabınız var mı? <button type="button" className="btn btn-link" onClick={onBackToLogin}>Giriş Yap</button>
                         </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;