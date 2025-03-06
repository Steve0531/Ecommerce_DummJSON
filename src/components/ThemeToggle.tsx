import { IconButton } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeToggle = () => {
  const { toggleTheme, themeMode } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
        color: themeMode === "dark" ? "white" : "black",
      }}
    >
      {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
