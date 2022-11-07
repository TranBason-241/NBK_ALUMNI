// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useEffect, useCallback, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack,
  Skeleton
} from '@material-ui/core';
//

import useSettings from 'hooks/useSettings';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_AUTH, PATH_DASHBOARD, PATH_NEW } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from 'components/_dashboard/blog';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { getMorePosts, getPostsInitial } from 'redux/slices/blog';
import { orderBy } from 'lodash';
import { getListNew } from 'redux/slices/new';
import NewCard from 'components/_dashboard/blog/NewCard';
import { RootState } from 'redux/store';
import { BlogState, Post } from '../../../@types/blog';

import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/icons/ic_design.svg',
    title: 'UI & UX Design',
    description:
      'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.'
  },
  {
    icon: '/static/icons/ic_code.svg',
    title: 'Development',
    description: 'Easy to customize and extend each component, saving you time and money.'
  },
  {
    icon: '/static/brand/logo_single.svg',
    title: 'Branding',
    description: 'Consistent design in colors, fonts ... makes brand recognition easy.'
  }
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

const shadowIcon = (color: string) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 }
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  margin: 'auto',
  marginBottom: theme.spacing(10),
  filter: shadowIcon(theme.palette.primary.main)
}));

const applySort = (posts: Post[], sortBy: string) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  // Tin tức & sự kiện
  const dispatch = useDispatch();
  const [filters, setFilters] = useState('');
  const { posts, hasMore, index, step } = useSelector((state: { blog: BlogState }) => state.blog);
  const newList = useSelector((state: RootState) => state.new.newList);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { themeStretch } = useSettings();
  const handleChangeSort = (value?: string) => {
    if (value) {
      setFilters(value);
    }
  };

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
    dispatch(getListNew(filters));
  }, [dispatch, index, step, filters]);

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 5 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              component="p"
              variant="overline"
              sx={{ mb: 2, color: 'primary.main', textAlign: 'center' }}
            >
              THPT Nguyễn Bỉnh Khiêm
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'center', color: 'primary.main' }}>
              Tin Tức
            </Typography>
          </MotionInView>
        </Box>

        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <Button
              variant="outlined"
              component={RouterLink}
              to={PATH_NEW.list}
              // startIcon={<Icon icon={plusFill} />}
            >
              Xem tất cả
            </Button>
          </Stack>
          {/* 
          <InfiniteScroll
            next={onScroll}
            hasMore={hasMore}
            loader={SkeletonLoad}
            dataLength={posts.length}
            style={{ overflow: 'inherit' }}
          > */}
          <Grid container spacing={3}>
            {
              !newList.map((newPost, index) => (
                <NewCard key={newPost.id} newPost={newPost} index={index} />
                // <p key={index}>{newPost.title}</p>
              ))
            }
          </Grid>
          {/* </InfiniteScroll> */}
        </Container>
      </Container>
    </RootStyle>
  );
}
