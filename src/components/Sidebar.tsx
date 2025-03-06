import { useState } from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, ListItemButton, Box} from "@mui/material";
import { Home, ShoppingCart, People, Menu, Logout, Comment, Store } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();

  const role = localStorage.getItem("role");

  if (!token) return null; 


  const adminMenuItems = [
    { text: "Dashboard", icon: <Home />, path: "/admin-dashboard" },
    { text: "Users", icon: <People />, path: "/user-management" },
    { text: "Orders", icon: <ShoppingCart />, path: "/order-management" },
  ];

  const menuItems = [
    { text: "Products", icon: <Store />, path: "/products" },
    { text: "Cart", icon: <ShoppingCart />, path: "/cart" },
    { text: "Posts", icon: <Comment />, path: "/posts" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 70, 
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        "& .MuiDrawer-paper": {
          width: open ? 240 : 70,
          backgroundColor: "rgba(190, 182, 182, 0.9)",
          color: "rgba(9, 9, 9, 0.9)",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
        },
      }}
    >
      <Box display="flex" justifyContent={open ? "flex-end" : "center"} p={1}>
        <IconButton onClick={() => setOpen(!open)}>
          <Menu />
        </IconButton>
      </Box>

      <List>
        {role === "admin" &&
          adminMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}

        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>


      <List sx={{ position: "absolute", bottom: 10, width: "100%" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <Logout />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
