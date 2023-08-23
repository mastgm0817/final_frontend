import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchLover from "./SearchLover";

const API_URL = process.env.NEXT_PUBLIC_URL;

function LoverProfile({ title, buttonText1, buttonText2 }) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      if (session) {
        try {
          const nickName = session.user.name;
          const authToken = session.user.id;
          const response = await axios.get(
            API_URL + `/users/info/${nickName}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          setError(error);
        }
      }
    }
    fetchUserInfo();
  }, [session]);

  // 서버에 수정 요청 보내는 함수
  // const handleConfirmButtonClick = async (confirm) => {
  //   if (session && result) {
  //     try {
  //       const authToken = session.user.id;
  //       const response = await axios.post(
  //         API_URL + `/users/info/update/${result.nickName}`,
  //         { confirm }, // 수정 요청 데이터
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       // 결과 처리
  //       if (response.status === 200) {
  //         // 서버 응답에 따른 처리 (예: 성공 메시지 표시)
  //       }
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }
  //   setConfirmDialogOpen(false); // 확인 다이얼로그 닫기
  // };

  // 버튼2 클릭 시 실행되는 함수
  const handleButton2Click = () => {
    setUserInfo(null); // 유저 정보 초기화
    setInputNickName(""); // 입력된 닉네임도 초기화
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#f783ac" >
              {title}
            </Typography>
            {userInfo && (
              <>
                <TextField
                  id="연인 닉네임"
                  value={userInfo.nickName}
                  InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                  variant="standard"
                  sx={{ display: 'flex' }}
                />
                <br />
                <TextField
                  id="standard-basic"
                  value={userInfo.email}
                  InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                  variant="standard"
                  sx={{ display: 'flex' }}
                />
              </>)} <br />
          </CardContent>
          <CardActions>
            <SearchLover/>
            <Button size="small" onClick={handleButton2Click}>{buttonText2}</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );

}

export default LoverProfile;
