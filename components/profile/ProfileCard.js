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

const API_URL = process.env.NEXT_PUBLIC_URL;

function CardProfile({ title, buttonText }) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [updatednickName, setUpdatednickName] = useState("");
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

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

  const handleupdateClick = async () => {
    if (session && updatednickName) {
      try {
        const authToken = session.user.id;
        const nickName = session.user.name;

        // 서버에 수정 요청 전에 확인 메시지를 표시
        const confirmed = window.confirm("수정하시겠습니까?");
        if (!confirmed) {
          return; // 수정 취소
        }

        // 수정된 닉네임 정보를 서버에 보냄
        const response = await axios.patch(
          API_URL + `/users/info/update/${nickName}`,
          {
            newNickname: updatednickName,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // 서버에서 응답받은 메시지를 저장하여 화면에 표시
        setUpdateMessage(response.data.message);

        // 서버에서 응답받은 수정된 유저 정보
        setUserInfo(response.data);
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#f783ac" gutterBottom>
              {title}
            </Typography>
            {userInfo && (
              <>
                <TextField
                  id="standard-basic"
                  label={userInfo.nickName}
                  onChange={(e) => setUpdatednickName(e.target.value)}
                  variant="standard"
                  sx={{ display: 'flex', marginBottom: '1rem' }}
                />
                <br />
                <TextField
                  id="standard-basic"
                  value={userInfo.userRole}
                  variant="standard"
                  InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                  sx={{ display: 'flex' }}
                />
              </>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleupdateClick}>{buttonText}</Button>
          </CardActions>
          {updateMessage && (
            <Typography color={updateMessage.includes("존재합니다.") ? "error" : "inherit"}>
              {updateMessage}
            </Typography>
          )}
        </React.Fragment>
      </Card>
    </Box>
  );

}

export default CardProfile;