// material
import { useTheme } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 50, height: 50, ...sx }}>
      <img alt="register" src="/static/illustrations/Logo_nbk.png" />
    </Box>
  );
}
