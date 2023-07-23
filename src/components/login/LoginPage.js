import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Avatar, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KakaoLoginBtn from '../../static/images/login_button/kakao_login.png'
import NaverLoginBtn from '../../static/images/login_button/naver_login.png'
import GoogleLoginBtn from '../../static/images/login_button/google_login.png'
import HandleKakaoLogin from './api/KakaoLogin';

const imageStyle = {
    width: '100%',  // 원하는 너비로 설정
    height: '60px', // 원하는 높이로 설정
    // objectFit: 'contain', // 이미지의 비율을 유지하면서, 지정된 너비와 높이에 맞게 조정
  };

const Login=()=>{
    const paperStyle={padding: '30px 20px', width: 300, margin:"20px auto"}
    const avatarStyle={backgroundColor: '#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <hr/>
                <Button onClick={HandleKakaoLogin}>
                    <img src={ KakaoLoginBtn } alt="Button" style={imageStyle} />
                </Button>
                <Button>
                    <img src={ NaverLoginBtn } alt="Button" style={imageStyle} />
                </Button>
                <Button>
                    <img src={ GoogleLoginBtn } alt="Button" style={imageStyle} />
                </Button>
                <Typography >
                     <Link href="#">
                        Forgot password ?
                     </Link>
                </Typography>
                <Typography> Do you have an account ?
                     <Link href="#">
                        Sign Up 
                     </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;
