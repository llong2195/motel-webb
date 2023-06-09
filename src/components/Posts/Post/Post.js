import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { deletePost, getPost, getPosts, updatePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  // const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const userId = user?.id || user?.id;
  // const hasLikedPost = post.likes.find((like) => like === userId);

  // const handleLike = async () => {
  //   dispatch(likePost(post.id));

  //   if (hasLikedPost) {
  //     setLikes(post.likes.filter((id) => id !== userId));
  //   } else {
  //     setLikes([...post.likes, userId]);
  //   }
  // };

  // const Likes = () => {
  //   if (likes.length > 0) {
  //     return likes.find((like) => like === userId)
  //       ? (
  //         <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
  //       ) : (
  //         <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
  //       );
  //   }

  //   return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  // };

  const openPost = (e) => {
    // dispatch(getPost(post.id, history));

    history.push(`/post/${post.id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post?.image?.split(',')[0] ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post?.author?.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.id === post?.author?.id) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post.id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{`${post.address}`}</Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.detail?.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" disabled={!user?.id} onClick={handleLike}>
          <Likes />
        </Button> */}
        {(user?.id === post?.author?.id) && (
          <Button size="small" color="secondary" onClick={async () => {
            await dispatch(deletePost(post.id, { status: post.status == 1 ? 0 : 1 }))
            // await dispatch(getPosts(1))
            history.go(0)
          }}>
            <DeleteIcon fontSize="small" /> &nbsp; {post.status == 0 ? 'Ẩn bài đăng' : 'Mở bài đăng'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
