"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardProfile from "../profile/ProfileCard";
import LoverProfile from "../profile/LoverCard";

interface User {
  nickName: string;
  email: string;
  // 추가적인 유저 정보 필드
}

const UserManager: React.FC = () => {
  const session = useSession();
  const [nickName, setNickName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const token = session.data?.user.id;
  const defaultTheme = createTheme();
  const URL = process.env.NEXT_PUBLIC_URL;
  const API_URL = `${URL}/users`;
  const [block,setBolck] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/info/search/${nickName}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const userData: User = response.data;
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  const handleBlockUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/block/${nickName}`,{
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setBolck(response.data);
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Manager</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="유저 이름 입력"
          className="mr-2 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <button
          type="button"
          className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md focus:ring focus:ring-opacity-50"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>
      <>
        <ThemeProvider theme={defaultTheme}>
          <Grid container>
            {/* 여기는 왼쪽 정보란 -> 컴포넌트화 할 수 있음 */}
            <Grid item xs={4}>
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
                  <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box sx={{ fontSize: "36px", fontWeight: "bold" }}>
                          {user?.nickName}
                        </Box>
                        <Box sx={{ fontSize: 14 }} color="text.secondary">
                          {user?.email}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Grid>
            {nickName}
            <Button onClick={handleBlockUser}>유저 차단하기</Button>
          </Grid>
        </ThemeProvider>
      </>
    </div>
  );
};

export default UserManager;
