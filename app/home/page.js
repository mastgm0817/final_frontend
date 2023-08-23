import Calendar from "../../components/calendar";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Margin } from "@mui/icons-material";
import Image from "next/image";
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
              width={500}
              height={500}
              layout="responsive"
              src="/temporary.png"
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
