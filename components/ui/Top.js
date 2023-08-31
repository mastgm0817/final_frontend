import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Weather from "../util/CurrentWeather";
import Head from "next/head";

const pages = ["Dateplan", "Board", "Inquiry"];
const CALLBACKURL = process.env.NEXT_PUBLIC_CALLBACKURL;

export function LoginedRightSideNav() {
  const session = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (session.status === "authenticated") {
    return (
      <div className="container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={session.data.user?.image}
            width="25"
            height="25"
            style={{ marginRight: 10, marginLeft: 10 }}
            alt="userImg"
          />
          <span
            style={{
              color: "#f783ac",
              marginRight: 10,
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
            onClick={handleMenuOpen}
          >
            {session.data.user?.name} 님
          </span>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <a href="/profile" style={{ color: "#f783ac" }}>
                Profile
              </a>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <a href="/admin" style={{ color: "#f783ac" }}>
                Admin
              </a>
            </MenuItem>
          </Menu>
          <Button
            onClick={() =>
              signOut({
                callbackUrl: CALLBACKURL,
              })
            }
            color="inherit"
            sx={{
              color: "#f783ac",
              fontSize: "1.1rem",
              fontFamily: "Pretendard-Regular",
            }}
          >
            로그아웃
          </Button>
        </div>
      </div>
    );
  }
  return null;
}

export function LogoutedRightSideNav() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return (
      <Link href="/login">
        <Button
          color="inherit"
          sx={{
            color: "#f783ac",
            fontSize: "1.1rem",
            fontFamily: "Pretendard-Regular",
          }}
        >
          로그인
        </Button>
      </Link>
    );
  }
}

export default function Top() {
  return (
    <>
      <Head>
        <title>러부스트 Luvoost - 완벽한 데이트 코스 찾기</title>
        <meta
          name="description"
          content="러부스트 Luvoost에서 사랑하는 연인과 완벽한 데이트를 계획해보세요."
        />
        <meta
          name="keywords"
          content="데이트, 연인, 커플, 로맨틱, 러부스트, Luvoost"
        />
        <meta
          property="og:title"
          content="러부스트 Luvoost - 사랑하는 연인과의 완벽한 데이트 코스"
        />
        <meta
          property="og:description"
          content="참신하고 아름다운 데이트 아이디어를 러부스트 Luvoost에서 찾아보세요. 여기서 당신의 이상적인 데이트를 계획해보세요."
        />
        <meta property="og:image" content="URL_OF_YOUR_IMAGE_HERE" />
      </Head>

      <div className="custom-container">
        <AppBar
          sx={{ bgcolor: "rgba(255, 255, 255, 0.6)", width: "100%" }}
          position="static"
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              paddingLeft: "15%",
              paddingRight: "15%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/" passHref>
                <Image
                  src="./image/logo-text.png"
                  alt="Logo"
                  width={90}
                  height={40}
                />
              </Link>
              <Weather />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {pages.map((page) => (
                <Link key={page} href={"/" + page.toLowerCase()} passHref>
                  <Button
                    color="inherit"
                    sx={{ color: "#f783ac", marginLeft: 2 }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              <LogoutedRightSideNav />
              <LoginedRightSideNav />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
