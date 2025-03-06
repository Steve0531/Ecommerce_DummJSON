import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, updateProduct } from "../api/prodApi";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, CircularProgress, Alert, Typography, IconButton } from "@mui/material";
import ThemeToggle from "../components/ThemeToggle";
import { ArrowBack } from "@mui/icons-material";

type ProductForm ={
  title: string;
  description: string;
  price: number;
}

const EditProduct = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id, 
  });

  const { control, handleSubmit, setValue } = useForm<ProductForm>({
    defaultValues: { title: "", description: "", price: 0 },
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  const onSubmit = async (data: ProductForm) => {
    await updateProduct(Number(id), data);
    navigate(-1);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load product</Alert>;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <ThemeToggle />

  
    <Box
      sx={{
        p: 4,
        maxWidth: 450,
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "rgba(105, 102, 102, 0.1)",
        backdropFilter: "blur(50px)",
        textAlign: "center",
        position: "relative",
      }}
    >

    <IconButton
      onClick={() => navigate(-1)}
      sx={{
        position: "absolute",
        top: -40, 
        left: -80, 
      }}
    >
      <ArrowBack fontSize="large" />
    </IconButton>

    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
      Edit Product
    </Typography>

    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        rules={{ required: "Price is required", min: { value: 1, message: "Price must be at least 1" } }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
        UPDATE PRODUCT
      </Button>
    </form>
  </Box>
</Box>


  );
};

export default EditProduct;
