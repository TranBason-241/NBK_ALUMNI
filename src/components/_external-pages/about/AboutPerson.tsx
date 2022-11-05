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
import { getListHeadMaster, getListTeacher } from 'redux/slices/teacher';
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
  DialogContentText
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import TeacherSlider from 'components/Slider/TeacherSlider';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { CarouselControlsArrowsBasic2 } from '../../carousel';
import { Teacher } from '../../../@types/teacher';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0),
  backgroundColor: '#EFFFEE '
  // backgroundColor: 'F6FFF6'
  // border: '0.1px solid black'
  // backgroundImage:
  //   theme.palette.mode === 'light'
  //     ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
  //         theme.palette.grey[300]
  //       } 100%)`
  //     : 'none'
}));
const MEMBERS = [
  {
    name: faker.name.findName(),
    role: 'UI Designer',
    avatar: '/static/about/avatar-1.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'UI/UX Designer',
    avatar: '/static/about/avatar-2.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Full Stack Developer',
    avatar: '/static/about/avatar-3.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Leader',
    avatar: '/static/about/avatar-4.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Leader',
    avatar: '/static/about/avatar-5.jpg'
  }
];

// ----------------------------------------------------------------------

type PersonCardProps = {
  handleOpen: () => void;
  member: {
    name: string;
    role: string;
    avatar: string;
  };
};

function PersonCard({ member, handleOpen }: PersonCardProps) {
  const { name, role, avatar } = member;
  return (
    <Box onClick={handleOpen}>
      <Card key={name} sx={{ p: 1, mx: 1.5 }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {role}
        </Typography>
        <Box component="img" src={avatar} sx={{ width: '100%', borderRadius: 1.5 }} />
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

type teacherCardProps = {
  handleOpen: () => void;
  teacher: Teacher;
};

function TeacherCard({ teacher, handleOpen }: teacherCardProps) {
  const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
    teacher;
  return (
    <Box onClick={handleOpen}>
      <Card key={name} sx={{ p: 1, mx: 1.5 }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Dạy môn gì
        </Typography>
        <Box component="img" src={imageUrl} sx={{ width: '100%', borderRadius: 1.5 }} />
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

type DiverListHeadProps = {
  userName: string;
  handleClose: () => void;
  open: boolean;
  //   item?: Item;
};

function InfoDialog({ handleClose, open, userName }: DiverListHeadProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

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
    <div>
      <Dialog maxWidth="md" open={open} onClose={handleClose} scroll={scroll}>
        <DialogTitle sx={{ pb: 2 }}>Tên nhân vật</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button variant="contained" onClick={handleClose}>
            {userName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function AboutPerson() {
  const carouselRef = useRef<Slider>(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const teacherList = useSelector((state: RootState) => state.teacher.teacherList);
  const headMasterList = useSelector((state: RootState) => state.teacher.headMasterList);

  const settings = {
    speed: 500,
    slidesToShow: 4,
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

  useEffect(() => {
    dispatch(getListTeacher());
    dispatch(getListHeadMaster());
  }, []);
  return (
    <RootStyle>
      {' '}
      <Container maxWidth="lg" sx={{ pb: 10, textAlign: 'center' }}>
        {/* <MotionInView variants={varFadeInDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </MotionInView> */}
        <MotionInView variants={varFadeInUp}>
          <Typography variant="h2" sx={{ mb: 3, color: 'primary.main' }}>
            Con người
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              mb: 10,
              mx: 'auto',
              maxWidth: 630,
              color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
            }}
          >
            Mỗi con người mỗi cá nhân là một thành viên trong gia đình THPT Chuyên Nguyễn Bỉnh Khiêm
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInDown}>
          <Typography
            component="p"
            variant="h4"
            sx={{
              mb: 3,
              color: 'primary.main',
              // textAlign: 'left',
              ml: 1,
              textDecoration: 'underline'
            }}
          >
            Ban giám hiệu
          </Typography>
          <TeacherSlider teacherList={headMasterList} />
        </MotionInView>

        <MotionInView variants={varFadeInDown}>
          <Typography
            component="p"
            variant="h4"
            sx={{
              mb: 3,
              color: 'primary.main',
              // textAlign: 'left',
              ml: 1,
              textDecoration: 'underline'
            }}
          >
            Giáo viên
          </Typography>
        </MotionInView>
        <TeacherSlider teacherList={teacherList} />

        {/* <TeacherSlider /> */}

        <Button
          variant="outlined"
          color="inherit"
          size="large"
          endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
          sx={{ mx: 'auto' }}
        >
          Xem tất cả
        </Button>
      </Container>
    </RootStyle>
  );
}
