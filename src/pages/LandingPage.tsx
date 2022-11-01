// material
import { styled } from '@material-ui/core/styles';
import { AboutTeam } from 'components/_external-pages/about';
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
import Contact from './Contact';

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
        <AboutTeam />
        {/* <LandingDarkMode />
        <LandingThemeColor />
        <LandingCleanInterfaces /> */}
        <Contact />
        <LandingAdvertisement />
      </ContentStyle>
    </RootStyle>
  );
}
