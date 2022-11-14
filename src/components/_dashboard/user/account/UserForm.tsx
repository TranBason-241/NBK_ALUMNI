import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik, yupToFormErrors } from 'formik';

// lang
import useLocales from 'hooks/useLocales';

// material
import { styled } from '@material-ui/core/styles';
import { DatePicker, LoadingButton, TabPanel } from '@material-ui/lab';
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
import { RootState, useSelector } from 'redux/store';
import { manageStudent } from '_apis_/student';
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
import LearningExperiencesList from './LearningExperiencesList';
import WorkExperiencesList from './WorkExperiencesList';

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
  const countryList = useSelector((state: RootState) => state.country.countryList);
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
      cityId: currentStudent?.cityId || '',
      classId: currentStudent?.classId || '',
      positionId: currentStudent?.positionId || '',
      learningExperiences: currentStudent?.learningExperiences || [],
      workExperiences: currentStudent?.workExperiences || []
    },
    // validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let flag = false;
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
        bodyFormData.append('Phone', values.phone);
        bodyFormData.append('ClassId', values.classId);
        bodyFormData.append('PositionId', values.positionId);
        bodyFormData.append('CityName', values.cityName);
        values.learningExperiences.forEach((element) => {
          bodyFormData.append('learningExperiences', element);
        });
        values.workExperiences.forEach((element) => {
          bodyFormData.append('workExperiences', element);
        });
        await manageStudent.updateStudent(bodyFormData).then((response) => {
          if (response.status == 200) {
            flag = true;
          }
        });
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

  useEffect(() => {
    // setEnumStatus(statusOptions.find((e) => e.id == currentGroupRole?.status) || null);
    setFieldValue('cityId', countryList.find((e) => e.id == currentStudent?.cityId) || null);
  }, [currentStudent]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={valueTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Thông tin cơ bản" value="General" />
            <Tab label="Bằng cấp" value="learningExperiences" disabled={!isEdit} />
            <Tab label="Kinh nghiệm làm viêc" value="workExperiences" disabled={!isEdit} />
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

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
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
        <TabPanel value="learningExperiences">
          <LearningExperiencesList classId="1" />
        </TabPanel>
        <TabPanel value="workExperiences">
          <WorkExperiencesList classId="1" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
