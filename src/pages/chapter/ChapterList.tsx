import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Typography from '@mui/material/Typography';

import { TChapter } from '../../libs/types';
import { useGithubConfig } from '../../libs/hooks/github/useGithubConfig';
import { useError } from '../../libs/hooks/error/useError';
import Confirmation from '../../components/Confirmation';
import {
  chapterDelete,
  chapterListing,
  toChapter,
} from '../../libs/model/chapter';

const ChapterList = () => {
  type TParams = {
    bookId: string;
  };
  const { bookId } = useParams<TParams>();
  const navigate = useNavigate();
  const { addError } = useError();
  const githubConfig = useGithubConfig();
  const [chapters, setChapters] = useState<TChapter[]>([]);
  const [deleteId, setDeleteId] = useState<string | undefined>();

  useEffect(() => {
    const load = async () => {
      if (!bookId) {
        addError('No book defined!');
        return;
      }
      const result = await chapterListing(githubConfig, bookId);
      if (result.isOk()) {
        setChapters(result.getValue());
      } else {
        addError(result.getMessage());
      }
    };

    load();
  }, []);

  const doDelete = async (value: string) => {
    if (!bookId) {
      addError('No book defined!');
      return;
    }

    const result = await chapterDelete(githubConfig, bookId, value);
    if (result.hasError()) {
      addError(result.getMessage());
      return;
    }

    setChapters(result.getValue());
  };

  const onUpdate = (id: string) => {
    if (!bookId) {
      addError('No book defined!');
      return;
    }
    navigate(toChapter(bookId, id, 'update'));
  };

  const onShow = (id: string) => {
    /*
        navigate(`/trainer/book/${book.id}/chapters`)
*/
  };

  return (
    <>
      <Paper sx={{ paddingX: 8, paddingY: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Typography variant='h6'>Chapter List</Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead color='primary'>
                <TableRow hover>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chapters.map((chapter) => (
                  <TableRow hover key={chapter.id}>
                    <TableCell>{chapter.id}</TableCell>
                    <TableCell>{chapter.title}</TableCell>
                    <TableCell>
                      <Tooltip title={`Delete chapter: ${chapter.id}`}>
                        <IconButton
                          color='primary'
                          onClick={() => {
                            setDeleteId(chapter.id);
                            //  setConfirm(true);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={`Edit chapter: ${chapter.id}`}>
                        <IconButton
                          color='primary'
                          onClick={() => onUpdate(chapter.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={`Show chapter: ${chapter.id}`}>
                        <IconButton
                          color='primary'
                          onClick={() => onShow(chapter.id)}
                        >
                          <FormatListBulletedIcon />
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
              variant='contained'
              component={Link}
              to={`/trainer/book/${bookId}/create`}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Confirmation<string>
        title='Delete Chapter'
        message={`Do you want to delete the chapter: ${deleteId}?`}
        confirmValue={deleteId}
        setConfirmValue={setDeleteId}
        confirmFct={doDelete}
      />
    </>
  );
};

export default ChapterList;
