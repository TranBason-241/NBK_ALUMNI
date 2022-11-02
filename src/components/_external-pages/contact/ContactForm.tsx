// material
import { Button, Typography, TextField, Stack } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack spacing={5}>
      <MotionInView variants={varFadeInUp}>
        <Typography variant="h3">
          Nhập đầy đủ thông tin <br />
          để liên hệ và đóng góp ý kiến
        </Typography>
      </MotionInView>

      <Stack spacing={3}>
        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Tên" />
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Email" />
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Tiêu đề" />
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Nội dung tin nhắn" multiline rows={4} />
        </MotionInView>
      </Stack>

      <MotionInView variants={varFadeInUp}>
        <Button size="large" variant="contained">
          Gửi ngay
        </Button>
      </MotionInView>
    </Stack>
  );
}
