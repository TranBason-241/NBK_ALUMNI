import { useEffect, useRef, useState } from 'react';

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
  open,
  experience,
  isEdit
}: StudentDialogProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  // const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
  //   teacher!;
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: experience?.id || '',
      name: experience?.name || '',
      dateOfBirth: experience?.dateOfBirth || '',
      imageUrl: experience?.imageUrl || '',
      phone: experience?.phone || '',
      email: experience?.email || '',
      cityName: experience?.cityName || '',
      cityId: experience?.cityId || '',
      classId: experience?.classId || '',
      positionId: experience?.positionId || '',
      learningExperiences: experience?.learningExperiences || [],
      workExperiences: experience?.workExperiences || []
    },
    // validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const flag = false;
      console.log(values);
      try {
        console.log(values.name);
        const bodyFormData = new FormData();
        bodyFormData.append('Id', values.id);
        bodyFormData.append('Name', values.name);
        bodyFormData.append('DateOfBirth', values.phone);
        // bodyFormData.append('imageFile', imageFILE);
        bodyFormData.append('ImageUrl', values.imageUrl);
        bodyFormData.append('Email', values.email);
        // await manageStudent.updateStudent(bodyFormData).then((response) => {
        //   if (response.status == 200) {
        //     flag = true;
        //   }
        // });
        if (flag) {
          resetForm();
          setSubmitting(false);
          enqueueSnackbar(!isEdit ? 'Thêm mới thành công' : 'Thêm mới thất bại', {
            variant: 'success'
          });
          // navigate(PATH_DASHBOARD.techInfo.information);
          // reload();
        } else {
          enqueueSnackbar(!isEdit ? 'Cập nhật thành công' : 'Cập nhật thất bại', {
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
        maxWidth="lg"
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
                        <TextField
                          fullWidth
                          label="Họ và tên"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <DatePicker
                          maxDate={new Date()}
                          label="Ngày sinh"
                          {...getFieldProps('dateOfBirth')}
                          onChange={(newValue: any) => {
                            setFieldValue('dateOfBirth', newValue);
                          }}
                          renderInput={(params: any) => <TextField {...params} />}
                        />
                      </Stack>

                      {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                          <Autocomplete
                            fullWidth
                            disablePortal
                            clearIcon
                            id="cityId"
                            {...getFieldProps('cityId')}
                            options={countryList}
                            getOptionLabel={(option: any) => (option ? option.name : '')}
                            onChange={(e, value: any) => {
                              setFieldValue('cityId', value);
                              console.log(value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Địa chỉ"
                                error={Boolean(touched.cityId && errors.cityId)}
                                helperText={touched.cityId && errors.cityId}
                              />
                            )}
                          />
                        </Stack> */}

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Số điện thoại"
                          {...getFieldProps('phone')}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                          type="phone"
                        />
                        <TextField
                          fullWidth
                          label="email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>

                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          Lưu thay đổi
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
