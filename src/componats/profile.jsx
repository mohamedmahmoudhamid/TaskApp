import React, { useState, useEffect } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import ButtonAppBar from "./appbar";
import {
  Box,
  Button,
  Typography,
  Avatar,
  useTheme,
  Tooltip,
  TextField,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TodayIcon from "@mui/icons-material/Today";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const Profile = ({ themeMode, setThemeMode }) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    bio: "",
    goal: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleImageDelete = () => {
    if (user.image) {
      const updated = { ...user, image: "" };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...user, image: reader.result };
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: { xs: 3, sm: 5 },
        mb: { xs: 3, sm: 5 },
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
      }}
    >
      <ButtonAppBar themeMode={themeMode} setThemeMode={setThemeMode} />

      <Box sx={{ mb: 2, position: "relative" }}>
        <Avatar
          src={user.image || "/default-profile.png"}
          sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {user.image && (
            <Button size="small" color="error" onClick={handleImageDelete}>
              حذف الصورة
            </Button>
          )}
          <Button variant="contained" component="label" size="small">
            {user.image ? "تغيير" : "إضافة"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Box>
      </Box>

      {isEditing ? (
        <TextField
          fullWidth
          label="الاسم الكامل"
          name="fullName"
          value={user.fullName}
          onChange={handleInputChange}
          sx={{ mb: 2, textAlign: "right" }}
        />
      ) : (
        <Typography variant="h6" color="text.primary" noWrap>
          {user.fullName || "مستخدم غير معروف"}
        </Typography>
      )}

      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
          النبذة الشخصية:
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={3}
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
            sx={{ mb: 2, textAlign: "right" }}
          />
        ) : (
          <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
            {user.bio || "لا توجد نبذة مضافة"}
          </Typography>
        )}

        <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
          الهدف:
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={2}
            name="goal"
            value={user.goal}
            onChange={handleInputChange}
            sx={{ textAlign: "right" }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {user.goal || "لا يوجد هدف مضاف"}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        {isEditing ? (
          <>
            <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
              حفظ
            </Button>

            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              إلغاء
            </Button>
          </>
        ) : (
          <>
            <Tooltip title="تعديل">
              <Button onClick={() => setIsEditing(true)} sx={{ mr: 1 }}>
                تعديل
              </Button>
            </Tooltip>

            <Tooltip title="تسجيل الخروج">
              <Button color="error" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </Tooltip>
          </>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            display: "block",
            textAlign: "center",
          }}
          color="text.secondary"
        >
          اذهب إلى
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mt: 1,
          }}
        >
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<AddTaskIcon />}
              sx={{ borderRadius: "20px", px: 2 }}
            >
              إضافة مهمة
            </Button>
          </Link>

          <Link to="/DailyProgress" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<TodayIcon />}
              sx={{ borderRadius: "20px", px: 2 }}
            >
              مهام اليوم
            </Button>
          </Link>

          <Link to="/ProgressSummary" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<BarChartIcon />}
              sx={{ borderRadius: "20px", px: 2 }}
            >
              ملخص الإنجاز
            </Button>
          </Link>

          <Link to="/setting" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<SettingsIcon />}
              sx={{ borderRadius: "20px", px: 2 }}
            >
              الإعدادات
            </Button>
          </Link>
        </Box>
      </Box>

      <Link
        to="/"
        style={{
          display: "block",
          textDecoration: "none",
          marginTop: 20,
          color: theme.palette.primary.main,
        }}
      >
        الرجوع للرئيسية
      </Link>
    </Box>
  );
};

export default Profile;
