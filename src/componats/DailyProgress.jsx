import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

const DailyProgress = () => {
  const [progress, setProgress] = useState({
    date: new Date(),
    value: 0,
    notes: ''
  });
  const [records, setRecords] = useState([]);
  const [goal, setGoal] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const savedGoal = localStorage.getItem('currentGoal');
    const savedRecords = localStorage.getItem('progressRecords');
    
    if (savedGoal) setGoal(JSON.parse(savedGoal));
    if (savedRecords) setRecords(JSON.parse(savedRecords));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgress(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setProgress(prev => ({ ...prev, date }));
  };

  const saveProgress = () => {
    const newRecord = {
      ...progress,
      date: format(progress.date, 'yyyy-MM-dd')
    };
    
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem('progressRecords', JSON.stringify(updatedRecords));
    
    // تحديث القيمة الحالية في الهدف
    if (goal) {
      const updatedGoal = {
        ...goal,
        currentValue: goal.currentValue + Number(progress.value)
      };
      setGoal(updatedGoal);
      localStorage.setItem('currentGoal', JSON.stringify(updatedGoal));
    }
    
    setProgress({ date: new Date(), value: 0, notes: '' });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 10,    ml: { md: 80, xs: 35, sm: 33 },p:5 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          تسجيل التقدم اليومي
        </Typography>
        
        {goal && (
          <Typography variant="subtitle1" color="text.secondary">
            الهدف الحالي: {goal.title} ({goal.currentValue}/{goal.targetValue} {goal.unit})
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <DatePicker
            label="تاريخ اليوم"
            value={progress.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          
          <TextField
            fullWidth
            type="number"
            label={`القيمة (${goal?.unit || 'وحدة'})`}
            name="value"
            value={progress.value}
            onChange={handleInputChange}
          />
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={3}
          label="ملاحظات"
          name="notes"
          value={progress.notes}
          onChange={handleInputChange}
          margin="normal"
        />
        
        <Button 
          variant="contained" 
          onClick={saveProgress}
          sx={{ mt: 2 }}
          disabled={!goal}
          fullWidth
        >
          حفظ التقدم
        </Button>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          سجل التقدم
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>التاريخ</TableCell>
                <TableCell align="center">القيمة</TableCell>
                <TableCell>ملاحظات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell align="center">{record.value} {goal?.unit}</TableCell>
                    <TableCell>{record.notes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    لا توجد سجلات مسجلة
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DailyProgress;