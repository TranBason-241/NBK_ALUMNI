import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik, yupToFormErrors } from 'formik';

// lang
import useLocales from 'hooks/useLocales';

// material
import { styled } from '@material-ui/core/styles';
import { LoadingButton, TabPanel } from '@material-ui/lab';
import {
  Card,
  Box,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  Tabs,
  Button,
  Tab
} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
// utils

// import TechInforPassword from './TechInforPassword';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types

// import { TechInfo } from '../../../@types/techInfo';
//
import { QuillEditor } from '../../../editor';
import { UploadAvatar } from '../../../upload';
import { Student } from '../../../../@types/student';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// type OptionStatus = {
//   id: number;
//   label: string;
// };

// const status = ['Deleted', 'Available'];

// const statusOptions = status.map((v, index) => ({
//   id: index,
//   label: v
// }));
// ----------------------------------------------------------------------

type UserInfoNewFormProps = {
  isEdit: boolean;
  currentStudent?: Student;
  reload: any;
};

export default function UserForm({ isEdit, currentStudent, reload }: UserInfoNewFormProps) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const [valueTab, setValueTab] = useState('General');
  const { enqueueSnackbar } = useSnackbar();
  const [imageFILE, setImageFILE] = useState('');
  const [selectedTab, setSelectedTab] = useState('');
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(translate('model.techInfo.validate.name')),
    phone: Yup.string()
      .required()
      .matches(/^[0-9]+$/, translate('model.techInfo.validate.phone.matches'))
      .min(10, translate('model.techInfo.validate.phone.min'))
      .max(10, translate('model.techInfo.validate.phone.max'))
      .required(translate('model.techInfo.validate.phone.required')),
    email: Yup.string()
      .email(translate('model.techInfo.validate.email.matches'))
      .required(translate('model.techInfo.validate.email.required')),
    address: Yup.string().required(translate('model.techInfo.validate.address'))
  });

  const PassWordSchema = Yup.object().shape({
    oldPass: Yup.string().required('Old password is required'),
    newPass: Yup.string()
      .required()
      .min(6, 'Password must be more than 10 characters')
      .max(20, 'Password must be less than 20 characters')
      .required(' New password is required'),
    confirmPass: Yup.string()
      .required()
      .min(6, 'Password must be more than 10 characters')
      .max(20, 'Password must be less than 20 characters')
      .required('Confirm password is required')
  });

  useEffect(() => {
    // setEnumStatus(statusOptions.find((e) => e.id == currentGroupRole?.status) || null);
    console.log(currentStudent);
  }, [currentStudent]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: currentStudent?.id || '',
      name: currentStudent?.name || '',
      dateOfBirth: currentStudent?.dateOfBirth || '',
      imageUrl: currentStudent?.imageUrl || '',
      phone: currentStudent?.phone || '',
      email: currentStudent?.email || '',
      cityName: currentStudent?.cityName || '',
      cityId: currentStudent?.cityId || ''
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const flag = false;
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('Id', values.id);
        bodyFormData.append('Name', values.name);
        bodyFormData.append('Phone', values.phone);
        bodyFormData.append('Email', values.email);
        bodyFormData.append('imageFile', imageFILE);
        bodyFormData.append('imageUrl', values.imageUrl);

        // await manageTechInfo.updateTechInfo(bodyFormData).then((response) => {
        //   if (response.status == 200) {
        //     flag = true;
        //   }
        // });
        if (flag) {
          resetForm();
          setSubmitting(false);
          enqueueSnackbar(
            !isEdit
              ? translate('model.snackBar.CreateSuccess')
              : translate('model.snackBar.CreateError'),
            {
              variant: 'success'
            }
          );
          // navigate(PATH_DASHBOARD.techInfo.information);
          reload();
        } else {
          enqueueSnackbar(
            !isEdit
              ? translate('model.snackBar.UdpateSuccess')
              : translate('model.snackBar.UpdateError'),
            { variant: 'error' }
          );
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={valueTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Thông tin cơ bản" value="General" />
            <Tab label="Mật khẩu" value="Change Password" disabled={!isEdit} />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="General">
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
                            Allowed *.jpeg, *.jpg, *.png, *.gif
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
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Họ và tên"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <TextField
                          type="date"
                          fullWidth
                          label="Ngày sinh"
                          {...getFieldProps('dateOfBirth')}
                          error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Địa chỉ"
                          {...getFieldProps('cityName')}
                          error={Boolean(touched.cityName && errors.cityName)}
                          helperText={touched.cityName && errors.cityName}
                        />
                        <Button onClick={() => {}}>test</Button>
                      </Stack>

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
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </TabPanel>
        {/* <TechInforPassword /> */}
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}
