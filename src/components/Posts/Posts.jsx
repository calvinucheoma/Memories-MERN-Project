import React from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const { posts, loading, error } = useSelector((store) => store.posts);
  console.log(posts);

  if (loading) {
    return (
      <CircularProgress
        sx={{
          color: 'white',
          marginLeft: '50%',
          marginRight: '50%',
        }}
      />
    );
  }

  if (error) {
    return (
      <Typography variant="h2" align="center">
        {error}
      </Typography>
    );
  }

  return !posts?.length ? (
    <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>
      No available posts
    </Typography>
  ) : (
    <Grid
      sx={{ display: 'flex', alignItems: 'center' }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
