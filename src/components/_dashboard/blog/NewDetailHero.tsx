import { Icon } from '@iconify/react';
import shareFill from '@iconify/icons-eva/share-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { format, formatDistanceToNow } from 'date-fns';
import { useEffect, useCallback, useState } from 'react';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  SpeedDial,
  Typography,
  useMediaQuery,
  SpeedDialAction
} from '@material-ui/core';
// utils
import { fDate, fDateTime } from '../../../utils/formatTime';
// @types
import { Post } from '../../../@types/blog';
import { New } from '../../../@types/new';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  height: 480,
  position: 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    paddingTop: 'calc(100% * 9 / 16)'
  },
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.72)
  }
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10)
  }
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3)
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10)
  }
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  //   zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type NewDetailProps = {
  newDetail: New;
};

export default function NewDetailHero({ newDetail }: NewDetailProps) {
  const { id, title, body, orderView, newsCategoryId, writingDate, thumbnail } = newDetail;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  function convertUTCDateToLocalDate(date: any) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }
  return (
    <RootStyle>
      <CoverImgStyle alt="post cover" src={thumbnail} />

      <TitleStyle sx={{ typography: 'h2' }}>{title}</TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Avatar alt={author.name} src={author.avatarUrl} sx={{ width: 48, height: 48 }} /> */}
          <Box sx={{ ml: 2 }}>
            {/* <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              name
            </Typography> */}
            <Typography variant="h4" sx={{ color: 'grey.500' }}>
              {/* {fDateTime(writingDate)} */}
              Ngày: {convertUTCDateToLocalDate(writingDate)}
              {/* {writingDate} */}
            </Typography>
          </Box>
        </Box>

        {/* <SpeedDial
          direction={isMobile ? 'up' : 'left'}
          ariaLabel="Share post"
          icon={<Icon icon={shareFill} />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          {SOCIALS.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          ))}
        </SpeedDial> */}
      </FooterStyle>
    </RootStyle>
  );
}
