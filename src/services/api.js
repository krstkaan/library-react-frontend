import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/books';

// Helper fonksiyon tokenı getirmek için
const getToken = () => localStorage.getItem('token');

// Axios instance oluştur
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Tüm kitapları getir
export const getBooks = async () => {
    const response = await axiosInstance.get();
    return response.data;
};

// Yeni kitap ekle
export const createBook = async (book) => {
    const response = await axiosInstance.post('', book);
    return response.data;
};

// Kitap güncelle
export const updateBook = async (id, book) => {
    const response = await axiosInstance.put(`/${id}`, book);
    return response.data;
};

// Kitap sil
export const deleteBook = async (id) => {
    await axiosInstance.delete(`/${id}`);
};

export const registerUser = async (user) => {
    const response = await axios.post('http://localhost:8080/api/users/register', user);
    return response.data;
};

export const loginUser = async (user) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', user);
    return response.data;
};