import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography, Stack, StackProps } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#FFF169',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left'
    }
  })
);

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'absolute'
  // [theme.breakpoints.up('lg')]: {
  //   right: '8%',
  //   width: 'auto',
  //   height: '48vh'
  // }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate">
        <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <HeroImgStyle alt="hero" src="/static/home/THPT_VL_background.jpg" variants={varFadeInUp} />

        <Container maxWidth="md">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                <br /> NGUYEN BINH KHIEM
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;A
                  <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                    LUMNI
                  </Typography>
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography variant="h3" sx={{ color: 'common.white' }}>
                Mạng lưới cựu sinh viên THPT Nguyễn Bỉnh Khiêm
              </Typography>
            </motion.div>

            <Stack
              component={motion.div}
              variants={varFadeInRight}
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Box sx={{ borderRadius: '50%' }}>
                {' '}
                <img alt="NBK logo" src="/static/home/NBK_logo.jpg" width={70} height={60} />
              </Box>

              <Link
                underline="always"
                href="https://c3nguyenbinhkhiem.vinhlong.edu.vn/?fbclid=IwAR2KBheaoXqj6CP9T2EgrNpciNX77XV-XkOisxqE7RUYzTJHV1Kx229y7ek"
                target="_blank"
                color="common.white"
                sx={{ typography: 'body2' }}
              >
                {/* Preview in Sketch Cloud */}
                Trường THPT Chuyên Nguyễn Bỉnh Khiêm, Thành phố Vĩnh Long, tỉnh Vĩnh Long, Việt Nam
              </Link>
            </Stack>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Live preview
              </Button>
            </motion.div>

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <motion.img variants={varFadeInRight} src="/static/home/facebook-svgrepo-com.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/website-svgrepo-com.svg" />
              {/* <motion.img variants={varFadeInRight} src="/static/home/ic_m_material.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_react.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_js.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_ts.svg" /> */}
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
