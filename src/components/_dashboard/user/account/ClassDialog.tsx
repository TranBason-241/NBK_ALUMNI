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

//
import { fDate } from '../../../../utils/formatTime';
import { Teacher } from '../../../../@types/teacher';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../../animate';
import { CarouselControlsArrowsBasic2 } from '../../../carousel';
import { Class } from '../../../../@types/class';

type ClassDialogProps = {
  studentClass: Class;
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
  const countryList = useSelector((state: RootState) => state.country.countryList);
  const majorList = useSelector((state: RootState) => state.major.majorList);
  const descriptionElementRef = useRef<HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    // setFieldValue('countryId', countryList.find((e) => e.id == studentClass?.countryId) || null);
    // setFieldValue('majorId', majorList.find((e) => e.id == studentClass?.majorId) || null);
    // setEnumStatus(statusOptions.find((e) => e.id == studentClass?.status) || null);
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open, studentClass]);
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Nơi cấp là bắt buộc')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: studentClass?.id || ''
    },
    // validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let flag = false;
      try {
        // bodyFormData.append('Id', values.id);
        if (!isEdit) {
          const data = {
            name: values.id
          };
          // Create
          await manageWorkExperience.createWorkExperience(data).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getWorkExperience('1', 5, 1));
            }
          });
        } else {
          const data = {
            id: values.id.toString()
          };
          // update
          await manageWorkExperience.updateWorkExperience(data).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getWorkExperience('1', 5, 1));
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
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

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
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <DatePicker
                          views={['year']}
                          maxDate={new Date()}
                          label="Năm học"
                          {...getFieldProps('startTime')}
                          onChange={(newValue: any) => {
                            setFieldValue('startTime', newValue);
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
                          id="majorId"
                          {...getFieldProps('majorId')}
                          options={majorList}
                          getOptionLabel={(option: any) => (option ? option.name : '')}
                          onChange={(e, value: any) => {
                            setFieldValue('majorId', value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Chuyên ngành"
                              error={Boolean(touched.id && errors.id)}
                              helperText={touched.id && errors.id}
                            />
                          )}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          clearIcon
                          id="countryId"
                          {...getFieldProps('countryId')}
                          options={countryList}
                          getOptionLabel={(option: any) => (option ? option.name : '')}
                          onChange={(e, value: any) => {
                            setFieldValue('countryId', value);
                            console.log(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Nơi làm việc"
                              error={Boolean(touched.id && errors.id)}
                              helperText={touched.id && errors.id}
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
