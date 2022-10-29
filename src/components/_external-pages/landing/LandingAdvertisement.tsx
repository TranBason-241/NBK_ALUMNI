import { motion } from 'framer-motion';
// material
import { styled } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Stack,
  Link,
  IconButton
} from '@material-ui/core';
//
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Logo from 'components/Logo';
import { PATH_PAGE } from 'routes/paths';
import { varFadeInDown, varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill }
  // { name: 'Linkedin', icon: linkedinFill },
  // { name: 'Twitter', icon: twitterFill }
];

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
      { name: 'FAQs', href: PATH_PAGE.faqs }
    ]
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  },
  {
    headline: 'Contact',
    children: [
      { name: 'support@minimals.cc', href: '#' },
      { name: 'Los Angeles, 359  Hidden Valley Road', href: '#' }
    ]
  }
];

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 56,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center'
  }
}));
const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'primary.main'
  // backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingAdvertisement() {
  // Bảng đồ và contact
  return (
    <Container maxWidth="lg">
      <RootStyle>
        <Divider />
        <Container maxWidth="lg" sx={{ pt: 10 }}>
          <Grid
            container
            justifyContent={{ xs: 'center', md: 'space-between' }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            {/* <Grid item xs={12} sx={{ mb: 3 }}>
              <ScrollLink to="move_top" spy smooth>
                <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
              </ScrollLink>
            </Grid> */}
            <Grid item xs={8} md={3}>
              <Typography
                component="p"
                variant="overline"
                sx={{ pr: { md: 5 }, color: 'primary.main' }}
              >
                Mạng lưới cựu sinh viên THPT Chuyên Nguyễn Bỉnh Khiêm
              </Typography>

              <Stack
                spacing={1.5}
                direction="row"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
              >
                {SOCIALS.map((social) => (
                  <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                    <Icon icon={social.icon} width={16} height={16} />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {/* <Grid item xs={12} md={7}>
              <Stack
                spacing={5}
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
              >
                {LINKS.map((list) => {
                  const { headline, children } = list;
                  return (
                    <Stack key={headline} spacing={2}>
                      <Typography component="p" variant="overline">
                        {headline}
                      </Typography>
                      {children.map((link) => (
                        <Link
                          to={link.href}
                          key={link.name}
                          color="inherit"
                          variant="body2"
                          component={RouterLink}
                          sx={{ display: 'block' }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </Stack>
                  );
                })}
              </Stack>
            </Grid>
          </Grid> */}

            <Grid item xs={12} md={7}>
              <Stack
                spacing={5}
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
              >
                <Stack spacing={2}>
                  <Typography textAlign="center" component="p" variant="overline">
                    Địa chỉ: 157 Phạm Thái Bường - Phường 4 - TP Vĩnh Long - Vĩnh Long
                  </Typography>
                  <Typography textAlign="center" component="p" variant="body2">
                    Phone: 02703822734 | Fax: Đang cập nhật | Email:
                    c3nguyenbinhkhiem@vinhlong.edu.vn
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          {/* <Typography
            component="p"
            variant="body2"
            sx={{
              mt: 10,
              pb: 5,
              fontSize: 13,
              textAlign: { xs: 'center', md: 'left' }
            }}
          ></Typography> */}
        </Container>
      </RootStyle>
    </Container>
  );
}
