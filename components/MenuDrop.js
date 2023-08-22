import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Weather from "./weather";

const pages = ["Profile", "Admin", "Board", "Dateplan", "Coupon"];

function LoginedRightSideNav({ userImage, userName }) {
  const session = useSession();
  if (session.status === "authenticated" && session.data.user) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={userImage}
          width="25"
          height="25"
          style={{ marginRight: 10, marginLeft: 10 }}
          alt="userImg"
        />
        <span style={{ color: "#f783ac", marginRight: 10 }}>
          {userName} 님
        </span>
        <span
          onClick={() => signOut()}
          style={{ color: "#f783ac", cursor: "pointer" }}
        >
          로그아웃
        </span>
      </div>
    );
  }
  return null;
}

function LogoutedRightSideNav() {
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

function MenuListComposition() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const session = useSession();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleToggle = () => {
    if (session.status == "authenticated") {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const mainPages = ["Board", "Dateplan", "Coupon"];

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
          <Typography
            variant="h6"
            sx={{ fontFamily: "BMDOHYEON_ttf, sans-serif" }}
          >
            <Link href="/" passHref>
              <Image src="./image/logo.svg" alt="Logo" width={90} height={40} />
            </Link>
          </Typography>
          <Weather />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {mainPages.map((page) => (
            <Link key={page} href={"/" + page.toLowerCase()} passHref>
              <Button color="inherit" sx={{ color: "#f783ac", marginLeft: 2 }}>
                {page}
              </Button>
            </Link>
          ))}

          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{
              color: (theme) => theme.palette.getContrastText("#f2f2f2"),
              backgroundColor: "#f2f2f2",
              "&:hover": {
                backgroundColor: "#f2f2f2",
              },
            }}
          >
            {session.status === "authenticated" ? (
              session.data.user ? (
                <LoginedRightSideNav
                  userImage={session.data.user.image}
                  userName={session.data.user.name}
                />
              ) : null
            ) : (
              <LogoutedRightSideNav />
            )}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Link href="/profile" passHref>
                          <Button sx={{ color: "#f783ac", marginRight: 10 }}>
                            Profile
                          </Button>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Link href="/admin" passHref>
                          <Button sx={{ color: "#f783ac", marginRight: 10 }}>
                            Admin
                          </Button>
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MenuListComposition;
