import axios from 'axios';
import { filter } from 'lodash';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Grid,
  Box
} from '@material-ui/core';

import useAuth from 'hooks/useAuth';
// lang
import useLocales from 'hooks/useLocales';
import TeacherListToolbar from 'components/_dashboard/teacher/list/TeacherToolBar';
import TeacherListHead from 'components/_dashboard/teacher/list/TeacherListHead';
import TeacherMoreMenu from 'components/_dashboard/teacher/list/TeacherMoreMenu';
import { getListTeacherAll } from 'redux/slices/teacher';
import TeacherDialog from 'components/_dashboard/teacher/dialog/TeacherDialog';
import { getClassDetail } from 'redux/slices/class';
import { getLearningExperience } from 'redux/slices/learningExperience';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// @types

// components
import Page from '../../../Page';
import Label from '../../../Label';
import Scrollbar from '../../../Scrollbar';
import SearchNotFound from '../../../SearchNotFound';
import HeaderBreadcrumbs from '../../../HeaderBreadcrumbs';

import { Teacher } from '../../../../@types/teacher';
import LearningExperienceDialog from './LearningExperienceDialog';

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any[], comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_partner) => _partner.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function LearningExperiencesList() {
  const { translate } = useLocales();
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  // const diverList = useSelector((state: RootState) => state.diver.diverList);
  //   const teacherList = useSelector((state: RootState) => state.teacher.teacherListAll);
  const learningExperienceList = useSelector(
    (state: RootState) => state.learningExperience.LearningExperienceList
  );
  const totalCount = useSelector((state: RootState) => state.learningExperience.totalCount);
  const isLoading = useSelector((state: RootState) => state.learningExperience.isLoading);
  const classDetail = useSelector((state: RootState) => state.class.class);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentStudent, setCurrentStudent] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const TABLE_HEAD = [
    { id: 'degree', label: 'Bằng cấp', alignRight: false },
    { id: 'nameOfUniversity', label: 'Nới cấp', alignRight: false },
    { id: 'fromTime', label: 'Thời gian bắt đầu', alignRight: false },
    { id: 'toTime', label: 'Thời gian kết thúc', alignRight: false }
    // { id: 'Status', label: 'Trạng thái', alignRight: false },
    // { id: '' }
  ];

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = learningExperienceList.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  useEffect(() => {
    // dispatch(getClassDetail(classId));
    dispatch(getLearningExperience('1', rowsPerPage, page));
  }, [dispatch, rowsPerPage, page]);

  const emptyRows = !isLoading && !learningExperienceList;

  const filteredDiver = applySortFilter(
    learningExperienceList,
    getComparator(order, orderBy),
    filterName
  );

  const isDiverNotFound = learningExperienceList.length === 0 && isLoading;
  // if (companiesList !== null) {
  //   companiesList.map((item, index) => {
  //     return (
  //       <div key={index}>
  //         <h1>{item[index]}</h1>
  //       </div>
  //     );
  //   });
  // }
  function convertUTCDateToLocalDate(date: any) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }
  return (
    <Page title="Danh sách giáo viên | PJ School">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ marginLeft: '82%', mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
              handleOpen();
              setCurrentStudent(null);
              setIsEdit(false);
            }}
          >
            Thêm mới bằng cấp
          </Button>
        </Box>
        <Card>
          <Scrollbar>
            <LearningExperienceDialog
              isEdit={isEdit}
              open={open}
              experience={currentStudent!}
              handleClose={handleClose}
            />
            {!isLoading ? (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TeacherListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={learningExperienceList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredDiver.map((row) => {
                      const { id, degree, nameOfUniversity, fromTime, toTime } = row;
                      const isItemSelected = selected.indexOf(degree) !== -1;
                      return (
                        <TableRow
                          onClick={() => {
                            handleOpen();
                            setCurrentStudent(row);
                            setIsEdit(true);
                          }}
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} /> */}
                          </TableCell>
                          <TableCell align="left">{degree}</TableCell>
                          <TableCell align="left">{nameOfUniversity}</TableCell>
                          <TableCell align="left">{convertUTCDateToLocalDate(fromTime)}</TableCell>
                          <TableCell align="left">{convertUTCDateToLocalDate(toTime)}</TableCell>
                          {/* <TableCell align="left">
                            <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}>
                              Status
                            </Label>
                          </TableCell> */}
                          {/* <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(status == 0 && 'error') || 'success'}
                            >
                              {status == 1 ? 'Available' : 'deleted'}
                            </Label>
                          </TableCell> */}

                          {/* <TableCell align="right">
                            <TeacherMoreMenu diverID={id.toString()} status="1" />
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                    {/* {emptyRows && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                  {isDiverNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            ) : (
              <Stack sx={{ mt: 3 }} alignItems="center">
                <CircularProgress />
              </Stack>
            )}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
