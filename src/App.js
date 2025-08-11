import { HashRouter, Routes, Route } from "react-router-dom";
import ButtonAppBar from "./componats/appbar";
import NotFound from "./componats/notfound";
import About from "./componats/about";
import Goal from "./componats/Goal";
import Profile from "./componats/profile";
import Setting from "./componats/setting";
import Home from "./componats/Home";
import Create from "./componats/Create";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { DataProvider } from "./DataContext";
import Nav from "./test";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ProgressSummary from "./componats/ProgressSummary";
import DailyProgress from "./componats/DailyProgress";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <HashRouter>
            <ButtonAppBar themeMode={themeMode} setThemeMode={setThemeMode} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <Profile themeMode={themeMode} setThemeMode={setThemeMode} />
                }
              />
              <Route path="/goal" element={<Goal />} />
              <Route path="/ProgressSummary" element={<ProgressSummary />} />
              <Route path="/DailyProgress" element={<DailyProgress />} />
              <Route
                path="/setting"
                element={
                  <Setting themeMode={themeMode} setThemeMode={setThemeMode} />
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/create"
                element={
                  <Create themeMode={themeMode} setThemeMode={setThemeMode} />
                }
              />
              <Route path="*" element={<NotFound />} />

              <Route path="/nav" element={<Nav />} />
            </Routes>
          </HashRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
