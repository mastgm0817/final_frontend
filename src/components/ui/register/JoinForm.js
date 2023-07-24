import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleSubmit from './api/handleSubmit';
import { TextField, Button, Grid, Typography } from '@mui/material';

const JoinForm = () => {
    const [state, setState] = useState({
        nickName: '',
        userName: '',
        email: '',
        password: '',
        profileImage: '',
        lover: '',
    });

    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        handleSubmit(e, state, setSuccessMessage, navigate);
    };

    return (
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
            <form onSubmit={submitForm}>
                <Grid item xs={12}>
                    <TextField name="nickName" onChange={handleChange} label="Nickname" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="userName" onChange={handleChange} label="Username" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="email" onChange={handleChange} label="Email" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="password" onChange={handleChange} label="Password" type="password" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="profileImage" onChange={handleChange} label="ProfileImage" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="lover" onChange={handleChange} label="Lover" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
            </form>
            {successMessage && 
                <Grid item xs={12}>
                    <Typography>{successMessage}</Typography>
                </Grid>
            }
        </Grid>
    );
};

export default JoinForm;
