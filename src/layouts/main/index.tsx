import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption" component="p">
              © Copyright 2022 - Mạng lưới Cựu sinh viên THPT Chuyên Nguyễn Bỉnh Khiêm - Website
              đang hoạt động thử nghiệm
              <br /> made by &nbsp;
              <Link href="*">Phuong LHK</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
