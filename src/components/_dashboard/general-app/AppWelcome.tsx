import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent, CardProps } from '@material-ui/core';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  displayName?: string;
}

export default function AppWelcome({ displayName }: AppWelcomeProps) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h3">
          LỚP CỦA TÔI
          {/* <br /> {!displayName ? '...' : displayName}! */}
        </Typography>

        <Typography variant="body1" sx={{ pb: { xs: 1, xl: 1 }, maxWidth: 480, mx: 'auto' }}>
          Bạn có thể tìm kiếm tất cả thông tin về lớp học của mình:
        </Typography>
        <Typography variant="body2" sx={{ pb: { xs: 1, xl: 1 }, maxWidth: 480, mx: 'auto' }}>
          - Bạn học cùng lớp
        </Typography>
        <Typography variant="body2" sx={{ pb: { xs: 1, xl: 1 }, maxWidth: 480, mx: 'auto' }}>
          - Giáo viên đã dạy bạn
        </Typography>
        <Typography variant="body2" sx={{ pb: { xs: 1, xl: 1 }, maxWidth: 480, mx: 'auto' }}>
          - ...
        </Typography>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
