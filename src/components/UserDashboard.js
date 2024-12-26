import React from 'react';

const UserDashboard = ({onLogout}) => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h2>Hoşgeldiniz,</h2>
                    <p>Yakında geliyoruz!</p>
                   <button className="btn btn-secondary mt-3" onClick={onLogout}>Çıkış Yap</button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;