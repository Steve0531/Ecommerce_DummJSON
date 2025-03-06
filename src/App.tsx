import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from "./components/Layout";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import UserManagement from "./pages/UserManagement";
import UserDetails from "./pages/UserDetails";
import OrderManagement from "./pages/OrderManagement";
import BlogPost from "./pages/BlogPost";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import BlogPostDetails from "./pages/BlogPostDetails";

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/user-management/:id" element={<UserDetails />} />
                <Route path="/order-management" element={<OrderManagement />} />
                <Route path="/posts" element={<BlogPost />} />
                <Route path="/posts/:id/comments" element={<BlogPostDetails />} />
              </Route>
            </Route>
          </Routes>
    </Router>
  );
}

export default App;
