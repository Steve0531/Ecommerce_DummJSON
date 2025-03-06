import { useCartStore } from "../store/cartStore";
import {Box, Card, CardMedia, CardContent, Typography, Stack, Divider,IconButton, Paper, CircularProgress, Container, Button, Snackbar, Alert, useTheme} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";

import ThemeToggle from "../components/ThemeToggle";

const CartPage = () => {
  const { cart, fetchCart, decreaseQuantity, increaseQuantity, removeItem, clearCart } = useCartStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const theme = useTheme();

  useEffect(() => {
    if (!cart) {
      fetchCart();
    }
  }, [cart, fetchCart]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4"  fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
        🛒 Shopping Cart
      </Typography>
      <ThemeToggle />
      <Paper
          elevation={3}
          sx={{
          padding: 3,
          borderRadius: 4,
          backgroundColor: theme.palette.mode === "dark" ? "rgb(0, 0, 0)":"rgb(228, 224, 224)"
        }}
      >  

      {cart ? (
        <>
          <Paper elevation={3} sx={{ 
          p: 3, 
          borderRadius: 3, 
          mb: 4,  
          display: "flex", 
          flexDirection: "column",  
        }}>
            <Typography variant="h6" gutterBottom>Cart Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><strong>User ID:</strong> {cart.userId}</Typography>
            <Typography><strong>Total Products:</strong> {cart.totalProducts}</Typography>
            <Typography><strong>Total Quantity:</strong> {cart.totalQuantity}</Typography>
            <Typography variant="h6" color="primary">
              <strong>Total Price:</strong> ${cart.total.toFixed(2)}
            </Typography>
            <Typography variant="h6" color="secondary">
              <strong>Discounted Total:</strong> ${cart.discountedTotal.toFixed(2)}
            </Typography>
          </Paper>

          {cart.products.length > 0 ? (
            <>
              {cart.products.map((product) => (
                <Card key={product.id} sx={{ display: "flex", alignItems: "center", p: 2, mb: 2, boxShadow: 3, borderRadius: 3 }}>
                  <CardMedia component="img" sx={{ width: 100, height: 100, objectFit: "contain", borderRadius: 2 }} image={product.thumbnail} alt={product.title} />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">Price: <strong>${product.price.toFixed(2)}</strong></Typography>
                    <Typography variant="body2" color="text.secondary">Total: <strong>${product.total.toFixed(2)}</strong></Typography>
                    <Typography variant="body2" color="text.secondary">Discounted: <strong>${product.discountedTotal.toFixed(2)}</strong></Typography>
                  </CardContent>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2 }}>
                    <IconButton onClick={() => decreaseQuantity(product.id)} color="primary" sx={{ bgcolor: "primary.light", color: "black", "&:hover": { bgcolor: "primary.main", color: "white" } }}>
                      <Remove />
                    </IconButton>
                    <Typography variant="h6">{product.quantity}</Typography>
                    <IconButton onClick={() => increaseQuantity(product.id)} color="primary" sx={{ bgcolor: "primary.light", color: "black", "&:hover": { bgcolor: "primary.main", color: "white" } }}>
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => removeItem(product.id)} color="error" sx={{ bgcolor: "error.light", "&:hover": { bgcolor: "error.main", color: "white" } }}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </Card>
              ))}

                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 3, py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
                  onClick={() => {
                    clearCart();
                    setOpenSnackbar(true); 
                  }}
                >
                   Proceed to Checkout
                </Button>
                
            </>
          ) : (
            <Typography variant="h6" color="text.secondary" textAlign="center">
              🛒 Your cart is empty.
            </Typography>
          )}
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}
      </Paper>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
              🎉 Cart has been processed!
          </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;
