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
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface User {
  uid: number;
  nickName: string;
  email: string;
  blocked: string;
  // 추가적인 유저 정보 필드
}
type CouponType = {
  couponContent: string;
  code: string;
  discountType: "PERCENTAGE" | "ANOTHER_POSSIBLE_TYPE"; // 여기에 가능한 다른 값들을 추가해 주세요.
  discountValue: number;
  createdAt: Date; // 만약 `today`와 `oneMonthLater`가 Date 타입이라면
  updatedAt: Date; // 만약 `today`와 `oneMonthLater`가 Date 타입이라면
  endAt: Date; // 만약 `oneMonthLater`가 Date 타입이라면
};

type BlockUserData = {
  reason: string;
  startDate: string; // ISO 형식의 문자열 (예: "2023-08-26T14:54:06.952")
  endDate: string; // ISO 형식의 문자열
};

const UserManager: React.FC = () => {
  const [formData, setFormData] = useState<BlockUserData>({
    reason: "",
    startDate: "",
    endDate: "",
  });
  const session = useSession();
  const [nickName, setNickName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const token = session.data?.user.id;
  const defaultTheme = createTheme();
  const URL = process.env.NEXT_PUBLIC_URL;
  const API_URL = `${URL}/admin`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${nickName}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const userData: User = response.data;
        setUserInfo(userData);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserInfo(null);
    }
  };

  const handleBlockUser = async (uid: number) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/block/${uid}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
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
                  {Array.isArray(userInfo) &&
                    userInfo.map((user, index) => (
                      <Box
                        component="form"
                        key={index}
                        sx={{
                          ml: 46,
                          mb: 5,
                          mt: -5,
                          p: 3,
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100vh", // 높이를 전체 뷰포트 높이로 설정
                          width: "full",
                        }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography
                              variant="h4"
                              component="div"
                              fontWeight="bold"
                            >
                              NickName: {user.nickName}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              E-mail: {user.email}
                            </Typography>
                            <Typography variant="body1">
                              UID: {user.uid}
                            </Typography>
                            <Typography variant="body1">
                              UserRole: {user.userRole}
                            </Typography>
                            <Typography
                              variant="h4"
                              component="div"
                              fontWeight="bold"
                            >
                              Lover: {user.lover}
                            </Typography>
                            {user.blackListDetails && (
                              <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>번호</TableCell>
                                        <TableCell>정지 사유</TableCell>
                                        <TableCell>정지 시작일</TableCell>
                                        <TableCell>정지 종료일</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow
                                        key={user.blackListDetails.blackId}
                                      >
                                        <TableCell>
                                          {user.blackListDetails.blackId}
                                        </TableCell>
                                        <TableCell>
                                          {user.blackListDetails.reason}
                                        </TableCell>
                                        <TableCell>
                                          {new Date(
                                            user.blackListDetails.startDate
                                          ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                          {user.blackListDetails.endDate
                                            ? new Date(
                                                user.blackListDetails.endDate
                                              ).toLocaleDateString()
                                            : "N/A"}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            )}
                          </Grid>
                          {user.couponList && user.couponList.length > 0 && (
                            <Grid item xs={12}>
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>번호</TableCell>
                                      <TableCell>종류</TableCell>
                                      <TableCell>코드</TableCell>
                                      <TableCell>할인</TableCell>
                                      <TableCell>생성 날짜</TableCell>
                                      <TableCell>수정 날짜</TableCell>
                                      <TableCell>만료일</TableCell>
                                      <TableCell>쿠폰소유자</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {user.couponList.map((item: any) => (
                                      <TableRow key={item.cpid}>
                                        <TableCell>{item.cpid}</TableCell>
                                        <TableCell>
                                          {item.couponContent}
                                        </TableCell>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>
                                          {item.discountType === "PERCENTAGE"
                                            ? `${item.discountValue} %`
                                            : `${item.discountValue} 원`}
                                        </TableCell>
                                        <TableCell>
                                          {new Date(
                                            item.createdAt
                                          ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                          {new Date(
                                            item.updatedAt
                                          ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                          {new Date(
                                            item.endAt
                                          ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{item.userId}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid>
                          )}
                        </Grid>
                        <div>
                          <label>
                            Reason:
                            <input
                              type="text"
                              name="reason"
                              value={formData.reason}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Start Date:
                            <input
                              type="datetime-local"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            End Date:
                            <input
                              type="datetime-local"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <Button onClick={() => handleBlockUser(user.uid)}>
                          유저 차단하기
                        </Button>
                      </Box>
                    ))}
                </Box>
              </Container>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    </div>
  );
};

export default UserManager;
