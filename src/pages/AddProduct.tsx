import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { addProduct } from "../api/prodApi";
import { ArrowBack } from "@mui/icons-material";
import { ProductForm } from "../types/Products";


const AddProduct = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<ProductForm>({
    defaultValues: { title: "", description: "", price: 0 },
  });

  const onSubmit = async (data: ProductForm) => {
    await addProduct(data);
    reset();
    navigate("/dashboard"); 
  };

  return (
    <Box
      sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
    >
    <Box
      sx={{
        p: 4,
        maxWidth: 450,
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "rgba(105, 102, 102, 0.1)",
        backdropFilter: "blur(50px)",
        textAlign: "center"
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
          Add New Product
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
                sx={{ input: { color: "#fff" }, fieldset: { borderColor: "#fff" } }}
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
                sx={{ input: { color: "#fff" }, fieldset: { borderColor: "#fff" } }}
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
                sx={{ input: { color: "#fff" }, fieldset: { borderColor: "#fff" } }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
        />

        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "100%" }}
        >
            ADD PRODUCT
        </Button>
      </form>
    </Box>
  </Box>
  );
};

export default AddProduct;
