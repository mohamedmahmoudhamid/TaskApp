import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Button, MenuItem, Snackbar, Alert } from '@mui/material';
import ButtonAppBar from './appbar';
import { DataContext } from '../DataContext';


const taskOptions = [
    { value: 'gym', label: '🏋️ جيم' },
    { value: 'studying', label: '📚 مذاكرة' },
    { value: 'playing', label: '🎮 لعب' },
    { value: 'water', label: '💧 شرب مياه' },
    { value: 'coding', label: '💻 كودينج' }
];

const Create = ({ themeMode, setThemeMode }) => {
    const { addActivity } = useContext(DataContext);
    const [inputs, setInputs] = useState({
        type: '',
        name: '',
        date: '',
        hours: '',
        waterAmount: ''
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const showNameField = inputs.type === 'gym' || inputs.type === 'studying';

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskName = (inputs.type === 'water') ? 'شرب المياه' :
            showNameField ? inputs.name : taskOptions.find(opt => opt.value === inputs.type)?.label.replace(/^[^\s]+\s/, '');

        if (!inputs.type || !inputs.date ||
            (showNameField && !inputs.name) ||
            (inputs.type !== 'water' && !showNameField && !inputs.hours) ||
            (inputs.type === 'water' && !inputs.waterAmount)
        ) {
            setSnackbar({ open: true, message: 'من فضلك املأ كل الحقول', severity: 'error' });
            return;
        }

        addActivity({
            ...inputs,
            name: taskName
        });

        setInputs({ type: '', name: '', date: '', hours: '', waterAmount: '' });
        setSnackbar({ open: true, message: 'تمت إضافة المهمة بنجاح', severity: 'success' });
    };

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <ButtonAppBar themeMode={themeMode} setThemeMode={setThemeMode} />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                    width: "366px",
                    display: "flex",
                    flexDirection: "column",
                    mt: "15px",
                   
                    
                    borderRadius: 3,

                    ml: { md: 50, xs: 0, sm: 10,},
                    p: 1,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    select
                    name="type"
                    label="اختر المهمة"
                    value={inputs.type}
                    onChange={handleChange}
                >
                    {taskOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {showNameField && (
                    <TextField
                        name="name"
                        label="اسم المهمة"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                )}

                <TextField
                    name="date"
                    label="التاريخ"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={inputs.date}
                    onChange={handleChange}
                />

                {inputs.type !== 'water' && inputs.type && (
                    <TextField
                        name="hours"
                        label="عدد الساعات"
                        type="number"
                        value={inputs.hours}
                        onChange={handleChange}
                    />
                )}

                {inputs.type === 'water' && (
                    <TextField
                        name="waterAmount"
                        label="كمية المياه (لتر أو ملي)"
                        value={inputs.waterAmount}
                        onChange={handleChange}
                    />
                )}

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                >
                    إضافة
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
       
        </div>
    );
};

export default Create;
