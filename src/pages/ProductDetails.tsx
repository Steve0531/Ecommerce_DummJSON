import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/prodApi";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, Alert, Button, Rating, Chip, Snackbar, IconButton, Avatar} from "@mui/material";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { ArrowBack, AccountCircle } from "@mui/icons-material";
import { IReview } from "../types/Products";
import ThemeToggle from "../components/ThemeToggle";

const ProductDetails = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { id } = useParams(); 

    const { data: product, isLoading, isError } = useQuery({
        queryKey:["product", id], 
        queryFn:() => fetchProductById(Number(id)),
    })

    const navigate = useNavigate()
    const { addToCart } = useCartStore();

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );

    if (isError || !product)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">Failed to load product details</Alert>
            </Box>
        );

    return (
      <Box p={3} maxWidth="1800px" margin="auto">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
            <ArrowBack fontSize="large" />
        </IconButton>
        <ThemeToggle/>
            
          
        <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{product.brand}</Typography>
            
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}  mt={3}>
          <Box flex={1} display="flex" flexDirection="column" alignItems="center">
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia 
                component="img" 
                image={product.thumbnail} 
                alt={product.title} 
                sx={{ height: 400, objectFit: "contain" }}
                />
              </Card>
          </Box>
          <Box flex={1} display="flex" flexDirection="column" >
            <Card sx={{p:2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" color="primary">${product.price}</Typography>
                <Typography variant="body1" color="error">
                  {product.discountPercentage}% Off
                </Typography>
                            
                <Chip 
                  label={product.availabilityStatus} 
                  color={product.availabilityStatus === "Low Stock" ? "error" : "success"}
                />
                            
                <Typography mt={2} variant="body2">{product.description}</Typography>

                <Typography mt={2}><strong>SKU:</strong> {product.sku}</Typography>
                <Typography><strong>Stock:</strong> {product.stock} left</Typography>

                <Typography mt={2}><strong>Weight:</strong> {product.weight}g</Typography>
                <Typography><strong>Dimensions:</strong> {product.dimensions.width}cm x {product.dimensions.height}cm x {product.dimensions.depth}cm</Typography>

                {/* 🔹 Ratings */}
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <Rating value={product.rating} precision={0.1} readOnly />
                      <Typography>({product.rating})</Typography>
                </Box>

                            
                <Typography mt={2}><strong>Warranty:</strong> {product.warrantyInformation}</Typography>
                <Typography><strong>Shipping:</strong> {product.shippingInformation}</Typography>


                <Typography mt={2} color="text.secondary"><strong>Return Policy:</strong> {product.returnPolicy}</Typography>

                            
                <Box display="flex" gap={2} mt={3}>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={(e) => {e.stopPropagation(); 
                                    addToCart(product);
                                    setOpenSnackbar(true);
                                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>

              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box mt={5}>
          <Typography variant="h5" fontWeight="bold">
              Customer Reviews
          </Typography>

          {product.reviews.length > 0 ? (
            product.reviews.map((review:IReview, index: number) => (
            <Card
              key={index}
              sx={{
                mt: 2,
                p: 2,
                boxShadow: 3,
                borderRadius: 3,
                backgroundColor: "background.paper",
              }}
            >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                  <AccountCircle />
                </Avatar>
                <Typography fontWeight="bold">{review.reviewerName}</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {review.date.slice(0,10)}
              </Typography>
            </Box>
            
            <Rating value={review.rating} precision={0.1} readOnly sx={{ mt: 1 }} />
              <Typography mt={1} sx={{ color: "text.primary" }}>
                {review.comment}
              </Typography>
          </Card>
          ))
        ) : (
              <Typography color="text.secondary" mt={2}>
                No reviews yet
              </Typography>
            )}
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
                Item Added to Cart!
                </Alert>
            </Snackbar>
            

        </Box>
    );
};

export default ProductDetails;
