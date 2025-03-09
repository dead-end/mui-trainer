import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { validateEmpty } from '../../libs/utils/validation';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { useError } from '../../libs/hooks/error/useError';
import {
  chapterGet,
  chapterUpdate,
  toChapterList,
} from '../../libs/model/chapter';

const ChapterUpdate = () => {
  type TParams = {
    bookId: string;
    id: string;
  };
  const { bookId, id } = useParams<TParams>();

  const githubConfig = useGithubConfig();

  const navigate = useNavigate();
  const { addError } = useError();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!bookId || !id) {
        addError('Chapter or book id is not defined!');
        return;
      }
      const result = await chapterGet(githubConfig, bookId, id);
      if (result.isOk()) {
        const book = result.getValue();
        setTitle(book.title);
      } else {
        addError(result.getMessage());
      }
      setLoading(false);
    };

    load();
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!githubConfig || !id || !bookId) {
      throw new Error('No github config!');
    }

    if (!validateEmpty(title, setTitleError)) {
      return;
    }

    setLoading(true);
    const result = await chapterUpdate(githubConfig, bookId, {
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

export default ChapterUpdate;
