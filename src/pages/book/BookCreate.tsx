import { useState } from 'react';
import { validateEmpty, validateId } from '../../libs/utils/validation';
import { Link, useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { bookCreate } from '../../libs/model/book';
import { useError } from '../../libs/hooks/error/useError';

const BookCreate = () => {
  const githubConfig = useGithubConfig();
  const navigate = useNavigate();
  const { addError } = useError();

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (
      !validateEmpty(id, setIdError) ||
      !validateId(id, setIdError) ||
      !validateEmpty(title, setTitleError) ||
      !validateEmpty(desc, setDescError)
    ) {
      return;
    }

    setLoading(true);
    const result = await bookCreate(githubConfig, {
      id,
      title,
      description: desc,
    });
    setLoading(false);

    if (result.hasError()) {
      addError(result.getMessage());
      return;
    }

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
        <Typography variant='h6'>Create Book</Typography>
        <TextField
          label='Id'
          name='id'
          value={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setId(e.target.value)
          }
          error={idError !== ''}
          helperText={idError}
          required
          fullWidth
        />
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
          <Button type='submit' variant='contained' loading={loading}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookCreate;
