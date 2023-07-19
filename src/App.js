import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavAppBar from './components/ui/navigation/NavAppBar'
import Home from './components/ui/home/Home';
import UserList from './components/user/UserList';
import PostList from './components/post/PostList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Container maxWidth="xl">
          <Box sx={{ bgcolor: '#C4DFDF', height: '7vh' }} >
              <NavAppBar/>
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
          <Box sx={{ bgcolor: '#F8F6F4', height: '7vh' }} >
            footer
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default App;
