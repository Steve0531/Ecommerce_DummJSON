import { useQuery } from "@tanstack/react-query";
import { deleteProduct, fetchCategories, fetchProducts } from "../api/prodApi";
import { IProduct } from "../types/Products";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography, CircularProgress, Alert, Button, TextField, Select, MenuItem, Pagination, Snackbar, Paper, useTheme, ButtonGroup} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useCartStore } from "../store/cartStore";
import { useProdStore } from "../store/prodStore";
import Footer from "../components/Footer";

const Products = () => {
    const { products, setProducts } = useProdStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("Best Sellers");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const itemsPerPage = 10;
    const theme=useTheme();

    const navigate = useNavigate();
    const { addToCart } = useCartStore();
    const role = localStorage.getItem("role");
    

    const handleFetchProducts = async ( searchTerm = "",category = "") => {
        const fetchedProducts = await fetchProducts( searchTerm,category);
        setProducts(fetchedProducts.products);
        return fetchedProducts.products;
      };

    const { data: categories = [] } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        refetchOnWindowFocus: false,
      });

    const { isError, isLoading, refetch } = useQuery<IProduct[]>({
        queryKey: ["products",selectedCategory],
        queryFn: () => handleFetchProducts(searchTerm,selectedCategory),
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );

    if (isError)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">Failed to fetch products</Alert>
            </Box>
        );

        const handleDeleteProduct = async (id: number) => {
            await deleteProduct(id);
            setProducts(products.filter((product) => product.id !== id));
        };
        

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value === "")
            setSearchTerm("")
        setSearchTerm(value);
        refetch();
    };


    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setSelectedCategory(e.target.value);
        refetch();
      };

      const filteredProducts = () => {
        if (sortOrder=="Best Sellers") return products;
        
        return [...products].sort((a, b) => 
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );
      };
      

    const totalPages = Math.ceil(filteredProducts().length / itemsPerPage);
    const displayedProducts = filteredProducts().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Box p={3}>
            <Typography variant="h4"  fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
               🏪 Product List
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


    
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    variant="outlined"
                >
                    <MenuItem value="Best Sellers">Best Sellers</MenuItem>
                    <MenuItem value="asc">Price: Low to High</MenuItem>
                    <MenuItem value="desc">Price: High to Low</MenuItem>
                </Select>
                <Select value={selectedCategory} onChange={handleCategoryChange} variant="outlined" displayEmpty>
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                   </Select>
            </Box>

    
            {role==='admin' && (<Box display="flex" justifyContent="center" mb={3}>
                <Button 
                    onClick={() => navigate("/add-product")} 
                    variant="contained" 
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    Add Product
                </Button>
            </Box> )}

            <Box 
                display="grid" 
                gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))" 
                gap={3}
            >
                {displayedProducts.map((product) => (
                    <Card key={product.id} sx={{ borderRadius: 3, boxShadow: 2, width: 350,height:500, cursor: "pointer", 
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": { 
                            transform: "scale(1.05)", 
                            boxShadow: 4 
                        } }} 
                    >
                        <CardMedia 
                            component="img" 
                            sx={{ height: 200, objectFit: "contain" }} 
                            image={product.thumbnail} 
                            alt={product.title} 
                            onClick={() => navigate(`/product/${product.id}`)}
                        />
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" onClick={() => navigate(`/product/${product.id}`)}>{product.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                            <Typography variant="h6" color="primary">${product.price}</Typography>
                            

                    {role==="admin" && ( <Box display="flex" gap={1} mt={2} >
                         <ButtonGroup color="secondary" aria-label="Medium-sized button group">
                                <Button 
                                    variant="outlined" 
                                    onClick={() => navigate(`/edit-product/${product.id}`)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>    
                        </Box>)}
                        <Box display="flex" justifyContent="center" mt={2}>
                          <Button 
                            variant="contained" 
                            color="success" 
                            onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation
                            addToCart(product);
                            setOpenSnackbar(true);
                              }}
                            >
                                 Add to Cart
                            </Button>
                        </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={2}>
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
            </Paper>
            <Footer/>
        </Box>
        
    );
};

export default Products;
