import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Banner from "./../components/util/Banner";
import CalendarView from "./../components/calendar/CalendarView";

export default function Home() {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="fluid">
        <Box mt={18} mb={20}>
            <Banner />
          </Box>
        </Container>
        <Container maxWidth="fluid">
          <CalendarView/>
        </Container>
      </React.Fragment>
    </>
  );
}
