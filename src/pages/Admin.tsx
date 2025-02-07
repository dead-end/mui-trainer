import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useConfigContext } from '../libs/hooks/useConfigContext';

export const Admin = () => {
  const { config, setConfig } = useConfigContext();

  const [user, setUser] = useState(config.user);
  //  const [userError, setUserError] = useState('');

  const [repo, setRepo] = useState(config.repo);
  //  const [repoError, setRepoError] = useState('');

  const [token, setToken] = useState(config.token);
  //  const [tokenError, setTokenError] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log('user', user, 'repo', repo, 'token', token);
    setConfig({
      user: user,
      repo: repo,
      token: token,
    });
  };

  return (
    <Paper sx={{ paddingX: 8, paddingY: 4 }}>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginY: 4 }}
      >
        <Typography variant='h6'>Github Configuration</Typography>
        <TextField
          label='User'
          name='user'
          value={user}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser(e.target.value)
          }
          required
          fullWidth
        />
        <TextField
          label='Repository'
          name='repo'
          value={repo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRepo(e.target.value)
          }
          required
          fullWidth
        />
        <TextField
          label='Token'
          name='token'
          value={token}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToken(e.target.value)
          }
          required
          fullWidth
        />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};
