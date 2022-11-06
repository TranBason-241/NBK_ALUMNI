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
          <Grid item xs={12} md={6} lg={6}>
            <MotionInView variants={varFadeInRight}>
              <Typography color="primary.main" variant="h2" sx={{ mb: 3 }}>
                THPT CHUYÊN NGUYỄN BỈNH KHIÊM
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}
              >
                Trường THPT chuyên Nguyễn Bỉnh Khiêm (Nguyen Binh Khiem High School for the Gifted),
                là trường chuyên của tỉnh Vĩnh Long được thành lập ngày 8/01/1992 theo Quyết định số
                31/QĐ.TCCB của Giám đốc Sở Giáo dục Đào tạo Vĩnh Long. Tuyển chọn và đào tạo học
                sinh năng khiếu cấp Trung học phổ thông các môn văn hóa, ngoại ngữ trên địa bàn toàn
                tỉnh Vĩnh Long.Từ năm học 1992 – 1993 trường được đổi tên thành trường THPT chuyên
                Nguyễn Bỉnh Khiêm theo Quyết định số 246/UBT ngày 29 tháng 7 năm 1992 của Chủ tịch
                UBND tỉnh Vĩnh Long.
              </Typography>
            </MotionInView>
            {/* <Divider sx={{ my: 2, mx: 'auto', height: 10 }} /> */}
            <br />
            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}
              >
                Năm học đầu tiên 1991 – 1992, trường chỉ có 60 học sinh của 3 lớp 10 chuyên và 08
                cán bộ, giáo viên, công nhân viên, cơ sở vật chất tạm bợ được ghép chung với Trung
                tâm hướng nghiệp dạy nghề của tỉnh. Năm học 1992 – 1993 được chuyển sang dùng chung
                cơ sở với trường Bổ túc văn hóa tại chức tỉnh, năm học này trường đã phát triển được
                13 lớp (có cả hệ THCS). Từ năm học 1996 – 1997, trường được tách riêng ra và chuyển
                về cơ sở mới (do trường Cao đẳng sư phạm Vĩnh Long để lại), bấy giờ chỉ có 1 khu học
                tập gồm 18 phòng học, chung quanh toàn là đất ruộng, nền thấp, luôn chịu ảnh hưởng
                của triều cường. Sau 25 năm thành lập, cơ sở vật chất được nâng cấp, nhà trường đã
                có đội ngũ 116 cán bộ, giáo viên, nhân viên và tập thể 27 lớp với 894 học sinh.
                Trường đã đạt được các tiêu chuẩn quy định đối với một trường THPT đạt chuẩn quốc
                gia.
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
            <Grid item xs={12} md={6} lg={6} sx={{ pr: { md: 7 } }}>
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
