import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchLover from "./SearchLover";

const API_URL = process.env.NEXT_PUBLIC_URL;

function LoverProfile({ title, buttonText2 }) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [showLoverInfo, setShowLoverInfo] = useState(null);

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

  // 연인 데이터 불러오기
  useEffect(() => {
    async function showMyLover () {
    if (session && userInfo && userInfo.lover) {
      try {
        // 입력된 닉네임을 이용하여 유저 정보 요청
        const authToken = session.user.id;
        const response = await axios.get(
          API_URL + `/users/info/search/${userInfo.lover}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.data) {
          setShowLoverInfo(response.data);
        } else {
          setShowLoverInfo(null);
        }
      } catch (error) {
        setError(error);
        setShowLoverInfo(null);
      }
    }
  }
  showMyLover();
  }, [session, userInfo]);

  // 버튼2 클릭 시 실행되는 함수
  const handleButton2Click = async () => {
    if (session && userInfo) {
      const authToken = session.user.id;
      try {
        const nickName = session.user.name;
        const response = await axios.delete(
          API_URL + `/users/deletelover/${nickName}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status == 200) {
        setUserInfo(response.data);
        } else {
        console.log('Error deleting lover', error);
        }
      } catch (error) {
        console.error('Error deleting lover', error)
      }
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#f783ac" >
              {title}
            </Typography>
            {showLoverInfo ? (
              <>
                <Avatar value={showLoverInfo.profileImage}></Avatar>
                <TextField
                  id="연인 닉네임"
                  value={showLoverInfo.nickName}
                  InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                  variant="standard"
                  sx={{ display: 'flex' }}
                />
                <br />
                <TextField
                  id="연인 이메일"
                  value={showLoverInfo.email}
                  InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                  variant="standard"
                  sx={{ display: 'flex' }}
                />
              </>
              ) : ( 
                <Typography>연인을 기다리는 중이에요...</Typography>
              )} <br />
          </CardContent>
          <CardActions>
            <SearchLover />
            <Button size="small" onClick={handleButton2Click}>{buttonText2}</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );

}

export default LoverProfile;