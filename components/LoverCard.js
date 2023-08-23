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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const API_URL = process.env.NEXT_PUBLIC_URL;

function LoverProfile({ title, buttonText1, buttonText2 }) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [inputnickName, setInputNickName] = useState("");
  // partner
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(null); // 검색 결과 저장
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // 결과 확인용

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

  // 검색 결과를 처리하는 콜백 함수
  const handleSearchResult = (result) => {
    setUserInfo(result);
    setConfirmDialogOpen(result); // 결과 확인용 다이얼로그 열기
  };

  // Dialog 열기 함수
  const openDialogHandler = () => {
    setOpenDialog(true);
  };

  // Dialog 닫기 함수
  const closeDialogHandler = () => {
    setOpenDialog(false);
  };

  // Dialog 내 검색 버튼 클릭 시 실행되는 함수
  const handleSearchButtonClick = async () => {
    if (session) {
      try {
        const authToken = session.user.id;

        // 입력된 닉네임을 이용하여 유저 정보 요청
        const response = await axios.get(
          API_URL + `/users/info/search/${inputnickName}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        handleSearchResult(response.data); // 검색 결과를 LoverProfile 컴포넌트에 전달
        closeDialogHandler(); // Dialog 닫기
      } catch (error) {
        setError(error);
      }
    }
  };

  // 확인 다이얼로그 닫기 함수
  const closeConfirmDialogHandler = () => {
    setConfirmDialogOpen(false);
  };

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
            <Button size="small" onClick={openDialogHandler}>{buttonText1}</Button>
            <Button size="small" onClick={handleButton2Click}>{buttonText2}</Button>
          </CardActions>
        </React.Fragment>
      </Card>
      {/* Dialog */}
      <Dialog open={openDialog} onClose={closeDialogHandler}>
        <DialogTitle color="#f783ac">연인의 별명을 잘 적어주세요❤️</DialogTitle>
        <DialogContent>
          <TextField
            label="연인의 별명"
            value={inputnickName}
            onChange={(e) => setInputNickName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchButtonClick} color="primary">Search</Button>
          <Button onClick={closeDialogHandler} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

}

export default LoverProfile;
