import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonAppBar from './appbar';

const Setting = ({ themeMode, setThemeMode }) => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    bio: '',
    goal: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert("تم حفظ البيانات بنجاح");
    navigate('/profile');
  };

  return (
    <Box sx={{ maxWidth: 450, mx: "auto",  p:5,  ml: { md: 50, xs: 0, sm: 10 ,lg:70}, mt: 10, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <ButtonAppBar themeMode={themeMode} setThemeMode={setThemeMode} />

      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        إعدادات الحساب
      </Typography>

      <TextField
        label="الاسم الكامل"
        name="fullName"
        fullWidth
        value={user.fullName}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="البريد الإلكتروني"
        name="email"
        fullWidth
        value={user.email}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="النبذة عنك"
        name="bio"
        fullWidth
        multiline
        rows={2}
        value={user.bio}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="الهدف الذي تسعى إليه"
        name="goal"
        fullWidth
        multiline
        rows={2}
        value={user.goal}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" fullWidth onClick={handleSave}>
        حفظ التعديلات
      </Button>
    </Box>
  );
};

export default Setting;
