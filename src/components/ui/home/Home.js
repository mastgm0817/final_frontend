import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Provider } from 'react-redux';
import rootReducer from '../../../store/rootReducer'; // 리듀서를 정의한 파일의 위치
import Calendar from '../../calendar/Calendar'; // Calendar 컴포넌트의 위치
import TodoList from '../../todolist/TodoList'; // TodoList 컴포넌트의 위치
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
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
        <Grid container>
            <Grid item xs={6} md={8}>
            <Item>
            <Provider store={store}>
              <Calendar></Calendar>
            </Provider>
              <Provider store={store}>
                <ToDoList></ToDoList>
              </Provider>
            </Item>
            </Grid>
            <Grid item xs={6} md={4}>
            <Item>
            <Provider store={store}>
              <TodoList></TodoList>
            </Provider>
            </Item>
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
