import React, { useEffect, useState } from 'react';
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
import * as db from './../../actions/db'
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
  const [province, setProvince] = useState({
    idProvince: '01',
    name: 'Thành phố Hà Nội',
  });
  const [district, setDistrict] = useState({
    idProvince: '01',
    idDistrict: '001',
    name: 'Quận Ba Đình',
  });
  console.log(address);
  const handleChange = (event) => {
    setTypePost(event.target.value);
  };
  useEffect(() => {
    setaddress(`${district?.name ? district?.name : ''
      },${province?.name ? province?.name : ''}` || undefined,);
  }, [district, province])

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

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={province?.idProvince ?? '01'}
                label="Loại bài đăng"
                onChange={(e) => { setProvince(db.vn.province.filter(i => i.idProvince == e.target.value)[0]); setDistrict('') }}
              >
                {db.vn.province.map((city) => {
                  return <MenuItem value={city.idProvince}>{city.name}</MenuItem>
                })}

              </Select>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district?.idDistrict}
                label="Loại bài đăng"
                onChange={(e) => { setDistrict(db.vn.district.filter(i => i.idDistrict == e.target.value)[0]); }}
              >
                {db.vn.district.filter(i => i.idProvince === province?.idProvince).map(dis => {
                  return <MenuItem value={dis.idDistrict}>{dis.name}</MenuItem>
                })}
              </Select>
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
    </Grow >
  );
};

export default Home;
