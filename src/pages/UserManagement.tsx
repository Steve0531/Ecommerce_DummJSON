import { useEffect, useState } from "react";
import {Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Pagination, FormControl, InputLabel, Select, MenuItem, Typography, useTheme, Alert, CircularProgress} from "@mui/material";
import { IUser } from "../types/Products";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/userApi";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();

  const itemsPerPage = 9;


  const { data: userList, refetch,isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(searchTerm, filterKey, filterValue),
  });
  console.log(userList);

  useEffect(() => {
    refetch(); 
  }, [searchTerm, refetch]);

  const handleViewDetails = (userId: number) => {
    navigate(`/user-management/${userId}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") setSearchTerm("");
    setSearchTerm(value);
    refetch();
  };

  const handleFilter = () => {
    refetch();
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
      </Box>
      );
  
  if (isError || !userList)
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Alert severity="error">Failed to load product details</Alert>
        </Box>
      );

  const totalPages = Math.ceil(userList.users.length / itemsPerPage);
  const displayedUsers = userList.users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container maxWidth="xl" sx={{ mb: 4 , height:100}}>
 
      <Typography variant="h4" textAlign="center" fontWeight={600} gutterBottom>
        👥 User Management
      </Typography>
      <ThemeToggle />
      <Paper
            elevation={8}
            sx={{
            padding: 3,
            borderRadius: 4,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.mode === "dark" ? "rgb(0, 0, 0)":"rgb(204, 202, 202)", 
            opacity: 1, 
            }}
          >   

      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ borderRadius: 2 }}
      />

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <FormControl fullWidth>
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="hair.color">Hair Color</MenuItem>
            <MenuItem value="gender">Gender</MenuItem>
            <MenuItem value="eyeColor">Eye Color</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Filter Value"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilterValue(e.target.value)}
          sx={{ borderRadius: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{
            padding: "10px 10px",
            fontWeight: 600,
            width:250,
            borderRadius: 2,
          }}
        >
          Apply Filter
        </Button>
      </Box>

        <TableContainer sx={{ borderRadius: 3 }}>
        {displayedUsers.length > 0 ? ( 
          <Table>
            <TableHead>
              <TableRow sx={{ borderColor: "white",backgroundColor: theme.palette.mode === "dark" ? "rgb(37, 36, 36)":"rgb(158, 156, 156)"}}>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers.map((user: IUser) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    backgroundColor:theme.palette.mode === "dark" ? "rgb(0, 0, 0)" : "rgb(233, 229, 229)",
                    transition: "background 0.3s",
                    "&:hover": { backgroundColor: theme.palette.mode === "dark" ? "rgb(0, 0, 0)" : "rgb(95, 94, 94)" },
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleViewDetails(user.id)}
                      sx={{
                        fontWeight: 600,
                        borderRadius: 2,
                        padding: "6px 14px",
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>):(
    
            <Box display="flex" justifyContent="center" alignItems="center" height={150}>
              <Typography variant="h6" color="error" fontWeight={600}>
                  No users found! Try a different search or filter.
              </Typography>
            </Box>
           )}
        </TableContainer>

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              size="large"
              shape="rounded"
            />
          </Box>
        )}
      </Paper>
      <Footer/>
    </Container>
  );
};

export default UserManagement;
