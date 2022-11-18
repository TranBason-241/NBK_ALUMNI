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
export default function WorkExperienceDialog({
  handleClose,
  isEdit,
  open,
  experience
}: StudentDialogProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  // const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
  //   teacher!;
  const { user } = useAuth();
  const [enumStatus, setEnumStatus] = useState<OptionStatus | null>(null);
  const countryList = useSelector((state: RootState) => state.country.countryList);
  const majorList = useSelector((state: RootState) => state.major.majorList);
  const descriptionElementRef = useRef<HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setFieldValue('countryId', countryList.find((e) => e.id == experience?.countryId) || null);
    setFieldValue('majorId', majorList.find((e) => e.id == experience?.majorId) || null);
    setEnumStatus(statusOptions.find((e) => e.id == experience?.status) || null);
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open, experience]);
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Nơi cấp là bắt buộc')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: experience?.id || '',
      // chuc vu
      name: experience?.name || '',
      majorId: experience?.majorId || '',
      countryId: experience?.countryId || '',
      studentId: experience?.istudentIdd || '1',
      startTime: experience?.startTime || '',
      endTime: experience?.endTime || '',
      workStatus: experience?.workStatus.toString() || '',
      // NEW
      majorName: experience?.majorName || '',
      studentName: experience?.studentName || '',
      countryName: experience?.countryName || ''
    },
    // validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let flag = false;
      try {
        // bodyFormData.append('Id', values.id);
        if (!isEdit) {
          const data = {
            name: values.name,
            majorId: values.majorId.id.toString(),
            majorName: values.majorId.name,
            countryId: values.countryId.id,
            studentId: user?.id,
            studentName: values.studentName,
            countryName: values.countryId.name,
            startTime: values.startTime,
            endTime: values.endTime,
            workStatus: enumStatus!.id.toString()
          };
          // Create
          await manageWorkExperience.createWorkExperience(data).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getWorkExperience(user?.id, 5, 1));
            }
          });
        } else {
          const data = {
            id: values.id.toString(),
            name: values.name,
            majorId: values.majorId.id.toString(),
            majorName: values.majorId.name,
            countryId: values.countryId.id,
            studentId: values.studentId.toString(),
            studentName: values.studentName,
            countryName: values.countryId.name,
            startTime: values.startTime,
            endTime: values.endTime,
            workStatus: enumStatus!.id.toString()
          };
          // update
          await manageWorkExperience.updateWorkExperience(data).then((response) => {
            if (response.status == 200) {
              flag = true;
              handleClose();
              dispatch(getWorkExperience(user?.id, 5, 1));
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
                          {isEdit
                            ? 'Chỉnh sửa kinh nghiệm làm việc'
                            : 'Thêm mới kinh nghiệm làm việc'}
                        </h2>
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
                            console.log(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Chuyên ngành"
                              error={Boolean(touched.majorId && errors.majorId)}
                              helperText={touched.majorId && errors.majorId}
                            />
                          )}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Chức vụ"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
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
                              error={Boolean(touched.countryId && errors.countryId)}
                              helperText={touched.countryId && errors.countryId}
                            />
                          )}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          clearIcon
                          id="workStatus"
                          value={enumStatus}
                          options={statusOptions}
                          getOptionLabel={(option: OptionStatus) => option.label}
                          // getOptionLabel={(option: any) => (option ? option.name : '')}
                          onChange={(e, values: OptionStatus | null) => setEnumStatus(values)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Trạng thái làm việc"
                              error={Boolean(touched.workStatus && errors.workStatus)}
                              helperText={touched.workStatus && errors.workStatus}
                            />
                          )}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <DatePicker
                          // maxDate={new Date()}
                          label="Thời gian bắt đầu"
                          {...getFieldProps('startTime')}
                          onChange={(newValue: any) => {
                            setFieldValue('startTime', newValue);
                          }}
                          renderInput={(params: any) => <TextField {...params} />}
                        />
                        <DatePicker
                          // maxDate={new Date()}
                          label="Thời gian kết thúc"
                          {...getFieldProps('endTime')}
                          onChange={(newValue: any) => {
                            setFieldValue('endTime', newValue);
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
