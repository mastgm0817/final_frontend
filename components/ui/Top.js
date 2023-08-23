import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Weather from "../util/CurrentWeather";

const pages = ["Board", "Coupon", "Dateplan"];

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
            <a
              href="/profile"
              style={{ textDecoration: "none", color: "#f783ac" }}
            >
              Profile
            </a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a
              href="/admin"
              style={{ textDecoration: "none", color: "#f783ac" }}
            >
              Admin
            </a>
          </MenuItem>
        </Menu>
        <Button
          onClick={() => signOut()}
          color="inherit"
          sx={{ color: "#f783ac" }}
        >
          로그아웃
        </Button>
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
          style={{ color: "#f783ac" }}
          color="inherit"
          sx={{ color: "#f783ac", marginLeft: 2 }}
        >
          로그인
        </Button>
      </Link>
    );
  }
}

export default function Top() {
  return (
    <AppBar sx={{ bgcolor: "#ffffff", width: "100%" }} position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "BMDOHYEON_ttf, sans-serif",
                cursor: "pointer",
              }}
            >
              <Image src="./image/logo.svg" alt="Logo" width={90} height={40} />
            </Typography>
          </Link>
          <Weather />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {pages.map((page) => (
            <Link key={page} href={"/" + page.toLowerCase()} passHref>
              <Button color="inherit" sx={{ color: "#f783ac", marginLeft: 2 }}>
                {page}
              </Button>
            </Link>
          ))}
          <LogoutedRightSideNav />
          <LoginedRightSideNav />
        </div>
      </Toolbar>
    </AppBar>
  );
}
