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

function LoverProfile ({ title, buttonText1, buttonText2 }) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [inputnickName, setInputNickName] = useState(""); // 추가된 부분

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

  // 버튼1 클릭 시 실행되는 함수
  const handleButton1Click = async () => {
    if (session) {
      try {
        const authToken = session.user.id;
        
        // 입력된 닉네임을 이용하여 유저 정보 요청
        const response = await axios.get(
          API_URL + `/users/info/search/${inputnickName}`, // 닉네임을 변수로 사용
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        
        // 가져온 유저 정보 설정
        setUserInfo(response.data);
      } catch (error) {
        setError(error);
      }
    }
  };

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
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography sx={{ fontSize : 12 }}>Search</Typography>
            <TextField
              id="standard-basic"
              label="닉네임을 입력해주세요." // 닉네임 입력 필드 추가
              value={inputnickName}
              onChange={(e) => setInputNickName(e.target.value)} // 입력 값 업데이트
              variant="standard"
              sx={{ display: 'flex', marginBottom: '1rem' }}
            />
            {userInfo && (
            <>
              <TextField
                id="standard-basic"
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
            </>
          )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleButton1Click}>{buttonText1}</Button>
            <Button size="small" onClock={handleButton2Click}>{buttonText2}</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );

}

export default LoverProfile;
