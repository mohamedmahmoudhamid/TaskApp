import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const ProgressSummary = () => {
  const [goal, setGoal] = useState(null);
  const [records, setRecords] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const savedGoal = localStorage.getItem('currentGoal');
    const savedRecords = localStorage.getItem('progressRecords');
    
    if (savedGoal) setGoal(JSON.parse(savedGoal));
    if (savedRecords) setRecords(JSON.parse(savedRecords));
  }, []);

  if (!goal) {
    return (
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 10, ml: { md: 80, xs: 35, sm: 33 }, }}>
        <Typography variant="h6" align="center">
          لم يتم تحديد هدف بعد
        </Typography>
      </Paper>
    );
  }

  const progress = (goal.currentValue / goal.targetValue) * 100;
  const daysLeft = Math.ceil((new Date(goal.endDate) - new Date()) / (1000 * 60 * 60 * 24));
  const avgDailyRequired = (goal.targetValue - goal.currentValue) / Math.max(1, daysLeft);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 10,p:5,mb:5,    ml: { md: 50, xs: 0, sm: 10 ,lg:70}, }}>
      <Typography variant="h5" gutterBottom>
        ملخص التقدم
      </Typography>
      
      <Typography variant="h6" sx={{ mt: 2 }}>{goal.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {goal.description}
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2">
          {goal.currentValue} / {goal.targetValue} {goal.unit} ({Math.round(progress)}%)
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 10, borderRadius: 5, mt: 1 }}
          color={progress >= 100 ? 'success' : 'primary'}
        />
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <List>
        <ListItem>
          <ListItemText
            primary="الأيام المتبقية"
            secondary={daysLeft > 0 ? `${daysLeft} يوم` : 'انتهى الوقت'}
          />
        </ListItem>
        
        <ListItem>
          <ListItemText
            primary="المتوسط اليومي المطلوب"
            secondary={`${avgDailyRequired.toFixed(1)} ${goal.unit}/يوم`}
          />
        </ListItem>
        
        <ListItem>
          <ListItemText
            primary="حالة الهدف"
            secondary={
              progress >= 100 ? 'مكتمل' : 
              daysLeft <= 0 ? 'انتهى الوقت' :
              'قيد التنفيذ'
            }
          />
          {progress >= 100 ? (
            <CheckCircleIcon color="success" />
          ) : daysLeft <= 0 ? (
            <WarningIcon color="error" />
          ) : null}
        </ListItem>
      </List>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        آخر التحديثات
      </Typography>
      
      {records.slice(-3).reverse().map((record, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: theme.palette.action.hover }}>
          <Typography variant="body2">
            <strong>{record.date}:</strong> +{record.value} {goal.unit}
          </Typography>
          {record.notes && (
            <Typography variant="body2" color="text.secondary">
              {record.notes}
            </Typography>
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default ProgressSummary;