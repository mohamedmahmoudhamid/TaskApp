import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Typography, 
  Button, 
  Box, 
  Paper,
  LinearProgress,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';

const Goal = () => {
  const [goal, setGoal] = useState({
    title: '',
    description: '',
    targetValue: 0,
    startDate: new Date(),
    endDate: new Date(),
    currentValue: 0,
    unit: 'ساعة' // يمكن تغييرها لـ "صفحة" أو "كيلوجرام" وغيرها
  });
  const [isEditing, setIsEditing] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const savedGoal = localStorage.getItem('currentGoal');
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
      setIsEditing(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setGoal(prev => ({ ...prev, [name]: date }));
  };

  const saveGoal = () => {
    localStorage.setItem('currentGoal', JSON.stringify(goal));
    setIsEditing(false);
  };

  const progress = goal.targetValue > 0 
    ? Math.min(100, (goal.currentValue / goal.targetValue) * 100) 
    : 0;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto',ml:{ md: 80, xs: 35, sm: 33 }, mt: 25 }}>
      <Typography variant="h5" gutterBottom>
        {isEditing ? 'تحديد الهدف الجديد' : 'هدفك الحالي'}
      </Typography>

      {isEditing ? (
        <>
          <TextField
            fullWidth
            label="عنوان الهدف"
            name="title"
            value={goal.title}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            multiline
            rows={3}
            label="وصف الهدف"
            name="description"
            value={goal.description}
            onChange={handleInputChange}
            margin="normal"
          />
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              type="number"
              label={`القيمة المستهدفة (${goal.unit})`}
              name="targetValue"
              value={goal.targetValue}
              onChange={handleInputChange}
            />
            
            <TextField
              fullWidth
              select
              label="وحدة القياس"
              name="unit"
              value={goal.unit}
              onChange={handleInputChange}
              SelectProps={{ native: true }}
            >
              {['ساعة', 'صفحة', 'كيلوجرام', 'تمرين', 'يوم'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </TextField>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <DatePicker
              label="تاريخ البداية"
              value={goal.startDate}
              onChange={(date) => handleDateChange('startDate', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            
            <DatePicker
              label="تاريخ الانتهاء"
              value={goal.endDate}
              onChange={(date) => handleDateChange('endDate', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          
          <Button 
            variant="contained" 
            onClick={saveGoal}
            sx={{ mt: 3 }}
            fullWidth
          >
            حفظ الهدف
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>{goal.title}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {goal.description}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">
              التقدم: {goal.currentValue} / {goal.targetValue} {goal.unit}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 10, borderRadius: 5, mt: 1 }}
              color={progress >= 100 ? 'success' : 'primary'}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => setIsEditing(true)}
              fullWidth
            >
              تعديل الهدف
            </Button>
            
            <Button 
              variant="contained" 
              onClick={() => navigate('/daily-progress')}
              fullWidth
            >
              تسجيل التقدم اليومي
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Goal;