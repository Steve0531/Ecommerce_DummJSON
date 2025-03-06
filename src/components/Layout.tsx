import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSidebarStore } from "../store/sidebarStore";

const Layout = () => {
  const { isSidebarOpen } = useSidebarStore();
  const theme = useTheme();
  const bgImage = theme.palette.mode === "dark" ? "/dark.jpeg" : "/light.jpeg";

  return (
    <Box display="flex" sx={{ position: "relative", height: "100vh", width: "100%" }}>
      
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)", 
          zIndex: -1, 
        }}
      />

      {/* Sidebar and Main Content */}
      <Sidebar />
      <Box
        component="main"
        flexGrow={1}
        p={1}
        sx={{
          transition: "margin-left 0.3s ease-in-out", 
          marginLeft: isSidebarOpen ? "90px" : "5px",
          position: "relative", 
          zIndex: 1, 
        }}
      >
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default Layout;
