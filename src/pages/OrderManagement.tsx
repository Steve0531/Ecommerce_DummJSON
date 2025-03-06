import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {Container, Typography, Paper, CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Chip, Pagination, useTheme} from "@mui/material";
import { fetchCarts } from "../api/cartApi";
import { ICart } from "../types/Products";
import ThemeToggle from "../components/ThemeToggle";
import { useOrderStore } from "../store/orderStore";
import Footer from "../components/Footer";


const OrderManagement = () => {
  
  const theme = useTheme();

  const { setOrders } = useOrderStore()
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchCarts,
  });

  useEffect(()=>{
  if(orders)
    setOrders(orders);
  },[orders])

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const [orderStatuses, setOrderStatuses] = useState<Record<number, string>>({});

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !orders) {
    return (
      <Typography color="error" textAlign="center" variant="h6" mt={4}>
        Error fetching orders.
      </Typography>
    );
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success"; // Green
      case "Pending":
        return "warning"; // Yellow
      case "Cancelled":
        return "error"; // Red
      default:
        return "info"; // Blue 
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" fontWeight={600} gutterBottom>
       📃 Order Management
      </Typography>
      <ThemeToggle/>
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          mt: 3,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: theme.palette.mode === "dark" ? "rgb(0, 0, 0)":"rgb(204, 202, 202)",
        }}
      >
        <TableContainer sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.mode === "dark" ? "rgb(67, 64, 64)":"rgb(158, 156, 156)" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Products</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((order: ICart) => {
                const status = orderStatuses[order.id] || "Pending";

                return (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{
                      backgroundColor:theme.palette.mode === "dark" ? "rgb(0, 0, 0)" : "rgb(233, 229, 229)",
                      transition: "background 0.3s",
                      "&:hover": { backgroundColor: theme.palette.mode === "dark" ? "rgb(0, 0, 0)" : "rgb(95, 94, 94)"},
                    }}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{order.totalProducts}</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: "rgb(28, 41, 188)" }}>
                      ${order.total}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Select
                          value={status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          size="small"
                          sx={{
                            minWidth: 130,
                            fontWeight: 500,
                            "& .MuiSelect-select": {
                              padding: "6px 12px",
                            },
                          }}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Processing">Processing</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                        <Chip
                          label={status}
                          color={getStatusColor(status)}
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(orders.length / ordersPerPage)}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
            size="large"
            shape="rounded"
          />
        </Box>
      </Paper>
      <Footer/>
    </Container>
  );
};

export default OrderManagement;
