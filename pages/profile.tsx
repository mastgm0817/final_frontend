import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Carousel } from 'react-material-ui-carousel';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        연 : 길
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function EditPage() {
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsCheckboxChecked(event.target.checked);
  };

  return (
    <div>
      <Container sx={{ py: 8, px: 2 }} maxWidth="md">
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              My Profile
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="NickName"
                  name="NickName"
                  label="NickName"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="Email"
                  label="Email"
                  fullWidth
                  autoComplete="Email"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="PhoneNumber"
                  name="PhoneNumber"
                  label="PhoneNumber"
                  fullWidth
                  autoComplete="PhoneNumber"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        </div>
      </Container>
      <Container>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
            }
            label="다시 확인해보세요, 프로필을 변경하시겠습니까?"
          />
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* 체크박스 상태에 따라 "Edit"버튼을 활성화 또는 비활성화*/}
          <Button disabled={!isCheckboxChecked}>Edit</Button>
          <Button>Cancle</Button>
        </div>
      </Container>
    </div>
  );
}

function CouponsPage() {
  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.cid} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.ctitle}
                  </Typography>
                  <Typography>{card.ccontent}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">detail</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function SlideCouponsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const couponsPerPage = 1; // 한줄에 보여질 카드 갯수

  useEffect(() => {
    // Create an interval to change the current index every 3 seconds (adjust the duration as needed)
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 3000ms = 3 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handlePageChange = (pageIndex: React.SetStateAction<number>) => {
    setCurrentIndex(pageIndex);
  };

  const visibleCards = cards.slice(currentIndex, currentIndex + couponsPerPage);

  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {visibleCards.map((card, index) => (
            <Card
              key={card.cid}
              style={{
                width: "100%",
                // marginLeft: index === 0 ? '0' : '16px', // 카드 간 간격 추가
                // opacity: index === currentIndex % couponsPerPage ? 1 : 0.3, // 현재 카드 강조, 나머지 카드 흐리게
                transform: `translateX(${
                  (index - (currentIndex % couponsPerPage)) * 100
                }%)`, // 슬라이드 애니메이션
                transition: "background-color 0.3s ease-in-out 0s", // 애니메이션 지속 시간과 이징 설정
              }}
            >
              <CardMedia
                component="div"
                sx={{ pt: "56.25%" }}
                image="https://source.unsplash.com/random?wallpapers"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.ctitle}
                </Typography>
                <Typography>{card.ccontent}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">자세히 보기</Button>
                <Button size="small">삭제</Button>
              </CardActions>
            </Card>
          ))}
        </div>
        {cards.length > couponsPerPage && (
          <div style={{ marginTop: "16px" }}>
            <Button onClick={handlePrev}>이전</Button>
            {Array.from(
              { length: Math.ceil(cards.length / couponsPerPage) },
              (_, index) => (
                <Button
                  key={index}
                  onClick={() => handlePageChange(index * couponsPerPage)}
                  style={{
                    opacity: index === currentIndex / couponsPerPage ? 1 : 0.5, // 현재 페이지 버튼 강조
                    margin: "0 4px",
                  }}
                >
                  &bull;
                </Button>
              )
            )}
            <Button onClick={handleNext}>다음</Button>
          </div>
        )}
      </Container>
    </div>
  );
}

const cards = [
  { cid: 1, ctitle: "제목1", ccontent: "내용1" },
  { cid: 2, ctitle: "제목2", ccontent: "내용2" },
  { cid: 3, ctitle: "제목3", ccontent: "내용3" },
  { cid: 4, ctitle: "제목4", ccontent: "내용4" },
  { cid: 5, ctitle: "제목5", ccontent: "내용5" },
  { cid: 6, ctitle: "제목6", ccontent: "내용6" },
  { cid: 7, ctitle: "제목7", ccontent: "내용7" },
  { cid: 8, ctitle: "제목8", ccontent: "내용8" },
  { cid: 9, ctitle: "제목9", ccontent: "내용9" },
  { cid: 10, ctitle: "제목10", ccontent: "내용10" },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  const [isEditPage, setIsEditPage] = React.useState(false);
  const [isCouponsPage, setIsCouponsPage] = React.useState(false);

  const handleEditClick = () => {
    setIsEditPage(true);
    setIsCouponsPage(false);
  };

  const handleCheckCouponsClick = () => {
    setIsEditPage(false);
    setIsCouponsPage(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              연:길
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Is some rewards for your way with us..
            </Typography>
          </Container>
        </Box>
        <Grid container>
          <AppBar position="relative">
            <Toolbar>
              {/* 사용자 사진 추가 */}
              <Avatar sx={{ m: 2 }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography variant="h6" color="inherit" noWrap>
                프로필
              </Typography>
              <Stack
                marginLeft={10}
                direction="row"
                spacing={5}
                justifyContent="center"
              >
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleCheckCouponsClick}
                >
                  Check Coupons
                </Button>
                <Button color="warning" variant="contained">
                  wrote
                </Button>
                <Button color="success" variant="contained">
                  Crazy
                </Button>
                <div style={{ flex: 1 }} />
              </Stack>
            </Toolbar>
          </AppBar>
        </Grid>

        {/* 조건부 렌더링으로 editpate 또는 CouponsPage 컴포넌트를 보여줌 */}
        {isEditPage && <EditPage />}
        {isCouponsPage && <SlideCouponsPage />}
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Press Any Button!
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          See the Bright!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
