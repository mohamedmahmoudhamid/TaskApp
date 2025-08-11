import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  IconButton
} from "@mui/material";
import {
  Home,
  Create,
  Person,
  Settings,
  LightMode,
  DarkMode,
  Flag,
  Assessment,
  TrendingUp
} from "@mui/icons-material";
import "./appbar.css";

export default function ButtonAppBar({ themeMode, setThemeMode }) {
  const theme = useTheme();
  const location = useLocation();
  const [userName, setUserName] = React.useState("");
  const [userImage, setUserImage] = React.useState("");

  const loadUserData = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.fullName || "");
      setUserImage(parsedData.image || "");
    } else {
      setUserName("");
      setUserImage("");
    }
  };

  React.useEffect(() => {
    loadUserData();
  }, [location]);

  // متابعة التغييرات في localStorage من أي مكان في التطبيق
  React.useEffect(() => {
    const handleStorageChange = () => {
      loadUserData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newMode);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/home" },
    { text: "Daily Log", icon: <Create />, path: "/create" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Settings", icon: <Settings />, path: "/setting" },
    { text: "Goal", icon: <Flag />, path: "/goal" },
    { text: "Progress Summary", icon: <Assessment />, path: "/ProgressSummary" },
    { text: "Daily Progress", icon: <TrendingUp />, path: "/DailyProgress" }
  ];

  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginLeft: "240px" }}
            >
              <Link
                className="hover"
                to="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {`</> ${userName || "User"}`}
              </Link>
            </Typography>

            <Link to="/profile">
              <Avatar
                src={userImage || "/default-profile.png"}
                alt="Profile"
                sx={{ ml: 1 }}
              />
            </Link>
          </Toolbar>
        </AppBar>
      </div>

      <Drawer
        sx={{
          width: "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            margin: "10px",
            "&:hover": {
              backgroundColor: "transparent"
            }
          }}
        >
          {themeMode === "dark" ? (
            <DarkMode sx={{ fontSize: 28 }} />
          ) : (
            <LightMode sx={{ fontSize: 28, color: "#FFD700" }} />
          )}
        </IconButton>

        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{
                backgroundColor:
                  location.pathname === item.path
                    ? themeMode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)"
                    : "transparent"
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>
                  {React.cloneElement(item.icon, {
                    color:
                      location.pathname === item.path ? "primary" : "inherit"
                  })}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : "inherit"
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
