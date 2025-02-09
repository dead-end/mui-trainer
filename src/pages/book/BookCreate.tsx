import { useState } from 'react';
import { validateEmpty } from '../../libs/utils/validation';
import { Link } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const BookCreate = () => {
  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    validateEmpty(id, setIdError);
    validateEmpty(title, setTitleError);
    validateEmpty(desc, setDescError);

    console.log('id', id, 'title', title, 'desc', desc);
  };

  return (
    <Paper sx={{ paddingX: 8, paddingY: 4 }}>
      <Box
        noValidate
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Typography variant='h6'>Github Configuration</Typography>
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
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookCreate;
