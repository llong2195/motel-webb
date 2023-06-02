import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_BY_CREATOR,
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data.data[0] } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    const { currentPage } = data.meta.pagination;
    const numberOfPages = data.meta.pagination.totalPages;
    dispatch({
      type: FETCH_ALL,
      payload: { data: data.data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch =
  (page, typePost, title, address, minPrice, maxPrice) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchPostsBySearch(
        page,
        typePost,
        title,
        address,
        minPrice,
        maxPrice,
      );

      dispatch({ type: FETCH_BY_SEARCH, payload: { data: data.data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/post/${data.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    await api.updatePost(id, post);
    const { data } = await api.fetchPost(id);
    console.log('data.data', data.data);
    dispatch({ type: UPDATE, payload: { data: data.data[0] } });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.access_token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, post) => async (dispatch) => {
  try {
    // await await api.deletePost(id);
    const { data } = await api.updatePost(id, post);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
