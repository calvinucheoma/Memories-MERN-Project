import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import memories from './images/memories.jpg';
import { Container, Typography, Grid, AppBar, Grow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getAllPosts } from './redux/reducers/api';

// react-file-base64 is used to convert our images

function App() {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, currentId]);

  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        color="inherit"
        sx={{
          margin: '30px 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{ color: 'rgba(0,183,255, 1)' }}
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          style={{ marginLeft: '15px' }}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            {/* xs={12} means it takes the full-width on extra small devices, i.e 12/12 */}
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
