import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { DialogProps } from '@material-ui/core/Dialog';
import { Form, FormikProvider, useFormik, yupToFormErrors } from 'formik';
import { DatePicker, LoadingButton, TabPanel } from '@material-ui/lab';
// material

import {
  Box,
  Card,
  Container,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Grid,
  Stack,
  TextField,
  Autocomplete
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { fontStyle } from '@material-ui/system';
import TeacherList from 'pages/dashboard/TeacherList';
import { useSnackbar } from 'notistack5';
import { manageLearningExperience } from '_apis_/learningExperience';
import { dispatch, RootState } from 'redux/store';
import { getLearningExperience } from 'redux/slices/learningExperience';
import { OptionStatus, statusOptions } from 'utils/constants';
import { manageWorkExperience } from '_apis_/workExperience';
import { getWorkExperience } from 'redux/slices/workExperience';
import { getListClass, getListClassByYear } from 'redux/slices/class';
import { manaClass } from '_apis_/class';

//
import { fDate } from '../../../../utils/formatTime';
import { Teacher } from '../../../../@types/teacher';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../../animate';
import { CarouselControlsArrowsBasic2 } from '../../../carousel';
import { Class } from '../../../../@types/class';

type ClassDialogProps = {
  studentClass: any;
  handleClose: () => void;
  open: boolean;
  isEdit: boolean;
  grade: number;
  //   item?: Item;
};

function convertUTCDateToLocalDate(date: any) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
export default function ClassDialog({
  handleClose,
  isEdit,
  open,
  studentClass,
  grade
}: ClassDialogProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  // const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
  //   teacher!;
  const [enumStatus, setEnumStatus] = useState<OptionStatus | null>(null);
  const classOption = useSelector((state: RootState) => state.class.classListOption);
  const descriptionElementRef = useRef<HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Nơi cấp là bắt buộc')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      grade: studentClass?.grade || grade,
      classId: studentClass?.id || '',
      year: `${studentClass?.year}` || ''
      // year: '2010' || ''
    },
    // validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let flag = false;
      try {
        // bodyFormData.append('Id', values.id);
        if (!isEdit) {
          const data = {
            studentId: '1',
            classId: values?.classId?.id.toString()
          };

          await manaClass.addClassOfStudent(data).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getListClass('1'));
            }
          });
        } else {
          const data = {
            studentId: '1',
            classId: values?.classId?.id.toString(),
            positionId: '0'
          };
          // update
          await manaClass.updateClassOfStudent(data).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getListClass('1'));
            }
          });
        }
        if (flag) {
          resetForm();
          setSubmitting(false);
          enqueueSnackbar(!isEdit ? 'Thêm mới thành công' : 'Cập nhật thành công', {
            variant: 'success'
          });
        } else {
          enqueueSnackbar(!isEdit ? 'Thêm mới thất bại' : 'Cập nhật thất bại', {
            variant: 'error'
          });
        }
      } catch (error) {
        setSubmitting(false);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  useEffect(() => {
    dispatch(getListClassByYear(new Date(values?.year).getFullYear().toString(), values?.grade));
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open, studentClass, dispatch, values.year]);

  useEffect(() => {
    setFieldValue('classId', classOption.find((e) => e.id == studentClass?.id) || null);
  }, [studentClass, open, classOption]);

  return (
    <Box sx={{ width: '100%' }}>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        {/* <DialogTitle sx={{ pb: 2 }}>{teacher?.name}</DialogTitle> */}
        <DialogContent sx={{ width: '100%' }} dividers={scroll === 'paper'}>
          <Box sx={{ height: '30%', mt: 3 }}>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={3}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <h2>
                          {isEdit ? 'Chỉnh sửa lớp học của bạn' : 'Thêm thông tin về lớp học'}
                        </h2>
                        {/* <h1>{values?.year}</h1> */}
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <DatePicker
                          views={['year']}
                          maxDate={new Date()}
                          label="Năm học"
                          {...getFieldProps('year')}
                          onChange={(newValue: any) => {
                            setFieldValue('year', newValue);
                          }}
                          renderInput={(params: any) => <TextField {...params} />}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField disabled fullWidth label="Khối" value={grade} />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          clearIcon
                          id="classId"
                          {...getFieldProps('classId')}
                          options={classOption}
                          getOptionLabel={(option: any) => (option ? option.name : '')}
                          onChange={(e, value: any) => {
                            setFieldValue('classId', value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Tên lớp"
                              error={Boolean(touched.classId && errors.classId)}
                              helperText={touched.classId && errors.classId}
                            />
                          )}
                        />
                      </Stack>
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          {isEdit ? 'Lưu thay đổi' : 'Thêm mới'}
                        </LoadingButton>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
