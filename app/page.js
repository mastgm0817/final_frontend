import Calendar from "../components/calendar";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Image from "next/image";
import tempImg from "../public/temporary.png";
import 'semantic-ui-css/semantic.min.css';

export default function Home() {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="fluid" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Box>
            <Image
              style={{
                marginTop: 3,
                marginBottom: 2,
                paddingRight: 0,
                paddingLeft: 0,
                borderRadius: 20,
              }}
              height={500}
              layout="responsive"
              src={tempImg}
              alt="tempImage"
            />
          </Box>
        </Container>
        <Container maxWidth="fluid">
          <Calendar />
        </Container>
      </React.Fragment>
    </>
  );
}
