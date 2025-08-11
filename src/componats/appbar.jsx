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
  IconButton,
  Box,
  CssBaseline,
  useMediaQuery,
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
  TrendingUp,
  Menu as MenuIcon,
} from "@mui/icons-material";
import "./appbar.css";

const drawerWidth = 240;

export default function ButtonAppBar({ themeMode, setThemeMode }) {
  const theme = useTheme();
  const location = useLocation();

  // يتغير ليشمل الشاشات حتى md (التابلت)
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const [userName, setUserName] = React.useState("");
  const [userImage, setUserImage] = React.useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/home" },
    { text: "Daily Log", icon: <Create />, path: "/create" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Settings", icon: <Settings />, path: "/setting" },
    { text: "Goal", icon: <Flag />, path: "/goal" },
    { text: "Progress Summary", icon: <Assessment />, path: "/ProgressSummary" },
    { text: "Daily Progress", icon: <TrendingUp />, path: "/DailyProgress" },
  ];

  const drawerContent = (
    <>
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
                  : "transparent",
            }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => {
                if (isTabletOrSmaller) setMobileOpen(false);
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  color: location.pathname === item.path ? "primary" : "inherit",
                })}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="primary"
      >
        <Toolbar>
          {isTabletOrSmaller && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, lg: isTabletOrSmaller ? 0 : `${drawerWidth}px` }}
          >
            <Link
              className="hover"
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {`</> ${userName || "User"}`}
            </Link>
          </Typography>

          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ mr: 1 }}
            aria-label="toggle theme"
          >
            {themeMode === "dark" ? (
              <DarkMode sx={{ fontSize: 28 }} />
            ) : (
              <LightMode sx={{ fontSize: 28, color: "#FFD700" }} />
            )}
          </IconButton>

          <Link to="/profile">
            <Avatar
              src={userImage || "/default-profile.png"}
              alt="Profile"
              sx={{ ml: 1 }}
            />
          </Link>
        </Toolbar>
      </AppBar>

      {/* Drawer للسطح المكتب (شاشات أكبر من md) */}
      {!isTabletOrSmaller && (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: "64px",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Drawer للموبايل والتابلت */}
      {isTabletOrSmaller && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: "60px",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
          ml: isTabletOrSmaller ? 0 : `${drawerWidth}px`,
        }}
      >
        {/* محتوى الداشبورد هنا */}
      </Box>
    </>
  );
}
