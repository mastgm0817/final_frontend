import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavAppBar from './components/UI/Nav/Nav';
import Home from './components/UI/Home/Home';
function App() {
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Container maxWidth="xl">
          <Box sx={{ bgcolor: '#C4DFDF', height: '7vh' }} >
            <NavAppBar/>
          </Box>
          <Home/>
          <Box sx={{ bgcolor: '#F8F6F4', height: '7vh' }} >
            footer
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default App;
