import faker from 'faker';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  LinearProgress,
  Divider
} from '@material-ui/core';
// utils
import { fPercent } from '../../../utils/formatNumber';
//
import { MHidden } from '../../@material-extend';
import { varFadeInUp, varFadeInRight, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const SKILLS = [
  {
    label: 'Development',
    value: faker.datatype.number({ min: 79, max: 99, precision: 0.1 })
  },
  {
    label: 'Design',
    value: faker.datatype.number({ min: 79, max: 99, precision: 0.1 })
  },
  {
    label: 'Marketing',
    value: faker.datatype.number({ min: 79, max: 99, precision: 0.1 })
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left'
  }
}));

// ----------------------------------------------------------------------

type ProgressItemProps = {
  progress: {
    label: string;
    value: number;
  };
};

function ProgressItem({ progress }: ProgressItemProps) {
  const { label, value } = progress;
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fPercent(value)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-determinate': { bgcolor: 'divider' }
        }}
      />
    </Box>
  );
}

export default function AboutWhat() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={5}>
            <MotionInView variants={varFadeInRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                THPT Chuyên Nguyễn Bỉnh Khiêm
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}
              >
                Trường THPT Nguyễn Bỉnh Khiêm ngày nay với tên gọi ban đầu là trường PTTH Châu Thành
                được thành lập vào ngày 15/08/1983, gồm 2 phân hiệu: ở Cần Đăng và ở Quản Cơ Thành,
                đến năm học 1985-1986 nhập lại thành một điểm tại vị trí hiện nay, cặp quốc lộ 91,
                ấp Hòa Long 3, thị trấn An Châu, huyện Châu Thành, tỉnh An Giang.
              </Typography>
            </MotionInView>
            <Divider sx={{ my: 2, mx: 'auto', height: 10 }} />
            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}
              >
                Trong suốt thời gian qua, nhà trường đã có bước phát triển mạnh mẽ về nhiều mặt. Cơ
                sở vật chất, trang thiết bị phục vụ dạy học được tăng cường. Đội ngũ CBQL, GV, NV
                đảm bảo số lượng và cơ cấu. Tổ chức và hoạt động luôn được quan tâm đổi mới, đã tạo
                sự chuyển biến đáng kể về chất lượng và hiệu quả giáo dục.
              </Typography>
            </MotionInView>

            {/* <MotionInView variants={varFadeInRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
              >
                Check out our work
              </Button>
            </MotionInView> */}
          </Grid>
          <MHidden width="mdDown">
            <Grid item xs={12} md={12} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      component="img"
                      src="/static/about/about_image.jpg"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow
                      }}
                    />
                  </MotionInView>
                </Grid>
                <Grid item xs={6}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      width="maxWidth"
                      component="img"
                      src="/static/about/about_image_3.jpg"
                      sx={{ borderRadius: 2 }}
                    />
                  </MotionInView>
                </Grid>
                <Grid item xs={6}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      width="maxWidth"
                      component="img"
                      src="/static/about/about_image_2.jpg"
                      sx={{ borderRadius: 2 }}
                    />
                  </MotionInView>
                </Grid>
              </Grid>
            </Grid>
          </MHidden>
        </Grid>
      </Container>
    </RootStyle>
  );
}
