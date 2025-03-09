import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { validateEmpty, validateId } from '../../libs/utils/validation';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { useError } from '../../libs/hooks/error/useError';
import { chapterCreate, toChapterList } from '../../libs/model/chapter';

const ChapterCreate = () => {
  type TParams = {
    bookId: string;
  };
  const { bookId } = useParams<TParams>();

  const githubConfig = useGithubConfig();
  const navigate = useNavigate();
  const { addError } = useError();

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!bookId) {
      addError('No book id!');
      return;
    }

    if (
      !validateEmpty(id, setIdError) ||
      !validateId(id, setIdError) ||
      !validateEmpty(title, setTitleError)
    ) {
      return;
    }

    setLoading(true);
    const result = await chapterCreate(githubConfig, bookId, {
      id,
      title,
    });
    setLoading(false);

    if (result.hasError()) {
      addError(result.getMessage());
      return;
    }

    navigate(toChapterList(bookId));
  };

  return (
    <Paper sx={{ paddingX: 8, paddingY: 4 }}>
      <Box
        noValidate
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Typography variant='h6'>Create Chapter</Typography>
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
        <Stack direction={'row'} gap={3}>
          <Button
            variant='contained'
            component={Link}
            to={toChapterList(bookId)}
          >
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

export default ChapterCreate;
