import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token); // Token'ı localStorage'a kaydet

           try {
                 const payloadBase64 = token.split('.')[1];
                 const payload = JSON.parse(atob(payloadBase64));
                 const role = payload.role || 'user';
                 onLoginSuccess(role);

           } catch(error){
             console.error("Error while decoding token:", error)
             alert("Token çözümlenirken bir hata oluştu")
           }

      } else {
         const error = await response.text();
         alert("Giriş başarısız: " + error);
      }
    } catch (error) {
        alert("Giriş sırasında bir hata oluştu", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Giriş</h2>
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
              Giriş Yap
            </button>
             <p className="mt-3">
               Henüz kayıt olmadınız mı? <button type="button" className="btn btn-link" onClick={onRegisterClick}>Kayıt Ol</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;