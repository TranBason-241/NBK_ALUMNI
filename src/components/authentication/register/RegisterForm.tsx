import * as Yup from 'yup';
import { useState, useCallback, useReducer, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { useSnackbar } from 'notistack5';
import moment from 'moment';
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
  FormHelperText,
  Autocomplete
} from '@material-ui/core';
import { LoadingButton, DatePicker } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { ActionMap, AuthState, AuthUser } from '../../../@types/authentication';
import { MIconButton } from '../../@material-extend';
import { UploadAvatar } from '../../upload';
import { options } from './city';
// ----------------------------------------------------------------------

type InitialValues = {
  name: string;
  dob: any;
  cityId: string;
  email: string;
  phone: string;
  imageUrl: string;
};

enum Types {
  Initial = 'INITIALISE'
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [imageFILE, setImageFILE] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [city, setCity] = useState(options[0]);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Số điện thoại phải là 10 số')
      .min(10, 'Số điện thoại phải là 10 số')
      .max(10, 'Số điện thoại phải là 10 số'),
    dob: Yup.string().required('Ngày sinh là bắt buộc').nullable(true)
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: user?.displayName || '',
      dob: null,
      cityId: '',
      email: user?.email || '',
      phone: user?.phoneNumber || '',
      imageUrl: user?.photoURL || ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('Name', values.name);
        bodyFormData.append('DateOfBirth', moment(values.dob).format('YYYY-MM-DD'));
        bodyFormData.append('CityId', city.id.toString());
        bodyFormData.append('Email', values.email);
        bodyFormData.append('Phone', values.phone);
        if (imageFILE != null && imageFILE != '') {
          bodyFormData.append('imageFile', imageFILE);
        } else {
          bodyFormData.append('imageFile', values.imageUrl);
        }

        await manageStudent.createStudent(bodyFormData).then((response) => {
          if (response.status == 200) {
            axios
              .get('/api/v1/account-info', {
                params: { jwtToken: response.data.token }
              })
              .then((response) => {
                const user = response.data;
                dispatch({
                  type: Types.Initial,
                  payload: {
                    isAuthenticated: true,
                    user
                  }
                });
                enqueueSnackbar('Đăng kí thành công', {
                  variant: 'success',
                  action: (key) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                      <Icon icon={closeFill} />
                    </MIconButton>
                  )
                });
              });
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
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(touched.dob && errors.dob)}
                        helperText={touched.dob && errors.dob}
                      />
                    )}
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
                    disabled
                    fullWidth
                    autoComplete="email"
                    type="email"
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
                <Autocomplete
                  value={city}
                  onChange={(e, values: any | null) => setCity(values)}
                  getOptionLabel={(option: any) => option.name}
                  id="cityId"
                  options={options}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Thành phố" />}
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
