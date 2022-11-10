import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// coral api
// material
import { Container } from '@material-ui/core';
// lang
import useLocales from 'hooks/useLocales';
import { manageStudent } from '_apis_/student';
import UserForm from 'components/_dashboard/user/account/UserForm';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';

import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { Student } from '../../@types/student';

// ----------------------------------------------------------------------

export default function UserInformation() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useAuth();
  //   const isEdit = pathname.includes('edit');
  const isEdit = true;
  const { name } = useParams();
  const { translate } = useLocales();
  const [currentStudent, setCurrentStudent] = useState<Student>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await manageStudent.getStudentById('1').then((response) => {
      if (response.status == 200) {
        const data = {
          id: response.data.id,
          name: response.data.name,
          dateOfBirth: response.data.dateOfBirth,
          cityId: response.data.cityId,
          imageUrl: response.data.imageUrl,
          email: response.data.email,
          phone: response.data.phone,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          // thêm
          isAlive: response.data.isAlive,
          classId: response.data.classId,
          positionId: response.data.positionId,
          cityName: response.data.cityName,
          learningExperiences: response.data.learningExperiences,
          workExperiences: response.data.workExperiences
        };

        setCurrentStudent(data);
        // console.log(response.data);
      }
    });
  };

  const reload = () => {
    fetchData();
  };

  return (
    <Page title="Thông tin cá nhân | PJSchool">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Thông tin cá nhân')}
          links={[
            { name: translate('Trang chủ'), href: PATH_DASHBOARD.root },

            { name: 'Thông tin' }
          ]}
        />
        <UserForm key="19" reload={reload} isEdit={isEdit} currentStudent={currentStudent} />
      </Container>
    </Page>
  );
}
