import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, getPosts, updatePost } from '../../actions/posts';
import useStyles from './styles';
import { fetchPosts } from '../../api';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) => {
    return currentId
      ? state.posts.posts.find((post) => post.id === currentId)
      : null;
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const location = useLocation();
  const [postData, setPostData] = useState({
    authorId: user?.id,
    title: '',
    detail: '',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    time_unit: 0,
    address: '',
    postType: 0,
    image: '',
  });
  const [selectedValue, setSelectedValue] = React.useState(0);
  const handleChange = (event) => {
    setSelectedValue(Number(event.target.value));
  };
  console.log(post);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      authorId: user?.id,
      title: '',
      detail: '',
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      time_unit: 0,
      address: '',
      postType: 0,
      image: '',
    });
  };

  useEffect(() => {
    if (!post?.id) clear();
    if (post) setPostData(post);
  }, [post]);
  console.log('currentId', currentId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.name }, history));
      clear();
    } else {
      await dispatch(updatePost(currentId, { ...postData }));
      // await dispatch(getPosts(1))
      history.go(0)
      clear();
    }
  };

  if (!user?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Đăng nhập để sử dụng tính năng đăng bài
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Chỉnh Sửa "${post?.title}"` : 'Đăng Bài'}
        </Typography>
        <div style={{ display: 'flex' }}>
          <div>
            <Radio
              checked={postData.postType === 0}
              onChange={(e) =>
                setPostData({ ...postData, postType: 0 })
              }
              value={0}
              name="postType"
            // inputProps={{ "aria-label": 0 }}
            />
            Tìm phòng
          </div>
          <div>
            <Radio
              checked={postData.postType === 1}
              onChange={(e) =>
                setPostData({ ...postData, postType: 1 })
              }
              value={1}
              name="postType"
            // inputProps={{ "aria-label": 1 }}
            />
            Cho thuê
          </div>
        </div>

        <TextField
          name="title"
          variant="outlined"
          label="Tiêu đề tin"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="address"
          variant="outlined"
          label={postData.postType === 0 ? 'Địa chỉ cần tìm' : 'Địa chỉ'}
          fullWidth
          value={postData.address}
          onChange={(e) =>
            setPostData({ ...postData, address: e.target.value })
          }
        />
        {postData.postType === 0 ? (
          <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
            <TextField
              // onKeyDown={handleKeyPress}
              name="minPrice"
              variant="outlined"
              label="Số tiền thấp nhất"
              fullWidth
              value={postData.minPrice}
              onChange={(e) =>
                setPostData({ ...postData, minPrice: e.target.value })
              }
            />
            <TextField
              // onKeyDown={handleKeyPress}
              name="maxPrice"
              variant="outlined"
              label="Số tiền cao nhất"
              fullWidth
              value={postData.maxPrice}
              onChange={(e) =>
                setPostData({ ...postData, maxPrice: e.target.value })
              }
            />
          </div>
        ) : (
          <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
            <TextField
              // onKeyDown={handleKeyPress}
              name="price"
              variant="outlined"
              label="Giá phòng"
              fullWidth
              value={postData.price}
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={postData.time_unit || 0}
                label="Tháng"
                name="time_unit"
                onChange={(e) =>
                  setPostData({ ...postData, time_unit: e.target.value })
                }
              >
                <MenuItem value={0}>1</MenuItem>
                <MenuItem value={1}>2</MenuItem>
                <MenuItem value={2}>3</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        <TextField
          name="detail"
          variant="outlined"
          label="Chi tiết"
          fullWidth
          multiline
          rows={4}
          value={postData.detail}
          onChange={(e) => setPostData({ ...postData, detail: e.target.value })}
        />
        {/* <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
