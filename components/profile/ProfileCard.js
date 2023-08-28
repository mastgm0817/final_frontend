import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { signOut } from "next-auth/react";

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

  const handleUpdateClick = async () => {
    if (session && updatednickName) {
      try {
        const authToken = session.user.id;
        const nickName = session.user.name;

        // 서버에 수정 요청 전에 확인 메시지를 표시
        const confirmed = window.confirm("수정하시겠습니까?");
        if (!confirmed) {
          return; // 수정 취소
        }

        // 닉네임 수정 API 요청
        const response = await axios.post(
          `${API_URL}/users/info/updateNickname`,
          null, // 본문은 null로 설정
          {
            params: {
              // 쿼리 파라미터로 oldNickname과 newNickname을 전송
              oldNickname: session.user.name,
              newNickname: updatednickName,
            },
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          // 성공 메시지 설정
          setUpdateMessage("닉네임이 성공적으로 수정되었습니다.");
          // (선택적) 세션 정보나 사용자 정보를 업데이트
          alert("사용자 정보가 업데이트 되었습니다. 다시 로그인해주세요.");

          // 닉네임 변경 성공 후 로그아웃 처리
          signOut({ callbackUrl: "/login" });
        } else {
          // 실패 메시지 설정
          setUpdateMessage("닉네임 수정에 실패했습니다.");
        }
      } catch (error) {
        console.error("닉네임 수정 중 에러 발생:", error);
        setUpdateMessage("닉네임 수정 중 에러 발생");
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
                  sx={{ display: "flex", marginBottom: "1rem" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button size="small" onClick={handleUpdateClick}>
                          수정
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <TextField
                  id="standard-basic"
                  value={userInfo.userRole}
                  variant="standard"
                  InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                  sx={{ display: "flex" }}
                />
              </>
            )}
          </CardContent>
          {updateMessage && (
            <Typography color="textSecondary">{updateMessage}</Typography>
          )}
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default CardProfile;
