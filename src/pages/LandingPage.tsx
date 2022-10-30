// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingDarkMode,
  LandingThemeColor,
  LandingAdvertisement,
  LandingCleanInterfaces,
  LandingHugePackElements
} from '../components/_external-pages/landing';
import About from './About';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  height: '100%'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="PJ School" id="move_top">
      <LandingHero />
      <ContentStyle>
        <About />
        <LandingHugePackElements />
        <LandingMinimal />

        {/* <LandingDarkMode />
        <LandingThemeColor />
        <LandingCleanInterfaces /> */}
        <LandingAdvertisement />
      </ContentStyle>
    </RootStyle>
  );
}
