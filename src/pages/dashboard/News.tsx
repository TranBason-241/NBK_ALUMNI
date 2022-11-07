import { orderBy } from 'lodash';
import { Icon } from '@iconify/react';
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@material-ui/core';
import { getListNew } from 'redux/slices/new';
import NewCard from 'components/_dashboard/blog/NewCard';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
// hooks

import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { Post, BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: '1', label: 'Tin tức' },
  { value: '2', label: 'Sự kiện' }
];

// ----------------------------------------------------------------------

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

export default function News() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState('1');
  const { posts, hasMore, index, step } = useSelector((state: { blog: BlogState }) => state.blog);
  const newList = useSelector((state: RootState) => state.new.newList);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(15)
    }
  }));

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
    dispatch(getListNew(filters));
    console.log('reaste');
  }, [dispatch, index, step, filters]);

  const handleChangeSort = (value?: string) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Tin tức & sự kiện">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs heading="Tin tức & sự kiện" links={[]} />

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch />
            <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
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
            {newList!.map((newPost, index) => (
              <NewCard key={newPost.id} newPost={newPost} index={index} />
              // <p key={index}>{newPost.title}</p>
            ))}
          </Grid>
          {/* </InfiniteScroll> */}
        </Container>
      </RootStyle>
    </Page>
  );
}
