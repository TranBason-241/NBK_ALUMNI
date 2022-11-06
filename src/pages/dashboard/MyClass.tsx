// material
import { Container, Grid } from '@material-ui/core';
import ClassCard from 'components/_dashboard/general-app/ClassCard';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  AppCurrentDownload,
  AppTotalActiveUsers,
  AppTopInstalledCountries
} from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function MyClass() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Lớp của tôi | PJ School">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <AppWelcome displayName={user?.displayName} />
          </Grid>

          <Grid item xs={12} md={3}>
            <></>
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassCard color="rgba(225,239,240,255)" />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassCard color="rgba(255,237,188,255)" />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassCard color="#FFCCCC" />
          </Grid>
          {/* 
          <Grid item xs={12} md={4}>
            <AppTotalInstalled />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalDownloads />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AppWidgets1 />
              </Grid>
              <Grid item xs={12}>
                <AppWidgets2 />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
