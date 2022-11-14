import { useEffect, useRef, useState } from 'react';

import { DialogProps } from '@material-ui/core/Dialog';

// material

import {
  Box,
  Card,
  Container,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { fontStyle } from '@material-ui/system';
import TeacherList from 'pages/dashboard/TeacherList';

//
import { fDate } from '../../../../utils/formatTime';
import { Teacher } from '../../../../@types/teacher';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../../animate';
import { CarouselControlsArrowsBasic2 } from '../../../carousel';
import { Student } from '../../../../@types/student';

type StudentDialogProps = {
  student: Student;
  handleClose: () => void;
  open: boolean;
  //   item?: Item;
};

function convertUTCDateToLocalDate(date: any) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
export default function StudentDialog({ handleClose, open, student }: StudentDialogProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  // const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
  //   teacher!;
  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Box sx={{ width: '100%' }}>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        {/* <DialogTitle sx={{ pb: 2 }}>{teacher?.name}</DialogTitle> */}
        <DialogContent sx={{ width: '100%' }} dividers={scroll === 'paper'}>
          <Box sx={{ height: '30%', mt: 3 }}>
            <Grid container spacing="30">
              <Grid item md={4}>
                <Box
                  component="img"
                  src={student?.imageUrl}
                  sx={{ width: 400, height: 300, borderRadius: 3 }}
                  display="center"
                />
                <Grid sx={{ mt: 2 }} container justifyContent="center">
                  <Typography align="center" variant="body1" sx={{ color: 'text.secondary' }}>
                    Bí mật của cuộc sống là vấp ngã 7 lần nhưng đứng dậy 8 lần
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={8}>
                <Box>
                  <Typography variant="h2" sx={{ color: 'black', mb: 5 }}>
                    {student?.name}
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Ngày sinh: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {convertUTCDateToLocalDate(student?.dateOfBirth)}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Địa chỉ: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {student?.cityName}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Email: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {student?.email}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Phone: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {student?.phone}
                    </Typography>
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Bằng cấp: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {student?.learningExperiences?.length > 0
                        ? student?.learningExperiences?.map((learning, index) => (
                            <Typography key={index} component="span" variant="subtitle1">
                              - {learning.degree}&nbsp;
                            </Typography>
                          ))
                        : 'Đang câp nhật'}
                    </Typography>
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Kinh nghiệm làm việc: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {student?.workExperiences?.length > 0
                        ? student?.workExperiences?.map((work, index) => (
                            <Typography key={index} component="span" variant="subtitle1">
                              - {work.majorName}&nbsp;
                            </Typography>
                          ))
                        : 'Đang cập nhật'}
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
