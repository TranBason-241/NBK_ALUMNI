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
  TextField
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { fontStyle } from '@material-ui/system';
import TeacherList from 'pages/dashboard/TeacherList';
import { useSnackbar } from 'notistack5';
import { manageLearningExperience } from '_apis_/learningExperience';
import { dispatch } from 'redux/store';
import { getLearningExperience } from 'redux/slices/learningExperience';
import useAuth from 'hooks/useAuth';
//
import { fDate } from '../../../../utils/formatTime';
import { Teacher } from '../../../../@types/teacher';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../../animate';
import { CarouselControlsArrowsBasic2 } from '../../../carousel';

type StudentDialogProps = {
  experience: any;
  handleClose: () => void;
  open: boolean;
  isEdit: boolean;
  //   item?: Item;
};

function convertUTCDateToLocalDate(date: any) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
export default function LearningExperienceDialog({
  handleClose,
  isEdit,
  open,
  experience
}: StudentDialogProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  // const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
  //   teacher!;
  const { user } = useAuth();
  const descriptionElementRef = useRef<HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const NewProductSchema = Yup.object().shape({
    degree: Yup.string().required('Tên bằng cấp là bắt buộc'),
    nameOfUniversity: Yup.string().required('Nơi cấp là bắt buộc')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: experience?.id || '',
      studentId: experience?.studentId || user?.id,
      countryId: experience?.countryId || 'VN',
      degree: experience?.degree || '',
      nameOfUniversity: experience?.nameOfUniversity || '',
      fromTime: experience?.fromTime || '',
      toTime: experience?.toTime || ''
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let flag = false;
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('Id', values.id);
        bodyFormData.append('StudentId', user?.id);
        bodyFormData.append('CountryId', values.countryId);
        bodyFormData.append('Degree', values.degree);
        bodyFormData.append('NameOfUniversity', values.nameOfUniversity);
        bodyFormData.append('FromTime', values.fromTime);
        bodyFormData.append('ToTime', values.toTime);
        if (!isEdit) {
          // Create
          await manageLearningExperience.createLearningExperience(values).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getLearningExperience(user?.id, 5, 0));
            }
          });
        } else {
          // update
          await manageLearningExperience.updateLearningExperience(values).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getLearningExperience(user?.id, 5, 0));
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
                        <h2>Thêm mới bằng cấp</h2>
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Tên bằng cấp"
                          {...getFieldProps('degree')}
                          error={Boolean(touched.degree && errors.degree)}
                          helperText={touched.degree && errors.degree}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Nơi cấp"
                          {...getFieldProps('nameOfUniversity')}
                          error={Boolean(touched.nameOfUniversity && errors.nameOfUniversity)}
                          helperText={touched.nameOfUniversity && errors.nameOfUniversity}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <DatePicker
                          // maxDate={new Date()}
                          label="Thời gian bắt đầu"
                          {...getFieldProps('fromTime')}
                          onChange={(newValue: any) => {
                            setFieldValue('fromTime', newValue);
                          }}
                          renderInput={(params: any) => <TextField {...params} />}
                        />
                        <DatePicker
                          // maxDate={new Date()}
                          label="Thời gian hoàn thành"
                          {...getFieldProps('toTime')}
                          onChange={(newValue: any) => {
                            setFieldValue('toTime', newValue);
                          }}
                          renderInput={(params: any) => <TextField {...params} />}
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
