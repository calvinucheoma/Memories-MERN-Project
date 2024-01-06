import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/reducers/api';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null); // Create a ref for the file input

  const post = useSelector((store) =>
    currentId ? store.posts.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true before dispatch

    try {
      if (currentId) {
        await dispatch(updatePost({ id: currentId, updatedPost: postData }));
      } else {
        await dispatch(createPost(postData));
      }

      clear();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after dispatch
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    // Clear the file input using the ref
    if (fileInputRef.current) {
      fileInputRef.current.clear();
    }
  };

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <form
        autoComplete="off"
        noValidate
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editing' : 'Creating'} a Memory!
        </Typography>
        <TextField
          sx={{ margin: (theme) => theme.spacing(1) }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          sx={{ margin: (theme) => theme.spacing(1) }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ margin: (theme) => theme.spacing(1) }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          sx={{ margin: (theme) => theme.spacing(1) }}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />

        <div style={{ width: '97%', margin: '10px 0' }}>
          <FileBase
            ref={fileInputRef}
            type="file"
            multiple={false}
            value={postData.selectedFile}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        {loading ? (
          <CircularProgress sx={{ margin: '20px' }} />
        ) : (
          <Button
            sx={{ marginBottom: '10px' }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        )}

        <Button
          variant="contained"
          color="error"
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
