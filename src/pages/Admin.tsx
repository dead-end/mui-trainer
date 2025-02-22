import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { validateEmpty } from '../libs/utils/validation';
import { useGithubConfig } from '../libs/hooks/GithubConfigProvider';

export const Admin = () => {
  const { githubConfig, updateGithubConfig } = useGithubConfig();

  const [user, setUser] = useState(githubConfig?.user || '');
  const [userError, setUserError] = useState('');

  const [repo, setRepo] = useState(githubConfig?.repo || '');
  const [repoError, setRepoError] = useState('');

  const [token, setToken] = useState(githubConfig?.token || '');
  const [tokenError, setTokenError] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    validateEmpty(user, setUserError);
    validateEmpty(repo, setRepoError);
    validateEmpty(token, setTokenError);

    updateGithubConfig({
      user: user,
      repo: repo,
      token: token,
    });
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
          label='User'
          name='user'
          value={user}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser(e.target.value)
          }
          error={userError !== ''}
          helperText={userError}
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
          error={repoError !== ''}
          helperText={repoError}
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
          error={tokenError !== ''}
          helperText={tokenError}
          required
          fullWidth
        />
        <Stack direction={'row'}>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
