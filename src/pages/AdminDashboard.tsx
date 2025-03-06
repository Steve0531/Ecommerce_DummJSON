import { useState } from "react";
import {Box, Typography, Paper, CircularProgress, Stack, Modal, Button, useTheme} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BarChart, PieChart } from "@mui/x-charts";
import { fetchQuotes, fetchRecipes } from "../api/quotesApi";
import ThemeToggle from "../components/ThemeToggle";
import { useUserStore } from "../store/userStore";
import { useProdStore } from "../store/prodStore";
import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore";
import Footer from "../components/Footer";

type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  cookTimeMinutes:number;
  servings:number;
};

type Quote = {
  id: number;
  quote: string;
  author: string;
};


const AdminDashboard = () => {
  const theme = useTheme();

  const users = useUserStore((state) => state.users);
  const products = useProdStore((state) => state.products);
  const orders = useOrderStore((state) => state.orders);
  const user = useAuthStore((state)=>state.userDetails)


  const { data: quotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
  });

  const { data: recipes, isLoading: recipesLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });


  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <Box sx={{ padding: 3, mt: 1 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          background: theme.palette.mode === "dark" ? "linear-gradient(90deg, #ff8c00, #ff2e63)":"linear-gradient(90deg,rgb(139, 3, 3),rgb(20, 91, 6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Welcome, {user?.firstName} {user?.lastName} 
      </Typography>
      <ThemeToggle />
      
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            flex: 1,
            backgroundColor: theme.palette.mode === "dark" ? "rgb(63, 83, 137)":"rgb(228, 224, 224)" 
          }}>

          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{users.length}</Typography>
        </Paper>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            flex: 1,
            backgroundColor: theme.palette.mode === "dark" ? "rgb(155, 116, 72)":"rgb(228, 224, 224)" 
          }}
        >
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h4">{products.length}</Typography>
        </Paper>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            flex: 1,
            backgroundColor: theme.palette.mode === "dark" ? "rgb(63, 137, 78)":"rgb(228, 224, 224)" 
          }}
        >
          <Typography variant="h6">Total Orders</Typography>
          <Typography variant="h4">{orders.length}</Typography>
        </Paper>
      </Stack>

      {/* Charts Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mt={3} justifyContent="center" alignItems="center">
  
        <Paper 
            sx={{
                padding: 3,
                flex: 1,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: theme.palette.mode === "dark" ? "rgb(34, 34, 34)":"rgb(228, 224, 224)" 
            }}>

            <Typography variant="h5" sx={{ marginBottom: 2 }}>
               Admin Stats (Bar Chart)
            </Typography>
             <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <BarChart
                    series={[{ data: [users.length, products.length, orders.length], label: "Counts" }]}
                    xAxis={[{ scaleType: "band", data: ["Users", "Products", "Orders"] }]}
                    borderRadius={10}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'top', horizontal: 'right' },
                        padding: 0,
                      },
                    }}
                    width={600}
                    height={300}
                  />
              </Box>
        </Paper>


        <Paper 
          sx={{
            padding: 3,
            flex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.mode === "dark" ? "rgb(34, 34, 34)":"rgb(228, 224, 224)" 
          }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                 Distribution (Pie Chart)
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: users.length, label: "Users" },
                          { id: 1, value: products.length, label: "Products" },
                          { id: 2, value: orders.length, label: "Orders" },
                        ],

                        paddingAngle: 5, 
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0,
                      },
                    }}
                    width={450} 
                    height={300}
                  />
              </Box>
        </Paper>
      </Stack>

      {/* Quotes & Recipes */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mt={3}>

        <Paper
          sx={{
            padding: 3,
            flex: 1,
            height: "400px",
            overflowY: "auto",
            backgroundColor: theme.palette.mode === "dark" ? "rgb(153, 156, 89)":"rgb(228, 224, 224)"
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 ,color:"black"}}>
            Motivational Quotes
          </Typography>
          {quotesLoading ? (
            <CircularProgress />
          ) : (
            quotes?.quotes?.map((quote: Quote, index: number) => (
              <Typography key={index} variant="body1" sx={{ marginBottom: 2 ,color:"black"}}>
                " {quote.quote} " - {quote.author}
              </Typography>
            ))
          )}
        </Paper>

        <Paper
          sx={{
            padding: 3,
            flex: 1,
            height: "400px",
            overflowY: "auto",
            backgroundColor: theme.palette.mode === "dark" ? "rgb(239, 193, 193)":"rgb(228, 224, 224)",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2,color:"black" }}>
            Recipes
          </Typography>
          {recipesLoading ? (
            <CircularProgress />
          ) : (
            recipes?.recipes?.map((recipe: Recipe, index: number) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  marginBottom: 2,
                  cursor: "pointer",
                  color:"black",
                  textDecoration: "underline",
                }}
                onClick={() => setSelectedRecipe(recipe)}
              >
                🍽 {recipe.name}
              </Typography>
            ))
          )}
        </Paper>
      </Stack>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <Modal
        open={Boolean(selectedRecipe)}
        onClose={() => setSelectedRecipe(null)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper sx={{ padding: 4, width: "500px", textAlign: "center" }}>
          <Typography variant="h5">{selectedRecipe.name}</Typography>
      
          <Typography variant="body1" sx={{ marginTop: 2, textDecoration: "underline", textAlign: "left" }}>
            <strong>Ingredients:</strong>
          </Typography>
          <Typography sx={{ textAlign: "left" }}>{selectedRecipe.ingredients?.join(", ")}</Typography>
      
          <Typography variant="body1" sx={{ marginTop: 2, textDecoration: "underline", textAlign: "left" }}>
            <strong>Instructions:</strong>
          </Typography>
          <Typography sx={{ textAlign: "left" }}>{selectedRecipe.instructions}</Typography>
          <Typography sx={{marginTop: 2, textDecoration: "underline", textAlign: "left" }}>
            <strong>Cooking Time: </strong>{selectedRecipe.cookTimeMinutes}min
          </Typography>
          <Typography sx={{ marginTop: 2, textDecoration: "underline",textAlign: "left" }}>
            <strong>Servings: </strong> {selectedRecipe.servings} persons
          </Typography>
      
          <Button variant="contained" sx={{ marginTop: 3, display: "block", mx: "auto" }} onClick={() => setSelectedRecipe(null)}>
            Close
          </Button>
        </Paper>
      </Modal>
      
      )}
      <Footer/>
    </Box>
  );
};

export default AdminDashboard;
