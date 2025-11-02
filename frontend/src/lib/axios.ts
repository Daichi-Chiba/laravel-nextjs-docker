import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Laravel Sanctumで必要になる場合がある
});

// リクエストインターセプター：すべてのリクエストに認証トークンを付与
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター：エラーハンドリングなど
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 例: 401 Unauthorized エラーの場合、ログアウト処理を行う
    if (error.response && error.response.status === 401) {
      // ここでログアウト処理を呼び出すことも可能ですが、
      // 循環参照を避けるためAuthContext内で直接処理する方が安全です。
      // 例: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
