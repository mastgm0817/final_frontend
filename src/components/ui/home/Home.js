import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import Calendar from '../../calendar/Calendar';
import ToDoList from '../../todolist/TodoList'
import rootReducer from '../../../store/rootReducer';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {
  return (
    <Container disableGutters maxWidth="xl">
      <Box 
          sx={{ bgcolor: '#D2E9E9', height: '36vh' }}
      >
        메인이미지
      </Box>
      <Box sx={{ bgcolor: '#E3F4F4', height: '50vh' }}>
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
            <Item>
              <Provider store={store}>
                <Calendar></Calendar>
                <ToDoList></ToDoList>
              </Provider>
            </Item>
            </Grid>
            <Grid item xs={6} md={4}>
            <Item>Todo 들어갈곳</Item>
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
