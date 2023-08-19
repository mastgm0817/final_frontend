import * as React from 'react';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const pages = ["Profile", "관리자모드"];

function LoginedRightSideNav() {
  const session = useSession();
  if (session.status === "authenticated") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={session.data.user?.image}
          width="25"
          height="25"
          style={{ marginRight: 10 , marginLeft:10 }}
          alt="userImg"
        />
        <span style={{  color: "#f783ac", marginRight: 10 }}>{session.data.user?.name} 님</span>
        <Button onClick={() => signOut()} color="inherit" sx={{ color: "#f783ac" }}>
          로그아웃
        </Button>
      </div>
    );
  }
}

function LogoutedRightSideNav() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return (
      <Link href="/login">
        <Button style={{ color: "#f783ac" }} color="inherit" sx={{ color: "#f783ac", marginLeft: 2 }}>
          로그인
        </Button>
      </Link>
    );
  }
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[700],
  },
}));

function MenuListComposition() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const session = useSession();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleToggle = () => {
    if (session.status == "authenticated"){
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
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
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

  return (
      <div>
        <ColorButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
        <LogoutedRightSideNav />
        {session.status === "authenticated" ? <LoginedRightSideNav /> : null}
        </ColorButton>
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
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Link href={"/" + page.toLowerCase()}>
                            <Button sx={{  color: "#f783ac", marginRight: 10 }}>
                              {page}
                            </Button>
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}

export default MenuListComposition;