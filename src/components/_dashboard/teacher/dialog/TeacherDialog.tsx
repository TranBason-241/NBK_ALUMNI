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

type TeacherDialogProps = {
  teacher: Teacher;
  handleClose: () => void;
  open: boolean;
  //   item?: Item;
};

function convertUTCDateToLocalDate(date: any) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
export default function TeacherDialog({ handleClose, open, teacher }: TeacherDialogProps) {
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
                  src={teacher?.imageUrl}
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
                    {teacher?.name}
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Ngày sinh: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {convertUTCDateToLocalDate(teacher?.dateOfBirth)}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Địa chỉ: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {teacher?.cityName}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Email: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {teacher?.email}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Phone: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {teacher?.phone}
                    </Typography>
                  </Typography>

                  {teacher?.subjects.length > 0 ? (
                    <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                      Phụ trách môn học: &nbsp;
                      {teacher?.subjects.map((subject, index) => (
                        <Typography key={index} component="span" variant="subtitle1">
                          {subject}&nbsp;
                        </Typography>
                      ))}
                    </Typography>
                  ) : (
                    <></>
                  )}
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
