"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const pathname = usePathname();
  const router = useRouter();

  const [emailState, setEmailState] = React.useState("");
  const [nickNameState, setNickNameState] = React.useState("");
  const [userNameState, setUserNameState] = React.useState("");
  const [isNickNameUnique, setIsNickNameUnique] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      const nickName = urlParams.get("nickName");

      setEmailState(decodeURIComponent(email || ""));
      setNickNameState(decodeURIComponent(nickName || ""));
      setUserNameState(decodeURIComponent(nickName || ""));
    }
  }, []);

  const checkNickName = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/check/nickname?nickName=${nickNameState}`
      );
      if (response.data.exists) {
        setIsNickNameUnique(false);
        alert("닉네임이 이미 존재합니다. 다른 닉네임을 사용해주세요");
      } else {
        setIsNickNameUnique(true);
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = emailState;
    const nickName = nickNameState;
    const userName = userNameState;

    // 입력 필드가 비어 있는지 확인
    if (!email || !userName || !nickName) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    try {
      const response = await axios.post(API_URL + `/users/join/update`, {
        nickName: nickName,
        email: email,
        userName: userName,
      });

      if (response.status === 201) {
        alert("User created successfully!"); // 성공하면 alert을 표시합니다
        window.location.href = "/login"; // alert 확인 후 로그인 페이지로 이동시킵니다
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원정보 추가입력 페이지
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nickname"
                  name="nickName"
                  required
                  fullWidth
                  id="nickName"
                  label="닉네임"
                  value={nickNameState}
                  onChange={(e) => setNickNameState(e.target.value)}
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={checkNickName}
                        variant="outlined"
                        size="small"
                      >
                        Check
                      </Button>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="userName"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="사용자명"
                  value={userNameState} // 설정된 userNameState 값을 사용
                  disabled={true} // 필드를 비활성화
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={emailState}
                  disabled={true}
                  onChange={(e) => setEmailState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="광고/이벤트 정보 수신에 동의 하십니까?"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원 가입
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 회원이십니까? 로그인하러 가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
