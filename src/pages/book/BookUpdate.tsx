import { useEffect, useState } from 'react';
import { validateEmpty } from '../../libs/utils/validation';
import { Link, useNavigate, useParams } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { bookGet, bookUpdate } from '../../libs/model/book';
import { useError } from '../../libs/hooks/error/useError';

const BookUpdate = () => {
  type TParams = {
    id: string;
  };

  const githubConfig = useGithubConfig();
  const { id } = useParams<TParams>();
  const navigate = useNavigate();
  const { addError } = useError();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) {
        addError('Id is not defined!');
        return;
      }
      const result = await bookGet(githubConfig, id);
      if (result.isOk()) {
        const book = result.getValue();
        setTitle(book.title);
        setDesc(book.description);
      }
    };

    load();
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!githubConfig || !id) {
      throw new Error('No github config!');
    }

    if (
      !validateEmpty(title, setTitleError) ||
      !validateEmpty(desc, setDescError)
    ) {
      return;
    }

    await bookUpdate(githubConfig, {
      id,
      title,
      description: desc,
    });

    navigate('/trainer/books');
  };

  return (
    <Paper sx={{ paddingX: 8, paddingY: 4 }}>
      <Box
        noValidate
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Typography variant='h6'>Update Book</Typography>
        <TextField label='Id' name='id' value={id} disabled fullWidth />
        <TextField
          label='Title'
          name='title'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          error={titleError !== ''}
          helperText={titleError}
          required
          fullWidth
        />
        <TextField
          label='Description'
          name='desc'
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDesc(e.target.value)
          }
          error={descError !== ''}
          helperText={descError}
          required
          fullWidth
          multiline
          rows={4}
        />
        <Stack direction={'row'} gap={3}>
          <Button variant='contained' component={Link} to='/trainer/books'>
            Cancel
          </Button>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookUpdate;
