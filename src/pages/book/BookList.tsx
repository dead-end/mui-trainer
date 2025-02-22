import { useEffect, useState } from 'react';
import { TBook } from '../../libs/types';
import { bookListing } from '../../libs/model/book';
import { Link } from 'react-router';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';

const BookList = () => {
  const { githubConfig } = useGithubConfig();
  const [books, setBooks] = useState<TBook[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!githubConfig) {
        throw new Error('Mistt!!!');
      }
      const result = await bookListing(githubConfig);
      if (result.isOk()) {
        setBooks(result.getValue());
      }
    };

    load();
  }, []);

  const onDelete = () => {
    console.log('delete');
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
                    <Button onClick={onDelete}>
                      <HighlightOffIcon />
                    </Button>
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
