import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        height: '100vh',
      
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        textAlign: 'center',
        ml: { xs: 10, sm: 20, md: 25 },
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: 120, mb: 2, color: '#1976d2' }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 1 }}>
        الصفحة غير موجودة
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 360 }}>
        الرابط الذي تحاول الوصول إليه غير صحيح أو تم حذفه.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
      >
        العودة للرئيسية
      </Button>
    </Box>
  );
};

export default NotFound;
