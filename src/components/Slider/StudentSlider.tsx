import faker from 'faker';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { DialogProps } from '@material-ui/core/Dialog';
import { dispatch, RootState } from 'redux/store';
import { getListNew } from 'redux/slices/new';
import { getListTeacher } from 'redux/slices/teacher';
// material
import { useTheme, styled } from '@material-ui/core/styles';
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

//
import { Teacher } from '../../@types/teacher';
import { Student } from '../../@types/student';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../animate';
import { CarouselControlsArrowsBasic2 } from '../carousel';

type studentCardProps = {
  student: Student;
};

type Member = {
  id: string;
  name: string;
  imageUrl: string;
  dateOfBirth: string;
  cityId: string;
  startTime: string;
  endTime: string;
  email: string;
  phone: string;
};
function StudentCard({ student }: studentCardProps) {
  const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
    student;
  return (
    <Box>
      <Card key={name} sx={{ p: 1, mx: 1.5, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Khóa: 2015-2018
        </Typography>
        <Box
          component="img"
          src={imageUrl}
          sx={{ width: '100%', borderRadius: 1.5, height: 250 }}
        />
        <Box sx={{ mt: 2, mb: 1 }}>
          {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
            <IconButton key={index}>
              <Icon icon={social} width={20} height={20} />
            </IconButton>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

type InfoDialogProps = {
  student: Student;
  handleClose: () => void;
  open: boolean;
  //   item?: Item;
};

function InfoDialog({ handleClose, open, student }: InfoDialogProps) {
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
                  sx={{ width: 400, height: 350, borderRadius: 3 }}
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
                  {/* 
                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Phụ trách môn học: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      Toán, Lý, Hóa
                    </Typography>
                  </Typography> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quay lại</Button>

          <Button variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function convertUTCDateToLocalDate(date: any) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
type studentSliderProps = {
  studentList: Student[];
};

export default function StudentSlider({ studentList }: studentSliderProps) {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);
  const [currentStudent, setCurrentStudent] = useState<Student>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const settings = {
    speed: 500,
    slidesToShow: studentList.length > 3 ? 3 : 2,
    centerMode: true,
    centerPadding: '0 80px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative', mt: 3, backgroundColor: 'grey', borderRadius: 1.5 }}>
      <InfoDialog open={open} student={currentStudent!} handleClose={handleClose} />
      <Slider ref={carouselRef} {...settings}>
        {studentList.map((student: Student) => (
          <MotionInView key={student.id} variants={varFadeIn}>
            <Box
              onClick={() => {
                setCurrentStudent(student);
                handleOpen();
              }}
            >
              <StudentCard student={student} />
            </Box>
          </MotionInView>
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{ transform: 'translateY(-64px)' }}
      />
    </Box>
  );
}
