import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { alpha, useTheme, styled } from '@material-ui/core/styles';
// material
import { Box, Card, Divider, Skeleton, Container, Typography, Pagination } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPost, getRecentPosts } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import { BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm
} from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));
export default function BlogPost() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { title } = useParams();
  const { post, error, recentPosts } = useSelector((state: { blog: BlogState }) => state.blog);

  useEffect(() => {
    dispatch(getPost(title));
    // dispatch(getRecentPosts(title));
    console.log(title);
  }, [dispatch, title]);

  return (
    <Page title="Blog: Post Details | Minimal-UI">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Post Details"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Blog', href: PATH_DASHBOARD.blog.root },
              { name: sentenceCase(title) }
            ]}
          />

          {post && (
            <Card>
              <BlogPostHero post={post} />

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h6" sx={{ mb: 5 }}>
                  {post.description}
                </Typography>

                <Markdown children={post.body} />

                <Box sx={{ my: 5 }}>
                  <Divider />
                  <BlogPostTags post={post} />
                  <Divider />
                </Box>

                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography variant="h4">Comments</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                    ({post.comments.length})
                  </Typography>
                </Box>

                <BlogPostCommentList post={post} />

                <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination count={8} color="primary" />
                </Box>

                <BlogPostCommentForm />
              </Box>
            </Card>
          )}

          {!post && SkeletonLoad}

          {error && <Typography variant="h6">404 Post not found</Typography>}

          {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />}
        </Container>
      </RootStyle>
    </Page>
  );
}
