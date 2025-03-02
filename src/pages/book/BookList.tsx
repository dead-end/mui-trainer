import { useEffect, useState } from 'react';
import { TBook } from '../../libs/types';
import { bookDelete, bookListing } from '../../libs/model/book';
import { Link, useNavigate } from 'react-router';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { useError } from '../../libs/hooks/error/useError';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const BookList = () => {
  const navigate = useNavigate();
  const { addError } = useError();
  const githubConfig = useGithubConfig();
  const [books, setBooks] = useState<TBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await bookListing(githubConfig);
      if (result.isOk()) {
        setBooks(result.getValue());
      } else {
        addError(result.getMessage());
      }
      setLoading(false);
    };

    load();
  }, []);

  const onDelete = async (id: string) => {
    setLoading(true);
    const result = await bookDelete(githubConfig, id);
    setLoading(false);

    if (result.hasError()) {
      addError(result.getMessage());
      return;
    }

    setBooks(result.getValue());
  };

  const onUpdate = async (id: string) => {
    navigate(`/trainer/books/update/${id}`);
  };

  return (
    <Paper sx={{ paddingX: 8, paddingY: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead color='primary'>
              <TableRow hover>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow hover key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>
                    <Tooltip title={`Edit book: ${book.id}`}>
                      <IconButton
                        color='primary'
                        loading={loading}
                        onClick={() => onUpdate(book.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={`Delete book: ${book.id}`}>
                      <IconButton
                        color='primary'
                        loading={loading}
                        onClick={() => onDelete(book.id)}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction={'row'} gap={3}>
          <Button variant='contained' component={Link} to='/trainer/'>
            Cancel
          </Button>
          <Button
            loading={loading}
            variant='contained'
            component={Link}
            to='/trainer/books/create'
          >
            Create
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookList;
