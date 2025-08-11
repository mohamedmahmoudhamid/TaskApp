import React from 'react';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const whatsappNumber = "+201280538625"; // استبدل هذا برقم واتسابك بصيغة دولية بدون علامات + أو 00

  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 3,
        px: 2,

        mt: 4,
        
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        جميع الحقوق محفوظة &copy; 2025
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        تم تطوير هذا التطبيق بواسطة محمد محمود
      </Typography>

      <IconButton
        aria-label="مراسلة على واتساب"
        color="success"
        onClick={() => window.open(whatsappLink, "_blank")}
        sx={{ fontSize: '1.2rem' }}
      >
        Mohamed Mahmoud <WhatsAppIcon sx={{ ml: 1 }} />
      </IconButton>
    </Box>
  );
};

export default Footer;
