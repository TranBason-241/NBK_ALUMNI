import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { Link as RouterLink } from 'react-router-dom';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack, Button, Grid } from '@material-ui/core';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 0.15;
const TOTAL_INSTALLED = 4876;
const CHART_DATA = [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }];

type classCardProps = {
  color: string;
};

export default function ClassCard({ color }: classCardProps) {
  const theme = useTheme();

  const chartOptions = {
    colors: [theme.palette.error.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],

    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),

        title: {
          formatter: (seriesName: number | string) => `#${seriesName}`
        }
      },
      marker: { show: false }
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: color }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3">Lớp 10</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="subtitle2">
            Năm học: 2017 - 2018
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="subtitle2">
            Sĩ số: 45 (học sinh)
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="subtitle2">
            Giáo viên chủ nhiệm: Trần Bá Đạt
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="subtitle2">
            Năm học: 2017 - 2018
          </Typography>
        </Stack>

        <Grid container justifyContent="right">
          <Grid item sx={{ mt: 2, mb: 1 }} spacing={1}>
            <Button variant="contained" to="#" component={RouterLink}>
              Xem chi tiết
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
