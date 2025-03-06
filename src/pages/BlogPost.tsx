import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {Container, Typography, Paper, CircularProgress, Box, Card, CardContent, CardActions, Pagination, IconButton} from "@mui/material";
import { ThumbUp, ThumbDown, Visibility, Comment } from "@mui/icons-material";
import { fetchPosts } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import { IPost } from "../types/Products";
import ThemeToggle from "../components/ThemeToggle";

const BlogPost = () => {
  const { data: postList, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !postList || !postList.posts) {
    return (
      <Typography color="error" textAlign="center" variant="h6" mt={4}>
        Error fetching posts.
      </Typography>
    );
  }

  const totalPages = Math.ceil(postList.posts.length / itemsPerPage);
  const displayedPosts = postList.posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4"  fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
        🗨️ Blog Posts
      </Typography>
      <ThemeToggle/>
      <Paper elevation={4} sx={{ padding: 3, mt: 3, borderRadius: 3 }}>
        {displayedPosts.map((post: IPost) => (
          <Card key={post.id} sx={{ mb: 2, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton color="primary">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="body2">{post.reactions?.likes ?? 0}</Typography>

                <IconButton color="error">
                  <ThumbDown fontSize="small" />
                </IconButton>
                <Typography variant="body2">{post.reactions?.dislikes ?? 0}</Typography>

                <IconButton>
                  <Visibility fontSize="small" />
                </IconButton>
                <Typography variant="body2">{post.views ?? 0}</Typography>

                <IconButton color="primary" onClick={() => navigate(`/posts/${post.id}/comments`)}>
                <Comment fontSize="small" />
              </IconButton>
              </Box>

            </CardActions>
          </Card>
        ))}


        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={totalPages} page={currentPage} onChange={(_, value) => setCurrentPage(value)}        
            color="primary"
            size="large"
            shape="rounded" />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default BlogPost;
