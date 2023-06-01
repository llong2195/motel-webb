import axios from 'axios';

const API = axios.create({ baseURL: 'http://103.166.183.203:3000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/post?userId=0&code=0&limit=0&page=0&id=${id}`);
export const fetchPosts = (page) => API.get(`/post?userId=0&code=0&page=${page}&limit=8`);
export const fetchPostsByCreator = (name) => API.get(`/post/creator?name=${name}`);
export const fetchPostsBySearch = (
  page,
  typePost,
  title,
  address,
  minPrice,
  maxPrice,
) => API.get(
  `/post?userId=0&code=0&page=${page}&limit=8&postType=${typePost}&title=${title}&address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
);
export const createPost = (newPost) => API.post('/post', newPost);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);
export const comment = (value, id) => API.post(`/post/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);