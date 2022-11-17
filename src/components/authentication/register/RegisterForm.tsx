import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { useSnackbar } from 'notistack5';
import { format } from 'date-fns';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { fData } from 'utils/formatNumber';
import { manageStudent } from '_apis_/student';

// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Grid,
  Box,
  Typography,
  Card,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton, DatePicker } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import { UploadAvatar } from '../../upload';
// ----------------------------------------------------------------------

type InitialValues = {
  name: string;
  dob: any;
  cityId: string;
  email: string;
  phone: string;
  imageUrl: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [imageFILE, setImageFILE] = useState('');

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: '',
      dob: null,
      cityId: '',
      email: '',
      phone: '',
      imageUrl: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('Name', values.name);
        bodyFormData.append('DateOfBirth', format(values.dob, 'yyyy-mm-dd'));
        bodyFormData.append('CityId', values.cityId);
        bodyFormData.append('Email', values.email);
        bodyFormData.append('Phone', values.phone);
        bodyFormData.append('imageFile', imageFILE);

        await manageStudent.createStudent(bodyFormData).then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            enqueueSnackbar('Đăng kí thành công', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
            navigate(PATH_DASHBOARD.root);
          } else {
            enqueueSnackbar('Đăng kí thất bại', {
              variant: 'error',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
          }
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          // setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImageFILE(file);
      if (file) {
        setFieldValue('imageUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.imageUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.imageUrl && errors.imageUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Chấp nhận *.jpeg, *.jpg, *.png, *.gif
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.imageUrl && errors.imageUrl}
                </FormHelperText>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Tên đầy đủ"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <DatePicker
                    maxDate={new Date()}
                    label="Ngày sinh"
                    {...getFieldProps('dob')}
                    onChange={(newValue: any) => {
                      setFieldValue('dob', newValue);
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />

                  <TextField
                    fullWidth
                    autoComplete="email"
                    type="email"
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="cityId"
                  {...getFieldProps('cityId')}
                  error={Boolean(touched.cityId && errors.cityId)}
                  helperText={touched.cityId && errors.cityId}
                />
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Đăng ký
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
