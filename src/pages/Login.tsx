import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";


const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const role = await login(data.username, data.password);

    if (role === "admin") 
      navigate("/admin-dashboard");
     else if (role === "user") 
      navigate("/products");
     else 
      alert("Invalid Username or Password");
  
  };

  return (
    <Box sx={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)", 
          zIndex: -1,
        }}
      />

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "500px",
          maxWidth: "90%",
          position: "relative",
          zIndex: 1, 
        }}
      >
        <ThemeToggle />
        <Typography variant="h4" textAlign="center" mb={3}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
