import React, { useState } from 'react';
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const [typePost, setTypePost] = React.useState(2);
  const [title, settitle] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [minPrice, setminPrice] = React.useState('');
  const [maxPrice, setmaxPrice] = React.useState('');

  const handleChange = (event) => {
    setTypePost(event.target.value);
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(
        getPostsBySearch(page, typePost, title, address, minPrice, maxPrice),
      );
      history.push(
        `/post/search?postType=${typePost}&title=${title}&address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      );
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại bài đăng
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typePost}
                  label="Loại bài đăng"
                  // variant="outlined"
                  onChange={handleChange}
                >
                  <MenuItem value={2}>Tất cả</MenuItem>
                  <MenuItem value={0}>Cho thuê</MenuItem>
                  <MenuItem value={1}>Tìm phòng</MenuItem>
                </Select>
              </FormControl>
              <TextField
                onKeyDown={handleKeyPress}
                name="title"
                variant="outlined"
                label="Từ khóa tiêu đề"
                fullWidth
                value={title}
                onChange={(e) => settitle(e.target.value)}
                style={{ marginTop: 10 }}
              />
              <TextField
                onKeyDown={handleKeyPress}
                name="address"
                variant="outlined"
                label="Địa chỉ"
                fullWidth
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                style={{ marginTop: 10 }}
              />
              <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                <TextField
                  onKeyDown={handleKeyPress}
                  name="min"
                  variant="outlined"
                  label="Số tiền thấp nhất"
                  fullWidth
                  value={minPrice}
                  onChange={(e) => setminPrice(e.target.value)}
                />
                <TextField
                  onKeyDown={handleKeyPress}
                  name="max"
                  variant="outlined"
                  label="Số tiền cao nhất"
                  fullWidth
                  value={maxPrice}
                  onChange={(e) => setmaxPrice(e.target.value)}
                />
              </div>
              {/* <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              /> */}
              <Button
                onClick={searchPost}
                style={{ marginTop: 10 }}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
