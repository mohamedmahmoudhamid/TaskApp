import React, { useContext } from 'react';
import { IconButton, Paper, Typography, Box, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { DataContext } from '../DataContext';
import { motion } from "framer-motion";
import Footer from './footer';

const taskColors = {
    gym: "#ff7675",
    studying: "#74b9ff",
    playing: "#55efc4",
    water: "#81ecec",
    coding: "#a29bfe"
};

const taskIcons = {
    gym: "🏋️",
    studying: "📚",
    playing: "🎮",
    water: "💧",
    coding: "💻"
};

const Home = () => {
    const { activities, deleteActivity } = useContext(DataContext);
    const theme = useTheme();

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");
        if (confirmDelete) deleteActivity(index);
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 80px)",  // نفترض الفوتر ارتفاعه 80px
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
                pt: 15,
                px: { xs: 2, sm: 5, md: 10 },
                mx: "auto",
                maxWidth: 1300,
                mb: 2,
            }}
        >
            {activities.map((activity, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            width: { xs: 250, sm: 280 },
                            minHeight: 140,
                            p: 2,
                            position: "relative",
                            borderRadius: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            background: `linear-gradient(135deg, ${taskColors[activity.type] || "#dfe6e9"}, #fff)`,
                            color: theme.palette.text.primary,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                    >
                        <Typography variant="caption" sx={{ opacity: 0.8, mb: 1 }}>
                            {activity.date}
                        </Typography>

                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {taskIcons[activity.type]} {activity.name}
                        </Typography>

                        {activity.hours && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                عدد الساعات: {activity.hours}
                            </Typography>
                        )}

                        {activity.type === 'water' && activity.waterAmount && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                كمية المياه: {activity.waterAmount}
                            </Typography>
                        )}

                        <IconButton
                            sx={{ position: "absolute", top: 8, right: 8 }}
                            onClick={() => handleDelete(index)}
                        >
                            <Close sx={{ fontSize: "22px", color: "#2d3436" }} />
                        </IconButton>

                    </Paper>
                </motion.div>
            ))}
        </Box>
    );
};

const PageWrapper = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
                ,ml:{md:30,xs:35,sm:33}
            }}
        >
            <Home />
            <Footer />
        </Box>
    )
}

export default PageWrapper;
