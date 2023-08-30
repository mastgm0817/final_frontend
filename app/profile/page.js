"use client";
import { useState, useEffect } from "react";
import MilitaryTechSharpIcon from "@mui/icons-material/MilitaryTechSharp";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ModeIcon from "@mui/icons-material/Mode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardProfile from "../../components/profile/ProfileCard";
import CouponInfo from "../../components/profile/CouponInfo";
import LoverProfile from "../../components/profile/LoverCard";
import ProfileImageUploadPopUp from "../../components/profile/ProfileImageUpLoadPopUp";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_URL;

export default function UserInfo() {
  // 이미지 수정 로직
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const defaultTheme = createTheme();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleOpenUploadPopup = () => {
    setUploadPopupOpen(true);
  };

  const handleCloseUploadPopup = () => {
    setUploadPopupOpen(false);
  };

  const handleSaveImage = async (imageFile) => {
    if (!session) {
      console.log("User session not available.");
      return;
    }

    try {
      const authToken = session.user.id;
      const nickName = session.user.name;

      // 1. 프로필 이미지 업로드
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await axios.post(
        API_URL + `/users/info/updateProfileImage/${nickName}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      let updatedImageUrl;
      let responseUpdate;

      if (response.status === 200) {
        // 업로드한 이미지 URL을 사용 -> userInfo를 Put 요청으로 업데이트
        updatedImageUrl = response.data; // 새 이미지 url

        responseUpdate = await axios.put(
          API_URL + `/users/info/updateProfileImage/${nickName}`,
          { profileImage: updatedImageUrl }, // 새 이미지 URL 포함
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (responseUpdate && responseUpdate.status === 200) {
        // 프로필 이미지 업데이트 후 서버 응답 데이터로 useInfo.profileImage 속성값 업데이트
        console.log("responseUpdate for update: ", responseUpdate);
        const updatedUserInfo = {
          ...userInfo,
          profileImage: updatedImageUrl,
        };
        // 필요한 경우 userInfo 상태 업데이트
        setUserInfo(updatedUserInfo);
        // 팝업 닫기
        handleCloseUploadPopup();
      }
    } catch (error) {
      console.error(
        "Error uploading image or updating profile:",
        error.message
      );
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/users/delete/${session.user.name}`
      );
      if (response.status === 200) {
        // 로그아웃 처리
        alert("회원탈퇴되었습니다.");
        signOut({
          callbackUrl: "/login", // 로그아웃 후 리다이렉트될 URL
          redirect: true, // 리다이렉트를 수행할지 여부
        });
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // session 데이터
  useEffect(() => {
    async function fetchUserInfo() {
      // console.log(session);
      if (session) {
        try {
          const nickName = session.user.name;
          const authToken = session.user.id;
          // console.log(authToken);

          const response = await axios.get(
            API_URL + `/users/info/${nickName}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log(response.data);

          setUserInfo(response.data);
        } catch (error) {
          setError(error);
        }
      }
    }

    fetchUserInfo();
  }, [session]);

  // 에러 표현
  if (!session) {
    return <p>No session</p>;
  }

  if (error) {
    return <p>Error fetching user info: {error.message}</p>;
  }

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
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
                <Button
                  sx={{ mb: 2, position: "relative" }}
                  onClick={handleOpenUploadPopup}
                >
                  <Avatar sx={{ m: 2, width: 200, height: 200 }}>
                    <Avatar
                      alt="User porfile"
                      src={userInfo.profileImage}
                      sx={{ width: 200, height: 200 }}
                    />
                  </Avatar>
                  <ModeIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 30,
                      height: 30,
                      backgroundColor: "white",
                      color: "#f783ac",
                      borderRadius: "50%",
                    }}
                  />
                </Button>
                <ProfileImageUploadPopUp
                  open={uploadPopupOpen}
                  onClose={handleCloseUploadPopup}
                  onSave={handleSaveImage}
                  profileImage={userInfo.profileImage}
                />
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ fontSize: "36px", fontWeight: "bold" }}>
                        {userInfo.nickName}
                      </Box>
                      <Box sx={{ fontSize: 14 }} color="text.secondary">
                        {userInfo.email}
                      </Box>
                      <Box sx={{ fontSize: 14 }} color="text.secondary">
                        <MilitaryTechSharpIcon />
                        현재등급 : {userInfo.userRole}
                        <Link href="/price">
                          <Button>등급업하기</Button>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Grid>
          {/* 여기서부턴 정보를 나타내는 공간 */}
          <Grid item xs={8}>
            <Container sx={{ m: 3 }}>
              {/* <CardProfile title="내프로필" buttonText="수정하기" /><br/> */}
              <CardProfile title="내프로필" />
              <br />
              <LoverProfile title="연인 정보" buttonText2="헤어지기" />
              <br />
              <CouponInfo title="쿠폰정보" />
              <br />
              <Button onClick={deleteUser}>회원탈퇴</Button>
            </Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
