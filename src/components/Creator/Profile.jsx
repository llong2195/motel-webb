import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Avatar,
  Grow,
  Container,
  AppBar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../styles';
import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const location = useLocation();
  let user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    dispatch(getPostsByCreator(id));
    // dispatch(getPostsBySearch(1, 0, '', '', '', ''));
  }, []);

  if (!posts.length && !isLoading) {
    return 'No posts';
  } else {
    user = posts[0]?.author;
  }
  return (
    <div>
      <Avatar className={classes.purple} alt={user?.name} src={user?.avatar}>
        {user?.name?.charAt(0)}
      </Avatar>
      <Typography>{user?.name || ''}</Typography>
      <Typography>Địa chỉ: {user?.address || ''}</Typography>
      <Typography>Số điện thoại: {user?.phoneNumber || ''}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {/* {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post.id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )} */}
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
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {/* {!searchQuery && !tags.length && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )} */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Profile;
