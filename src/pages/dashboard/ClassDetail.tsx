import axios from 'axios';
import { filter } from 'lodash';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
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
  Box,
  Tab,
  Tabs
} from '@material-ui/core';

import useAuth from 'hooks/useAuth';
// lang
import useLocales from 'hooks/useLocales';
import StudentListToolbar from 'components/_dashboard/student/list/StudentToolBar';
import StudentListHead from 'components/_dashboard/student/list/StudentListHead';
import { getListTeacherAll } from 'redux/slices/teacher';
import TeacherDialog from 'components/_dashboard/teacher/dialog/TeacherDialog';
import StudentDialog from 'components/_dashboard/teacher/dialog/StudentDialog';
import { getClassDetail } from 'redux/slices/class';
import { getListStudentByClassId } from 'redux/slices/student';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import TeacherList from 'components/_dashboard/teacher/TeacherList';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { Teacher } from '../../@types/teacher';
import { Student } from '../../@types/student';

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

function applySortFilter(array: Student[], comparator: (a: any, b: any) => number, query: string) {
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

export default function ClassDetail() {
  const { classId } = useParams();
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  // const diverList = useSelector((state: RootState) => state.diver.diverList);
  const classDetail = useSelector((state: RootState) => state.class.class);
  // Student
  const studentList = useSelector((state: RootState) => state.student.ClassStudentList);
  const totalCount = useSelector((state: RootState) => state.student.totalCount);
  const isLoading = useSelector((state: RootState) => state.student.isLoading);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentStudent, setCurrentStudent] = useState<Student>();
  const [open, setOpen] = useState(false);
  const TABLE_HEAD = [
    { id: 'name', label: 'Tên', alignRight: false },
    { id: 'address', label: 'Địa chỉ', alignRight: false },
    { id: 'number', label: 'Số điện thoại', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false }
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
      const newSelecteds = studentList.map((n) => n.name);
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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  useEffect(() => {
    dispatch(getListTeacherAll(rowsPerPage, page));
    dispatch(getListStudentByClassId(classId, rowsPerPage, page));
    dispatch(getClassDetail(classId));
  }, [dispatch, rowsPerPage, page]);

  const emptyRows = !isLoading && !studentList;

  const filteredDiver = applySortFilter(studentList, getComparator(order, orderBy), filterName);

  const isStudentNotFound = studentList.length === 0 && isLoading;

  const [valueTab, setValueTab] = useState('student');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  return (
    <Page title="Chi tiết lớp học | PJ School">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết lớp học"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.class.myClass },
            { name: 'Danh sách Lớp học', href: PATH_DASHBOARD.class.myClass },
            { name: 'Lớp', href: PATH_DASHBOARD.root }
          ]}
        />

        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Danh sách học sinh" value="student" />
              <Tab label="Danh sách giáo viên" value="teacher" />
            </TabList>
          </Box>
          {/* Student tab */}
          <TabPanel value="student">
            <Card>
              <Stack spacing={6}>
                <Card color="green" sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Lớp {classDetail.name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>Năm học: {classDetail.year}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: 'inline'
                          }}
                        >
                          Sĩ số: {classDetail.quantity}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography>Giáo viên chủ nhiệm: {classDetail.teacherName}</Typography>
                      </Grid>
                      {/* <Grid item xs={6}>
                    <Typography>sssss</Typography>
                  </Grid> */}
                    </Grid>
                  </Stack>
                </Card>
              </Stack>
              <StudentListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <StudentDialog open={open} student={currentStudent!} handleClose={handleClose} />
                {!isLoading ? (
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <StudentListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={studentList.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredDiver.map((row) => {
                          const { id, name, phone, email, cityName } = row;
                          const isItemSelected = selected.indexOf(name) !== -1;
                          return (
                            <TableRow
                              onClick={() => {
                                handleOpen();
                                setCurrentStudent(row);
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
                              {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={imageUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                              <TableCell align="left">{name}</TableCell>
                              <TableCell align="left">{cityName}</TableCell>
                              <TableCell align="left">{phone}</TableCell>
                              <TableCell align="left">{email}</TableCell>
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
                      {isStudentNotFound && (
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
          </TabPanel>
          <TabPanel value="teacher">
            <TeacherList classId={classId} />
          </TabPanel>
        </TabContext>
      </Container>
    </Page>
  );
}
