import { useNavigate, useParams } from "react-router-dom";
import {Container, Typography, CircularProgress, Box, Divider, Button, TextField, IconButton, Card, CardContent} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUserById, updateUser } from "../api/userApi"; // Import API calls
import ThemeToggle from "../components/ThemeToggle";
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import Footer from "../components/Footer";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    bloodGroup: "",
    company: { name: "" },
    role: "",
  });

  const { data: user, isLoading, isError, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  const mutation = useMutation({
    mutationFn: async () => updateUser(Number(id), userData),
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
  });

  if (isLoading) {
    return (
      <Typography color="error" textAlign="center" variant="h6" mt={4}>
        <CircularProgress size={60} />
      </Typography>
    );
  }

  if (isError || !user) {
    return (
      <Typography color="error" textAlign="center" variant="h6" mt={4}>
        Error fetching user details.
      </Typography>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Box width="100%" display="flex" justifyContent="space-between">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBack fontSize="large" />
        </IconButton>
        <ThemeToggle />
      </Box>

      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            {isEditing ? "Edit User Details" : "User Details"}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isEditing ? (
              <>
                <TextField
                  label="First Name"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Birth Date"
                  value={userData.birthDate}
                  onChange={(e) =>
                    setUserData({ ...userData, birthDate: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Blood Group"
                  value={userData.bloodGroup}
                  onChange={(e) =>
                    setUserData({ ...userData, bloodGroup: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Company"
                  value={userData.company.name}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      company: { name: e.target.value },
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Role"
                  value={userData.role}
                  onChange={(e) =>
                    setUserData({ ...userData, role: e.target.value })
                  }
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography variant="body1">
                  <strong>ID:</strong> {user.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {user.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Birth Date:</strong> {user.birthDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Blood Group:</strong> {user.bloodGroup}
                </Typography>
                <Typography variant="body1">
                  <strong>Company:</strong> {user.company.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Role:</strong> {user.role}
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              gap: 2,
            }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => mutation.mutate()}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      <Footer/>
    </Container>
  );
};

export default UserDetails;
