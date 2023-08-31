import * as React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Avatar,
  CardContent,
  CardActions,
  TextField,
  Card,
  Alert,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Top from "../ui/Top";

const API_URL = process.env.NEXT_PUBLIC_URL;

// 연인 정보의 타입
type LoverInfo = {
  nickName: string;
  email: string;
  profileImage: string;
  lover: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchLover() {
  const [open, setOpen] = React.useState(false);
  const [reopen, setReOpen] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = React.useState(null);
  // 검색
  const [inputnickName, setInputNickName] = React.useState("");
  const [LoverInfo, setLoverInfo] = React.useState<LoverInfo | null>(null);
  // 에러 메세지
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
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
        } catch (error: any) {
          setError(error);
        }
      }
    }
    fetchUserInfo();
  }, [session]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SearchClickOpen = () => {
    setReOpen(true);
  };

  const SearchClickClose = () => {
    setReOpen(false);
  };

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  // 연인 검색 함수
  const handleSearchButtonClick = async () => {
    if (session) {
      const authToken = session.user.id;
      try {
        // 입력된 닉네임을 이용하여 유저 정보 요청
        const response = await axios.get(
          API_URL + `/users/info/search/${inputnickName}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.data) {
          SearchClickOpen();
          setLoverInfo(response.data);
        } else {
          setError(error);
        }
      } catch (error: any) {
        setError(error);
      }
    }
  };

  // 연인 저장 메소드
  const handleSaveLover = async () => {
    if (session && LoverInfo && userInfo) {
      const authToken = session.user.id;
      try {
        const nickName = session.user.name;
        const response = await axios.post(
          API_URL + `/users/savelover/${nickName}`,
          { loverNickName: LoverInfo.nickName },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          // 클라이언트 내의 상태 업데이트
          setUserInfo(response.data);
          SearchClickClose();
          handleClose();
        }
      } catch (error: any) {
        // 오류 처리
        if (error.response && error.response.status == 400) {
          SearchClickClose();
          handleClose();
          setErrorMessage(
            "연인 정보가 이미 존재합니다. 헤어짐을 선택 후 다시 시도해주세요."
          );
        } else {
          console.error("Error saving lover", error);
        }
      }
    }
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        연인검색
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Top />
        <AppBar sx={{ position: "relative", backgroundColor: "#f783ac" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              내 연인을 찾아보아요❤️
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        {/* 연인 검색 */}
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#f783ac">
              연인의 별명을 입력하세요.
            </Typography>
            <TextField
              variant="outlined"
              value={inputnickName}
              onChange={(e) => setInputNickName(e.target.value)}
              onKeyDown={handleEnterKeyPress}
              fullWidth
              margin="dense"
              color="primary"
            />
          </CardContent>
          <CardActions>
            <Button size="large" onClick={handleSearchButtonClick}>
              검색
            </Button>
          </CardActions>
        </Card>
        {/* 검색 결과 표시 영역 */}
        {LoverInfo && (
          <>
            <Dialog open={reopen}>
              <DialogTitle
                sx={{
                  fontFamily: "Helvetica",
                  fontSize: "27pt",
                  color: "#f783ac",
                }}
              >
                연인 정보
              </DialogTitle>
              <DialogContent
                sx={{
                  width: 500,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Lover profileImage"
                  src={LoverInfo.profileImage}
                  sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: "#f783ac",
                    alignSelf: "center",
                    mt: 1.7,
                  }}
                />
              </DialogContent>
              <TextField
                id="연인 닉네임"
                value={LoverInfo.nickName}
                InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                variant="standard"
                sx={{ display: "flex", ml: 2, mr: 2 }}
              />
              <br />
              <TextField
                id="standard-basic"
                value={LoverInfo.email}
                InputProps={{ readOnly: true }} // 읽기 전용으로 설정
                variant="standard"
                sx={{ display: "flex", ml: 2, mr: 2 }}
              />
              <DialogActions>
                <Button color="primary" onClick={SearchClickClose}>
                  취소
                </Button>
                <Button color="primary" onClick={handleSaveLover}>
                  저장
                </Button>
              </DialogActions>
            </Dialog>{" "}
          </>
        )}
      </Dialog>
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
    </div>
  );
}
