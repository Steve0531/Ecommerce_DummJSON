import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {Container, Typography, CircularProgress, Paper, TextField, Button, Box, List, ListItem, ListItemText, IconButton, Divider} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { fetchPostById, fetchComments, addComment } from "../api/postApi";
import { useCommentStore } from "../store/commetStore";
import { useState } from "react";
import { IComment } from "../types/Products";
import ThemeToggle from "../components/ThemeToggle";
import { useAuthStore } from "../store/authStore";

const BlogPostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();

  const userDetails = useAuthStore((state)=>(state.userDetails))

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  const { data: commentList, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const { comments: storedComments, addCommentToPost } = useCommentStore();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const commentData = {
        postId,
        body: newComment,
        userId: 1,
      };

      const addedComment = await addComment(commentData);
      addCommentToPost(postId, addedComment);

      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (postLoading || commentsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBack fontSize="large" />
      </IconButton>
      <ThemeToggle/>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {post.body}
        </Typography>
      </Paper>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Comments
      </Typography>

      <Paper elevation={2} sx={{ p: 2, borderRadius: 3, maxHeight: "300px", overflowY: "auto" }}>
        <List>
          {commentList?.comments?.map((comment: IComment) => (
            <Box key={comment.id}>
              <ListItem>
                <ListItemText primary={comment.body} secondary={`By: ${comment.user.fullName}`} />
              </ListItem>
              <Divider />
            </Box>
          ))}

          {storedComments[postId]?.map((comment) => (
            <Box key={comment.id}>
              <ListItem>
                <ListItemText primary={comment.body} secondary={`By: ${userDetails.firstName} ${userDetails.lastName}`} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>

      <Box display="flex" alignItems="center" gap={2} mt={3}>
        <TextField
          fullWidth
          label="Write a comment..."
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ borderRadius: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ px: 3, height: "56px" }}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
};

export default BlogPostDetails;
