import { motion } from 'framer-motion';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography, Grid } from '@material-ui/core';
//
import { varFadeIn, varWrapEnter, varFadeInRight, TextAnimate } from '../../animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Bali',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(239) 555-0108'
  },
  {
    country: 'London',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(319) 555-0115'
  },
  {
    country: 'Prague',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(252) 555-0126'
  },
  {
    country: 'Moscow',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(307) 555-0133'
  }
];

const RootStyle = styled(motion.div)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/static/overlay.svg), url(/static/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10)
  }
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Liên hệ" sx={{ color: 'primary.main' }} variants={varFadeInRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="Với" sx={{ mr: 2 }} />
            <TextAnimate text="chúng" sx={{ mr: 2 }} />
            <TextAnimate text="tôi" />
          </Box>

          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pr: { md: 5 } }}>
              <motion.div variants={varFadeIn}>
                <Typography variant="h3" paragraph>
                  Thông tin liên hệ
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h6">
                  Trường THPT Chuyên Nguyễn Bỉnh Khiêm - Thành phố Vĩnh Long
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="body2">
                  ĐỊA CHỈ: 157 PHẠM THÁI BƯỜNG - PHƯỜNG 4 - TP VĨNH LONG - VĨNH LONG
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="body2">
                  Phone: 02703822734 | Fax: Đang cập nhật | Email: c3nguyenbinhkhiem@vinhlong.edu.vn
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
