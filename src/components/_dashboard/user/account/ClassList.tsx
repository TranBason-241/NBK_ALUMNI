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
import { Class } from '../../../../@types/class';
import ClassCard from '../cards/ClassCard';

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

export default function ClassList() {
  const { translate } = useLocales();
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  // const diverList = useSelector((state: RootState) => state.diver.diverList);
  //   const teacherList = useSelector((state: RootState) => state.teacher.teacherListAll);
  const workExperienceList = useSelector(
    (state: RootState) => state.workExperience.workExperienceList
  );

  const isLoading = useSelector((state: RootState) => state.workExperience.isLoading);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentStudent, setCurrentStudent] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const classList = useSelector((state: RootState) => state.class.classList);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {}, [dispatch]);

  const listCLassGrade = ['10', '11', '13'];
  function convertUTCDateToLocalDate(date: any) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }
  return (
    <Page title="Danh sách giáo viên | PJ School">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card sx={{ height: '30vh', mt: 5 }}>
          <Grid container spacing={2}>
            {listCLassGrade?.map((item: string, index: number) => {
              const a = classList.find((e: Class) => e.grade == item);
              console.log(a);
              return (
                <Grid key={index} item xs={4} md={4}>
                  <ClassCard studentClass={a} index={index} />
                </Grid>
              );
            })}
            {/* {listCLassGrade?.map((item: string, index: number) =>
              classList.find((e: Class) => e.grade == item) != undefined ? (
                <Grid key={index} item xs={4} md={4}>
                  <ClassCard studentClass={null} index={index} />
                </Grid>
              ) : (
                <></>
              )
            )} */}
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
